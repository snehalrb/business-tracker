import { Customer } from "../components/Customer";
import { Quote } from "../components/Quote";
import { Invoice } from "../components/Invoice";
import { useLocation } from "react-router";
import Layout from "./Layout";
import { SearchQuotes } from "../components/Quote";
import { SearchInvoices } from "../components/Invoice";
import { SearchCustomers } from "../components/Customer";
import Dashboard from "./Dashboard";
const Action = ({ actionType }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const componentMap = {
    customer: Customer,
    quote: Quote,
    quotes: SearchQuotes,
    customers: SearchCustomers,
    dashboard: Dashboard,
    invoice: Invoice,
    invoices: SearchInvoices,
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
