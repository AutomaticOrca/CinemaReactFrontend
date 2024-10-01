import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Context & hooks
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

// Pages & CommonLayout
import CommonLayout from "./shared/components/CommonLayout";
import HomePage from "./home/pages/HomePage";
import AuthPage from "./users/pages/AuthPage";
import NowShowingPage from "./nowshowing/pages/NowShowingPage";
import SessionPage from "./session/pages/SessionPage";
import PurchasePage from "./orders/pages/PurchasePage";
import OrderConfirmPage from "./orders/pages/OrderConfirmPage";
import CinemasPage from "./cinemas/pages/CinemasPage";
import MoviePage from "./movies/pages/MoviePage";
import ProfilePage from "./users/pages/ProfilePage";

function App() {
  const { token, login, logout, userId } = useAuth();

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
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nowshowing" element={<NowShowingPage />} />
            <Route path="/session/:sessionid" element={<SessionPage />} />
            <Route path="/purchase/:sessionid" element={<PurchasePage />} />
            <Route path="/order/:orderid" element={<OrderConfirmPage />} />
            <Route path="/cinemas" element={<CinemasPage />} />
            <Route path="/movie/:movieid" element={<MoviePage />} />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
