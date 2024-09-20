import { useDispatch } from "react-redux";
import UpdateItemQuantity from "./UpdateItemQuantity";

function MenuItem({ type, currentQuantity, unitPrice }) {
  return (
    <li className="flex items-center justify-between mb-4">
      <div className="flex flex-col">
        <span className="text-lg font-medium">{type}</span>
        <span className="text-gray-600">${unitPrice} each</span>
      </div>
      <div className="ml-8">
        <UpdateItemQuantity type={type} currentQuantity={currentQuantity} />
      </div>
    </li>
  );
}

export default MenuItem;
