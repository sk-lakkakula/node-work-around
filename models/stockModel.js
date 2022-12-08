import mongoose from "mongoose";

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },

    uom: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
