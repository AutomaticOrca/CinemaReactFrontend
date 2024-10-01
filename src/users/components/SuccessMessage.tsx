import React from "react";

interface SuccessMessageProps {
  message: string;
  duration?: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  duration = 2000,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {}, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="alert alert-success">
      <p>💗{message}💗</p>
    </div>
  );
};

export default SuccessMessage;
