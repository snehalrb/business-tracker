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
