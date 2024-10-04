import { useSelector } from "react-redux";
import { getCurrentPurchase } from "../../shared/store/purchaseSlice";

const TotalItems = () => {
  const { tickets } = useSelector(getCurrentPurchase);
  const total =
    tickets["NORMAL"].quantity * tickets["NORMAL"].unitPrice +
    tickets["DISCOUNTED"].quantity * tickets["DISCOUNTED"].unitPrice;
  return (
    <div className="border-t border-dotted border-gray-600">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">NORMAL</span>
        <span className="text-sm">
          ${tickets["NORMAL"].quantity * tickets["NORMAL"].unitPrice}{" "}
        </span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-sm font-semibold">DISCOUNTED</span>
        <span className="text-sm">
          ${tickets["DISCOUNTED"].quantity * tickets["DISCOUNTED"].unitPrice}
        </span>
      </div>
      <div className="border-t border-dotted border-gray-600 mb-4"></div>
      <div className="flex justify-between">
        <span className="text-lg font-bold text-red-400">TOTAL</span>
        <span className="text-lg font-bold">${total}</span>
      </div>
    </div>
  );
};

export default TotalItems;
