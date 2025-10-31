import { Customer } from "../components/Customer";
import { Quote } from "../components/Quote";
import { useLocation } from "react-router";
import Layout from "./Layout";
import { SearchQuotes } from "../components/Quote";
import { SearchCustomers } from "../components/Customer";
const Action = ({ actionType }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const componentMap = {
    customer: Customer,
    quote: Quote,
    quotes: SearchQuotes,
    customers: SearchCustomers,
    // invoice: Invoice,
  };

  const ComponentToRender = componentMap[path];

  if (!ComponentToRender) return null;

  return (
    <Layout>
      <ComponentToRender action={actionType} />
    </Layout>
  );
};

export default Action;
