import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
function PurchasePage() {
  const [countdown, setCountdown] = useState(5);
  const { isLoggedIn } = useContext(AuthContext);
  const { sessionid } = useParams();
  const navigate = useNavigate();
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
        <p>Redirecting to Sign In Page in {countdown} seconds ..... </p>
        <p>Please Sign in before order your ticket. </p>
      </>
    );
  }
  return (
    <>
      <Menu sessionid={sessionid} />
    </>
  );
}
export default PurchasePage;
