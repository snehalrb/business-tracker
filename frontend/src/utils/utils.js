export const validateEmail = (e, setError, clearErrors, errors) => {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    setError("email", { type: "manual", message: "Invalid email address" });
  } else {
    if (errors.email) {
      clearErrors("email");
    }
  }
};

export const quoteItems = {
  description: "",
  rate: 0,
  quantity: 0,
  amount: 0,
};

export const filterCustomers = (data, q) => {
  if (data && q) {
    return data.filter(
      (d) =>
        d.fullname.toLowerCase().includes(q.toLowerCase()) ||
        d.company.toLowerCase().includes(q.toLowerCase()) ||
        d.address.toLowerCase().includes(q.toLowerCase()) ||
        d.email.toLowerCase().includes(q.toLowerCase()) ||
        d.phone.toString().includes(q.toLowerCase())
    );
  }
};

export const filterQuotes = (data, q) => {
  if (data && q) {
    return data.filter((d) => {
      return (
        d.quotenumber.toLowerCase().includes(q.toLowerCase()) ||
        d.customername.toLowerCase().includes(q.toLowerCase()) ||
        d.invoicesummary.total.toString().includes(q.toLowerCase()) ||
        d.customerId.email.toLowerCase().includes(q.toLowerCase()) ||
        d.customerId.phone.toString().includes(q.toLowerCase())
      );
    });
  }
};

export const QuotePillStatus = [
  {
    label: "ACCEPTED",
    value: "accepted",
    class: "text-green-700 bg-green-200",
  },
  { label: "REJECTED", value: "rejected", class: "text-red-600 bg-red-100" },
  {
    label: "SENT",
    value: "sent",
    class: "text-blue-600 bg-blue-100",
  },
  {
    label: "DRAFT",
    value: "draft",
    class: "text-yellow-600 bg-yellow-100",
  },
];

export const PillColor = (pilltype) => {
  //console.log("func pill colocr", pilltype);
  switch (pilltype.toUpperCase()) {
    case "DRAFT":
      return "text-yellow-600 bg-yellow-100";

    case "SENT":
      return "text-blue-600 bg-blue-100";

    case "REJECTED":
      return "text-red-600 bg-red-100";

    case "ACCEPTED":
      return "bg-green-100 text-green-700";

    default:
      return "";
  }
};
