import { useEffect, useState } from "react";
import { NavigationPanel } from "../components/Navigation";
import { fetchLoggedInUser, allCount } from "../utils/api";
import { LoginContext } from "../utils/loginContext";
import { RefreshContextProvider } from "../utils/RefreshContext";

const Layout = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });
  const [count, setCount] = useState([]);

  const getUserLogin = async () => {
    try {
      const res = await fetchLoggedInUser();
      setUser({ fullname: res.fullname, email: res.email });
    } catch (e) {
      console.log("error in getting login details", e);
    }
  };
  const fetchAllCount = async () => {
    try {
      const res = await allCount();
      setCount(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserLogin();
    fetchAllCount();
  }, []);

  return (
    <LoginContext.Provider value={user}>
      <RefreshContextProvider>
        <div className="font-sans">
          <div className="flex min-h-screen flex-col:md">
            <NavigationPanel sendAllCount={fetchAllCount} allCount={count} />
            <main className="flex-1 p-0 md:p-8 mt-8 md:mt-0">{children}</main>
          </div>
        </div>
      </RefreshContextProvider>
    </LoginContext.Provider>
  );
};

export default Layout;
