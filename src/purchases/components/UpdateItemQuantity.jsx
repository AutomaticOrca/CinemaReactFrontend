import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../shared/store/cartSlice";

function UpdateItemQuantity({ type, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-black text-white rounded-full px-6 py-2">
      <button
        onClick={() => dispatch(decreaseItemQuantity(type))}
        disabled={currentQuantity === 0}
        className="text-xl font-bold"
      >
        -
      </button>
      <span className="text-lg font-semibold">{currentQuantity} Added</span>
      <button
        onClick={() => dispatch(increaseItemQuantity(type))}
        className="text-xl font-bold"
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
