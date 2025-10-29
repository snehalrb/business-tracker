import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  quotenumber: {
    type: String,
    required: true,
  },
  expirydate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  item: {
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  additionalInfo: {
    tax: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
