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
