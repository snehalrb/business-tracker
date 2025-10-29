import { allCount } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router";
import ActiveNavLink from "./ActiveNavLink";
import { LoginContext } from "../utils/loginContext";

const NavigationPanel = () => {
  const [count, setCount] = useState([]);
  const userdetails = useContext(LoginContext);

  const fetchAllCount = async () => {
    try {
      const res = await allCount();
      setCount(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllCount();
  }, []);

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-blue-600 font-bold text-xl">BUSINESS TRACKER</h1>
        <p className="text-gray-500 text-sm mt-1">Easy Business Management</p>
      </div>
      <div className="mt-6">
        <div className="px-6 py-2 flex items-center space-x-2 bg-gray-100 rounded cursor-pointer">
          <span className="font-medium">AB</span>
          <div>
            <p className="text-sm font-semibold">{userdetails.fullname}</p>
            <p className="text-xs text-gray-500">{userdetails.email}</p>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? " bg-gray-100 px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer"
                  : "px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <ActiveNavLink to="/customer/add" matchPath={"customer"}>
              Customers
              <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
                {count.customers}
              </span>
            </ActiveNavLink>
          </li>
          <li>
            <ActiveNavLink to="/quotes" matchPath={"quote"}>
              Quotes
              <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
                {count.quotes}
              </span>
            </ActiveNavLink>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer">
            <span>Invoices</span>
            <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
              24ddd
            </span>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100 rounded mb-2 cursor-pointer">
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavigationPanel;
