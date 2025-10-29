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
  generateQuoteNumber,
  allCount,
  fetchAllQuotes,
  verifyToken,
  getLoggedInUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/loggedinuser", verifyToken, getLoggedInUser);

router.post("/login", getLogin);
router.post("/signup", createUser);

router.post("/addcustomer", addCustomer);
router.get("/editcustomer/:id", fetchCustomer);
router.get("/getallcustomers", fetchAllCustomers);
router.put("/editcustomer/:id", updateCustomer);

router.post("/createquote", createQuote);
router.put("/editquote/:id", updateQuote);
router.get("/editquote/:id", fetchQuote);
router.get("/allCount", allCount);
router.get("/quotenumber", generateQuoteNumber);
router.get("/getallquotes", fetchAllQuotes);

export default router;
