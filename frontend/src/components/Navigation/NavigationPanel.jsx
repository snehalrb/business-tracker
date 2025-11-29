import { useEffect, useContext, useState } from "react";
import { ActiveNavLink } from "./ActiveNavLink";
import { LoginContext } from "../../utils/loginContext";
import { useRefreshContext } from "../../utils/RefreshContext";
import { NavLink } from "react-router";

export const NavigationPanel = ({ sendAllCount, allCount }) => {
  const userdetails = useContext(LoginContext);
  const { refreshKey } = useRefreshContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    sendAllCount();
  }, [refreshKey]);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-3xl">&#9776;</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform
        transition-transform duration-300 
        md:translate-x-0 md:static 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 flex justify-between md:block">
          <div>
            <h1 className="text-blue-600 font-bold text-xl">
              BUSINESS TRACKER
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Easy Business Management
            </p>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <div className="px-6 py-2 flex items-center space-x-2 bg-gray-100 rounded cursor-pointer">
            <div>
              <p className="text-sm font-semibold">{userdetails.fullname}</p>
              <p className="text-xs text-gray-500">{userdetails.email}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <ul>
            <li>
              <ActiveNavLink to="/dashboard" matchPath={"dashboard"}>
                Dashboard
              </ActiveNavLink>
            </li>

            <li>
              <ActiveNavLink to="/customers" matchPath={"customer"}>
                Customers
                <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
                  {allCount.customers ?? 0}
                </span>
              </ActiveNavLink>
            </li>

            <li>
              <ActiveNavLink to="/quotes" matchPath={"quote"}>
                Quotes
                <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
                  {allCount.quotes ?? 0}
                </span>
              </ActiveNavLink>
            </li>

            <li
              style={{ display: "none" }}
              className="px-6 py-2 hover:bg-gray-100 rounded mb-2 flex justify-between items-center cursor-pointer"
            >
              <span>Invoices</span>
              <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2">
                24ddd
              </span>
            </li>

            <li className="px-6 py-2 hover:bg-gray-100 rounded mb-2 cursor-pointer">
              <NavLink to="/" style={{ display: "block" }}>
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
