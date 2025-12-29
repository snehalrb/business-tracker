import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    quotenumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuedate: {
      type: Date,
      required: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    customername: {
      type: String,
      required: true,
    },
    itemdetails: [
      {
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
    ],
    additionalinfo: {
      taxrate: {
        type: Number,
        required: true,
      },
      notes: {
        type: String,
        required: false,
      },
    },
    invoicesummary: {
      taxrateamt: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  },

  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
