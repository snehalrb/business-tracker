import { NavLink, useLocation } from "react-router";

const ActiveNavLink = ({ to, matchPath, children }) => {
  const { pathname } = useLocation();

  const baseClass =
    "px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer";
  const activeClass =
    " bg-gray-100 px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer";

  const isActive = pathname === to || pathname.startsWith(matchPath, 1);

  return (
    <NavLink to={to} className={isActive ? `${activeClass}` : `${baseClass}`}>
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;
