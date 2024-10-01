import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

import NavLink from "./NavLink";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const auth = useContext(AuthContext);

  // const isNowShowingPage = location.pathname === "/nowshowing";
  return (
    <div className="bg-creamy w-screen min-h-screen flex flex-col">
      <header>
        <div className="bg-ritzHeaderPink flex justify-end p-3"></div>
        <nav className="flex items-center justify-between m-2 p-4 mx-auto max-w-full">
          <div className="flex  items-center  gap-4">
            <Link
              to="/"
              className="mr-4 font-playwrite text-3xl transition-colors duration-300 text-slate-950 hover:text-warmGold px-2 py-1 rounded"
            >
              Paradiso
            </Link>
            <NavLink to="/nowshowing">Now Showing</NavLink>
            <NavLink to="/cinemas">Cinemas</NavLink>
          </div>
          {!auth.isLoggedIn ? (
            <NavLink to="/auth">Sign In / Register</NavLink>
          ) : (
            <NavLink to="/profile">My Account</NavLink>
          )}
        </nav>
        <div className="border-t-4 border-ritzHeaderPink"></div>
      </header>
      <main className="flex-grow pt-10 p-4 mx-auto max-w-screen-lg">
        {children}
      </main>
      <footer>&copy; Copyright 2024 Cinema Paradiso</footer>
    </div>
  );
};

export default CommonLayout;
