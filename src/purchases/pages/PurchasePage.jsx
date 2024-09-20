import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import Menu from "../components/Menu";

function PurchasePage() {
  const [countdown, setCountdown] = useState(5);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { sessionid } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            navigate("/auth");
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <>
        <p>Please log in to buy tickets.</p>
        <p>You will be redirected to the login page in {countdown} seconds.</p>
      </>
    );
  }

  return (
    <div>
      <Menu sessionid={sessionid} />
    </div>
  );
}

export default PurchasePage;
