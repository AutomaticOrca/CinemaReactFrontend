import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

// import { AuthContext } from "../../shared/context/auth-context";

import NavLink from "./NavLink";

const CommonLayout = ({ children }) => {
  // const auth = useContext(AuthContext);
  const location = useLocation();
  // const isNowShowingPage = location.pathname === "/nowshowing";
  return (
    <div className="bg-creamy w-screen">
      <header></header>
      <main>{children}</main>
      <footer>&copy; Copyright 2024 Cinema Paradiso</footer>
    </div>
  );
};

export default CommonLayout;
