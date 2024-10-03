import UpdateItemQuantity from "./UpdateItemQuantity";

interface MenuItemProps {
  type: "NORMAL" | "DISCOUNTED";
  currentQuantity: number;
  unitPrice: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  type,
  currentQuantity,
  unitPrice,
}) => {
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
};

export default MenuItem;
