import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "./MenuItem";
import TotalItems from "./TotalItems";
import { AuthContext } from "../../shared/context/auth-context";
import {
  getCurrentPurchase,
  setSession,
  setUser,
} from "../../shared/store/purchaseSlice";

import { TicketType } from "../../shared/Models";

interface MenuProps {
  sessionid: string; // Define sessionid as a string type
}

const Menu: React.FC<MenuProps> = ({ sessionid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const handleClickCheckout = () => {
    navigate(`/checkout/${sessionid}`);
  };

  useEffect(() => {
    const safeUserId = userId as string; // userId is checked in PurchasePage
    dispatch(setSession(sessionid));
    dispatch(setUser(safeUserId));
  }, [dispatch, sessionid, userId]);

  const { originUnitPrice, tickets, status } = useSelector(getCurrentPurchase);

  if (!tickets || !tickets["NORMAL"] || !tickets["DISCOUNTED"]) {
    return null;
  }

  const total =
    tickets["NORMAL"].quantity * tickets["NORMAL"].unitPrice +
    tickets["DISCOUNTED"].quantity * tickets["DISCOUNTED"].unitPrice;

  return (
    <ul className="divide-ypx-2">
      {(Object.keys(tickets) as TicketType[]).map((type, index) => (
        <MenuItem
          type={type}
          currentQuantity={tickets[type].quantity}
          unitPrice={tickets[type].unitPrice}
          key={"t-" + index}
        />
      ))}

      <TotalItems />

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        <button
          className={`${
            total > 0
              ? "bg-ritzLightBlue text-white font-bold"
              : "bg-gray-300 text-gray-700 cursor-not-allowed"
          } text-lg font-bold font-italiana py-2 px-4 rounded-none border-none hover:bg-rose-400`}
          disabled={total <= 0}
          onClick={handleClickCheckout}
        >
          CHECKOUT
        </button>
      </div>

      {/* Displaying sessionId, userId, originUnitPrice, tickets, status for testing */}
      <div className="test-display text-gray-300">
        <p>----test----</p>
        <p>
          <strong>Session ID:</strong> {sessionid}
        </p>
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>Origin Unit Price:</strong> {originUnitPrice}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Tickets:</strong>
        </p>
        <ul>
          {(Object.keys(tickets) as TicketType[]).map((type) => (
            <li key={type}>
              {type}: Quantity - {tickets[type].quantity}, Unit Price -{" "}
              {tickets[type].unitPrice}
            </li>
          ))}
        </ul>
      </div>
    </ul>
  );
};

export default Menu;
