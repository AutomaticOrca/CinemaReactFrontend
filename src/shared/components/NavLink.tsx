import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link to={to} className="group relative font-raleway text-slate-700 hover:text-slate-950">
      <span className="absolute top-[-2px] left-1/2 w-0 h-0.5 bg-ritzHeaderPink transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
      {children}
    </Link>
  );
}

export default NavLink;
