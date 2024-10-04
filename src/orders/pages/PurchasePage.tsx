import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import useAuthRedirect from "../../shared/hooks/useAuthRedirect";

function PurchasePage() {
  const { sessionid } = useParams();
  const { isLoggedIn, countdown } = useAuthRedirect();

  if (!sessionid) {
    return (
      <>
        Sorry, something wrong happened. Error: useParams, sessionid error:{" "}
        {sessionid}
      </>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <Menu sessionid={sessionid} />
      ) : (
        <>
          <p>Redirecting to Sign In Page in {countdown} seconds ..... </p>
          <p>Please Sign in before order your ticket. </p>
        </>
      )}
    </>
  );
}
export default PurchasePage;
