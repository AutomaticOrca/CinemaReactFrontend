import React from "react";

interface ErrorMessageProps {
  message: string | null; // message could be a string or null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null; // If there's no message, don't render anything

  return (
    <div className="text-red-500 mb-4">
      <p>🚨{message}🚨</p>
    </div>
  );
};

export default ErrorMessage;
