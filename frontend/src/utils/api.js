import { endpoint } from "./axios.js";
import toast from "react-hot-toast";

export const fetchLoggedInUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await endpoint.get("/loggedinuser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch loged in user data");
  } catch (e) {
    toast.error("error while fetching logged in user data");
  }
};

// export const fetchLoginDetails = async () => {
//   try {
//     const response = await endpoint.post("/login", {
//       headers: { "Cache-Control": "no-cache" }, // prevents 304 due to caching
//     });
//     if (response.data.success) {
//       return response.data.data;
//     } else toast.error("Failed to fetch login data");
//   } catch (e) {
//     toast.error("error while fetching login data");
//   }
// };

export const fetchCustomer = async (id) => {
  try {
    const response = await endpoint.get(`editcustomer/${id}`, {
      headers: { "Cache-Control": "no-cache" }, // prevents 304 due to caching
    });
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch data");
  } catch (e) {
    toast.error("error while fetching data");
  }
};

export const fetchAllCustomers = async () => {
  try {
    const response = await endpoint.get("/getallcustomers", {
      headers: { "Cache-Control": "no-cache" }, // prevents 304 due to caching
    });
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch data");
  } catch (e) {
    toast.error("error while fetching data");
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await endpoint.post("/addcustomer", data);
    if (response.data.success) {
      toast.success("Data added successfully!");
      //navigate("/");
    } else toast.error("Failed to save data");
  } catch (e) {
    toast.error("error while submitting form");
  }
};

export const editCustomer = async (data, id) => {
  try {
    const response = await endpoint.put(`editcustomer/${id}`, data);
    if (response.data.success) {
      toast.success("Data saved successfully!");
      return response.data.data;
      //navigate("/");
    } else toast.error("Failed to save data");
  } catch (e) {
    toast.error("error while submitting form");
  }
};

export const generateQuoteNumber = async () => {
  try {
    const response = await endpoint.get("/quotenumber");
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to generate quote number");
  } catch (e) {
    toast.error("error while generating quote");
  }
};

export const createQuote = async (data) => {
  try {
    const response = await endpoint.post("/createquote", data);
    if (response.data.success) {
      toast.success("Data added successfully!");
    } else toast.error("Failed to save quote data");
  } catch (e) {
    toast.error("error while saving quote data");
  }
};

export const editQuote = async (data, id) => {
  try {
    const response = await endpoint.put(`editquote/${id}`, data);
    if (response.data.success) {
      toast.success("Quote Data saved successfully!");
      return response.data.data;
      //navigate("/");
    } else toast.error("Failed to save quote data");
  } catch (e) {
    toast.error("error while submitting quote form");
  }
};

export const fetchQuote = async (id) => {
  try {
    const response = await endpoint.get(`editquote/${id}`, {
      headers: { "Cache-Control": "no-cache" }, // prevents 304 due to caching
    });
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch quote");
  } catch (e) {
    toast.error("error while fetching quote");
  }
};

export const allCount = async () => {
  try {
    const response = await endpoint.get("/allCount");
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch quote count");
  } catch (e) {
    toast.error("error while fetching quote count");
  }
};

export const fetchQuotes = async () => {
  try {
    const response = await endpoint.get("/getallquotes");
    if (response.data.success) {
      return response.data.data;
    } else toast.error("Failed to fetch quotes");
  } catch (e) {
    toast.error("error while fetching quotes");
  }
};
