import { useState } from "react";

export interface PaymentFormData {
  cardNumber: string | number;
  nameOnCard: string;
  expiryMonth: string | number;
  expiryYear: string | number;
  securityCode: string | number;
}

interface PaymentFormProps {
  onChange: (FormData: PaymentFormData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]:
        name === "cardNumber" ||
        name === "expiryMonth" ||
        name === "expiryYear" ||
        name === "securityCode"
          ? Number(value) // Convert string to number
          : value,
    };
    setFormData(updatedFormData);
    onChange(updatedFormData); // pass updatedFormData to CheckoutPage
  };

  // Expiry month and year options
  const months = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const years = Array.from(new Array(10), (_, index) => {
    const year = new Date().getFullYear() + index;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-bold mb-2 ">
          CREDIT CARD NUMBER *
        </label>
        <input
          type="number"
          inputMode="numeric"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="Credit card number"
          className="w-full px-3 py-2  rounded border border-gray-300"
          required
        />
      </div>

      {/* Name on Card */}
      <div>
        <label className="block text-sm font-bold mb-2 ">NAME ON CARD *</label>
        <input
          type="text"
          name="nameOnCard"
          value={formData.nameOnCard}
          onChange={handleInputChange}
          placeholder="Name as shown on card"
          className="w-full px-3 py-2 rounded border border-gray-300"
          required
        />
      </div>

      {/* Expiry */}
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-white">
            EXPIRY MONTH *
          </label>
          <select
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            required
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-white">
            EXPIRY YEAR *
          </label>
          <select
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            required
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Security Code */}
      <div>
        <label className="block text-sm font-bold mb-2">SECURITY CODE *</label>
        <input
          type="text"
          name="securityCode"
          value={formData.securityCode}
          onChange={handleInputChange}
          placeholder="CVC"
          className="w-full px-3 py-2 rounded border border-gray-300"
          required
        />
      </div>
    </div>
  );
};

export default PaymentForm;
