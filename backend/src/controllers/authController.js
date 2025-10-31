import jwt from "jsonwebtoken";
import Signup from "../models/Signup.js";
import Customer from "../models/Customer.js";
import Quote from "../models/Quote.js";

export const getLogin = async (req, res) => {
  try {
    const loginData = req.body.data || req.body;
    const { email, password } = loginData;
    const authenticateUser = await Signup.findOne({ email, password });

    if (!authenticateUser) {
      return res.json({ success: false, message: "wrong login detailssss" });
    }

    //create token
    const token = jwt.sign(
      {
        id: authenticateUser._id,
        name: authenticateUser.fullname,
        email: authenticateUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: authenticateUser._id,
        name: authenticateUser.fullname,
        email: authenticateUser.email,
      },
    });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Fetch fresh user from DB
    const user = await Signup.findById(decoded.id).select("-password"); //get userbyid but donnot include their password
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    // req.user is already attached by verifyToken middleware
    res.json({ success: true, data: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const signupData = req.body.data || req.body;
    const { fullname, email, phone, password, confirmpassword } = signupData;
    const addNewUser = new Signup({
      fullname,
      email,
      phone,
      password,
      confirmpassword,
    });
    await addNewUser.save();
    if (!addNewUser) return res.json({ success: false });
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false });
  }
};

///CUSTOMER DATA MANUIPULATION/////

export const addCustomer = async (req, res) => {
  try {
    const customerData = req.body.data || req.body;
    const { fullname, email, phone, company, address } = customerData;
    const addNewCustomer = new Customer({
      fullname,
      email,
      phone,
      company,
      address,
    });
    await addNewCustomer.save();
    if (!addNewCustomer) return res.json({ success: false });
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const fetchAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }); // -1 newest first, 1 for oldest first
    if (!customers) return res.json({ success: false });
    return res.json({ success: true, data: customers });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const fetchCustomer = async (req, res) => {
  try {
    const customerById = await Customer.findById(req.params.id);
    if (!customerById) return res.json({ success: false });
    return res.json({ success: true, data: customerById });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customerData = req.body.data || req.body;
    const { fullname, email, phone, company, address } = customerData;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
        phone,
        company,
        address,
      },
      { new: true }
    );
    if (!updatedCustomer) return res.json({ success: false });
    return res.json({ success: true, data: updatedCustomer });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deleteCustomer)
      return res.json({ success: false, message: "Customer not found!!" });
    res.json({ success: true, message: "Customer deleted successfully!!" }); //if we put no status default will be 200
  } catch (e) {
    return res.json({ success: false });
  }
};

///QUOTE DATA MANUIPULATION/////

export const generateQuoteNumber = async (req, res) => {
  try {
    // Find last quote sorted by number descending
    const lastQuote = await Quote.findOne().sort({ quotenumber: -1 });

    let nextNumber = 1; // default if no quotes exist
    let lastQuoteNumber = lastQuote !== null ? lastQuote.quotenumber : "Q-0000";
    //console.log(lastQuoteNumber);
    if (lastQuoteNumber) {
      nextNumber =
        Number(
          lastQuoteNumber.substring(
            lastQuoteNumber.length - 4,
            lastQuoteNumber.length
          )
        ) + 1;
    }
    // Format as Q-0001, Q-0002, etc.

    const formattedQuote = `Q-${String(nextNumber).padStart(4, "0")}`;
    if (!formattedQuote) return res.json({ success: false });
    return res.json({ success: true, data: formattedQuote });
  } catch (error) {
    console.error(error);
    return res.json({ success: false });
  }
};

export const createQuote = async (req, res) => {
  try {
    const quoteData = req.body.data || req.body;
    const {
      customerId,
      quotenumber,
      issuedate,
      duedate,
      status,
      customername,
      itemdetails,
      additionalinfo: { taxrate, notes },
      invoicesummary: { taxrateamt, subtotal, total },
    } = quoteData;
    const createNewQuote = new Quote({
      customerId,
      quotenumber,
      issuedate,
      duedate,
      status,
      customername,
      itemdetails,
      additionalinfo: {
        taxrate,
        notes,
      },
      invoicesummary: {
        taxrateamt,
        subtotal,
        total,
      },
    });
    await createNewQuote.save();
    if (!createNewQuote) return res.json({ success: false });
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const fetchQuote = async (req, res) => {
  try {
    const quoteById = await Quote.findById(req.params.id);
    if (!quoteById) return res.json({ success: false });
    return res.json({ success: true, data: quoteById });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const quoteData = req.body.data || req.body;
    const {
      quotenumber,
      issuedate,
      duedate,
      status,
      customername,
      itemdetails,
      additionalinfo: { taxrate, notes },
      invoicesummary: { taxrateamt, subtotal, total },
    } = quoteData;

    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      {
        quotenumber,
        issuedate,
        duedate,
        status,
        customername,
        itemdetails,
        additionalinfo: {
          taxrate,
          notes,
        },
        invoicesummary: {
          taxrateamt,
          subtotal,
          total,
        },
      },
      { new: true }
    );
    if (!updatedQuote) return res.json({ success: false });
    return res.json({ success: true, data: updatedQuote });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const fetchAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("customerId")
      .sort({ createdAt: -1 }); // -1 newest first, 1 for oldest first
    if (!quotes) return res.json({ success: false });
    return res.json({ success: true, data: quotes });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const deleteQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deleteQuote)
      return res.json({ success: false, message: "Quote not found!!" });
    res.json({ success: true, message: "Quote deleted successfully!!" });
  } catch (e) {
    return res.json({ success: false });
  }
};

///GET COUNT OF ALL DOCS/////
export const allCount = async (req, res) => {
  try {
    const [customers, quotes] = await Promise.all([
      Customer.countDocuments(),
      Quote.countDocuments(),
    ]);

    if (!quotes || !customers) return res.json({ success: false });
    return res.json({
      success: true,
      data: { customers, quotes },
    });
  } catch (e) {
    return res.json({ success: false });
  }
};
