import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";

/**
 * Custom hook to handle redirecting to the login page
 * if the user is not logged in, with a countdown.
 */
const useAuthRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoggedIn) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            navigate("/auth");
            return 0; // Set countdown to 0
          }
          return prevCount - 1; // Decrease the countdown value by 1 every second
        });
      }, 1000); // Interval of 1 second
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [isLoggedIn, navigate]);

  return { isLoggedIn, countdown };
};

export default useAuthRedirect;
