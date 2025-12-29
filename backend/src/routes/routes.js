import express from "express";
import {
  createUser,
  getLogin,
  addCustomer,
  fetchCustomer,
  fetchAllCustomers,
  updateCustomer,
  createQuote,
  updateQuote,
  fetchQuote,
  deleteCustomer,
  generateQuoteNumber,
  allCount,
  fetchAllQuotes,
  verifyToken,
  getLoggedInUser,
  deleteQuote,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  fetchAllInvoices,
  fetchInvoice,
  generateInvoiceNumber,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/loggedinuser", verifyToken, getLoggedInUser);

router.post("/login", getLogin);
router.post("/signup", createUser);
router.get("/allCount", allCount);

router.post("/addcustomer", addCustomer);
router.get("/editcustomer/:id", fetchCustomer);
router.get("/getallcustomers", fetchAllCustomers);
router.put("/editcustomer/:id", updateCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);

router.post("/createquote", createQuote);
router.put("/editquote/:id", updateQuote);
router.get("/editquote/:id", fetchQuote);
router.delete("/deletequote/:id", deleteQuote);
router.get("/quotenumber", generateQuoteNumber);
router.get("/getallquotes", fetchAllQuotes);

router.post("/createinvoice", createInvoice);
router.put("/editinvoice/:id", updateInvoice);
router.get("/editinvoice/:id", fetchInvoice);
router.delete("/deleteinvoice/:id", deleteInvoice);
router.get("/invoicenumber", generateInvoiceNumber);
router.get("/getallinvoices", fetchAllInvoices);

export default router;
