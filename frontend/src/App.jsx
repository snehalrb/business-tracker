import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Action from "./pages/Action";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />;
      <Route path="/dashboard" element={<Dashboard />} />;
      <Route path="/quotes" element={<Action />} />
      <Route path="/customer/add" element={<Action actionType={"add"} />} />;
      <Route
        path="/customer/edit/:id"
        element={<Action actionType={"edit"} />}
      />
      ;
      <Route path="/customers" element={<Action />} />
      <Route path="/quote/create" element={<Action actionType={"add"} />} />;
      <Route path="/quote/edit/:id" element={<Action actionType={"edit"} />} />
    </Routes>
  );
}

export default App;
