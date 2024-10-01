import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    auth.logout();
  };
  return (
    <>
      Profile
      <button
        className="bg-ritzHeaderPink text-white rounded-none border-none hover:bg-red-400"
        onClick={() => handleLogout()}
      >
        Log Out
      </button>
    </>
  );
};

export default ProfilePage;
