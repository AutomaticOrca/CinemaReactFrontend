import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import CommonLayout from "./shared/layouts/CommonLayout";
import Home from "./shared/pages/Home";
import Auth from "./user/pages/Auth";
import UserProfile from "./user/pages/UserProfile";
import NowShowingPage from "./showtimes/pages/NowShowingPage";
import CinemaPage from "./cinema/pages/CinemaPage";
import MovieDetailsPage from "./movieDetails/pages/MovieDetailsPage";
import PurchasePage from "./purchases/pages/PurchasePage";
import CheckoutPage from "./purchases/pages/CheckoutPage";
import OrderConfirmPage from "./purchases/pages/OrderConfirmPage";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return token ? <Component {...rest} /> : <Navigate to="/auth" />;
  };
  console.log("import.meta.env:", import.meta.env);

  console.log(
    "import.meta.env.REACT_APP_NODE_ENV:",
    import.meta.env.REACT_APP_NODE_ENV
  );
  console.log(
    "import.meta.env.REACT_APP_SERVER_BASE_URL:",
    import.meta.env.REACT_APP_SERVER_BASE_URL
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/user-profile"
              element={<ProtectedRoute element={UserProfile} />}
            />
            <Route path="/nowshowing" element={<NowShowingPage />} />
            <Route path="/cinemas" element={<CinemaPage />} />
            <Route path="/session/:sessionid" element={<MovieDetailsPage />} />
            <Route path="/purchase/:sessionid" element={<PurchasePage />} />
            <Route path="/checkout/:sessionid" element={<CheckoutPage />} />
            <Route
              path="/orderconfirm/:orderid"
              element={<OrderConfirmPage />}
            />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
