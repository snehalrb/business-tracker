import { useState } from "react";
import { Signup, Login } from "./Login-Signup";

export const Entry = () => {
  const [selectedTab, setSelectedTab] = useState("Login");
  const tabs = ["Login", "Signup"];
  const getButtonClasses = (tabName) =>
    `flex-1 py-2 text-sm font-medium rounded-full ${
      selectedTab === tabName
        ? "bg-white cursor-auto text-gray-700"
        : "bg-gray-200 text-gray-500"
    }`;

  const handleTabs = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
              BUSINESS TRACKER
            </h1>
            <p className="text-gray-500 text-sm">Easy Business Management</p>
          </div>

          <div className="flex border border-gray-200 rounded-full overflow-hidden p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={getButtonClasses(tab)}
                onClick={() => handleTabs(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-base-100 border-base-300 p-6">
            {selectedTab === "Login" && <Login />}
            {selectedTab === "Signup" && <Signup />}
          </div>
        </div>
      </div>
    </>
  );
};
