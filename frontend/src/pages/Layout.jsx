import { useEffect, useState } from "react";
import NavigationPanel from "../components/NavigationPanel";
import { fetchLoggedInUser } from "../utils/api";
import { LoginContext } from "../utils/loginContext";

const Layout = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  const getLogin = async () => {
    try {
      const res = await fetchLoggedInUser();
      setUser({ fullname: res.fullname, email: res.email });
    } catch (e) {
      console.log("error in getting login details", e);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <LoginContext.Provider value={user}>
      <div className="font-sans">
        <div className="flex min-h-screen">
          <NavigationPanel />

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </LoginContext.Provider>
  );
};

export default Layout;
