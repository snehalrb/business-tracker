import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
