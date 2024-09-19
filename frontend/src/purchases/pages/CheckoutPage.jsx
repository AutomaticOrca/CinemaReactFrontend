import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../shared/context/auth-context";
import { getCurrentPurchase } from "../../shared/store/cartSlice";
import { placeOrder } from "../../shared/util/api";

function CheckoutPage() {
  const { sessionid } = useParams();
  const { userId } = useContext(AuthContext);

  const navigate = useNavigate();

  const { tickets } = useSelector(getCurrentPurchase);

  const [formData, setFormData] = useState({
    givenNames: "",
    surname: "",
    email: "",
    postCode: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    const ticketsData = [
      {
        type: "NORMAL",
        number: tickets["NORMAL"].quantity,
        price: tickets["NORMAL"].unitPrice,
      },
      {
        type: "DISCOUNTED",
        number: tickets["DISCOUNTED"].quantity,
        price: tickets["DISCOUNTED"].unitPrice,
      },
    ];

    try {
      const response = await placeOrder({
        sessionId: sessionid,
        userId,
        tickets: ticketsData,
      });
      const orderid = response.purchase._id;
      navigate(`/orderconfirm/${orderid}`);
    } catch (error) {
      console.error("order submission failed: ", error.message);
    }
  };

  return (
    <div className="p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-4">YOUR DETAILS</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">
              GIVEN NAMES *
            </label>
            <input
              type="text"
              name="givenNames"
              value={formData.givenNames}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">SURNAME *</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">POST CODE *</label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">
              MOBILE NUMBER *
            </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-rose-400 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          PROCESS PAYMENT
        </button>
      </form>
      <p className="text-gray-300">
        will not put payment form since it is a little bit sensitive😅
      </p>
    </div>
  );
}

export default CheckoutPage;
