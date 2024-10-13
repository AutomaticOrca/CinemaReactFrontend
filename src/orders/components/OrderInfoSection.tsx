interface OrderInfoSectionProps {
  label: string;
  value: string;
}

const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({
  label,
  value,
}) => {
  return (
    <div className="my-4">
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-ritzBgBlue font-urbanist text-lg">{value}</p>
    </div>
  );
};

export default OrderInfoSection;
