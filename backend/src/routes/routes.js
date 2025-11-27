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
} from "../controllers/authController.js";

const router = express.Router();

router.get("/loggedinuser", verifyToken, getLoggedInUser);

router.post("/login", getLogin);
router.post("/signup", createUser);

router.post("/addcustomer", addCustomer);
router.get("/editcustomer/:id", fetchCustomer);
router.get("/getallcustomers", fetchAllCustomers);
router.put("/editcustomer/:id", updateCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);

router.post("/createquote", createQuote);
router.put("/editquote/:id", updateQuote);

router.get("/editquote/:id", fetchQuote);
router.delete("/deletequote/:id", deleteQuote);
router.get("/allCount", allCount);
router.get("/quotenumber", generateQuoteNumber);
router.get("/getallquotes", fetchAllQuotes);

export default router;
