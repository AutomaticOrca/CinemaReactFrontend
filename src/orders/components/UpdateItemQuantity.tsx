import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../shared/store/purchaseSlice";

interface UpdateItemQuantityProps {
  type: "NORMAL" | "DISCOUNTED";
  currentQuantity: number;
}

const UpdateItemQuantity: React.FC<UpdateItemQuantityProps> = ({
  type,
  currentQuantity,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between  rounded-none ">
      <button
        onClick={() => dispatch(decreaseItemQuantity(type))}
        disabled={currentQuantity === 0}
        className={`h-10 flex items-center justify-center text-xl font-bold rounded-none border-none hover:border-none text-white ${
          currentQuantity === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-ritzBgBlue hover:bg-ritzHeaderPink"
        }`}
      >
        -
      </button>
      <span className="text-lg font-semibold m-2 w-12 text-center">
        {currentQuantity}
      </span>
      <button
        onClick={() => dispatch(increaseItemQuantity(type))}
        className="h-10 flex items-center justify-center text-xl font-bold rounded-none border-none hover:border-none bg-ritzBgBlue text-white hover:bg-ritzHeaderPink"
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
