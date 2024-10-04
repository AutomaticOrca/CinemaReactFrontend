import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentPurchase } from "../../shared/store/purchaseSlice";
import { useParams, useNavigate } from "react-router-dom";

import useAuthRedirect from "../../shared/hooks/useAuthRedirect";
import { AuthContext } from "../../shared/context/auth-context";
import { ApiTicket } from "../../shared/Models";
import PaymentForm, { PaymentFormData } from "../components/PaymentForm";
import { placeOrder } from "../../shared/utils/api";

import TotalItems from "../components/TotalItems";
import ErrorMessage from "../../shared/components/ErrorMessage";

const CheckoutPage = () => {
  const { isLoggedIn, countdown } = useAuthRedirect();
  const { userId } = useContext(AuthContext);
  const { tickets } = useSelector(getCurrentPurchase);
  const { sessionid } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [errMessage, setErrorMessage] = useState<string | null>(null);

  const handlePaymentSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(tickets);
    const ticketsData: ApiTicket[] = [
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
        sessionId: sessionid as string,
        userId: userId as string,
        tickets: ticketsData,
      });
      const orderid = response.purchase._id;
      navigate(`/orderconfirm/${orderid}`);
    } catch (err) {
      setErrorMessage(`Sorry, Order failed. backend error message: ${err}`);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <p>Redirecting to Sign In Page in {countdown} seconds ..... </p>
        <p>Please Sign in before order your ticket. </p>
      </>
    );
  }

  if (errMessage) {
    return <ErrorMessage message={errMessage} />;
  }

  return (
    <>
      <h1 className="font-italiana text-4xl px-4 font-bold text-center mb-3">
        CHECK OUT
      </h1>
      <TotalItems />
      <h1 className="font-italiana text-2xl px-4 font-bold text-center m-3">
        PAYMENT
      </h1>
      <PaymentForm onChange={setPaymentData} />
      <button
        onClick={handlePaymentSubmit}
        className="rounded-none border-none mt-6 font-bold py-2 px-4  w-full bg-rose-300 text-ritzLightBlue hover:border-none hover:bg-ritzLightBlue hover:text-white"
      >
        PROCESS PAYMENT
      </button>
      <p className="text-gray-300 mt-2 ">
        DO NOT PUT YOUR REAL CARD INFO HERE...
      </p>
      {/* Displaying payment form data */}
      {paymentData && (
        <div className="rounded mt-4 text-sm text-gray-300 ">
          <h2 className="font-bold mb-2">Payment Data (Debug Info):</h2>
          <p>
            <strong>Card Number:</strong> {paymentData.cardNumber}
          </p>
          <p>
            <strong>Name on Card:</strong> {paymentData.nameOnCard}
          </p>
          <p>
            <strong>Expiry Month:</strong> {paymentData.expiryMonth}
          </p>
          <p>
            <strong>Expiry Year:</strong> {paymentData.expiryYear}
          </p>
          <p>
            <strong>Security Code:</strong> {paymentData.securityCode}
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
