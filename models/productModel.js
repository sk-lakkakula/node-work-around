import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PurchaseOrder",
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },

    isTaxable: {
      type: Boolean,
      required: false,
    },
    taxPercent: {
      type: Number,
      required: false,
    },
    discountPercent: {
      type: Number,
      required: false,
    },
    discountAmount: {
      type: Number,
      required: false,
    },
    isBestSeller: {
      type: Boolean,
      required: false,
    },
    quantity:{
      type: Number,
      required: true,  
    },
    units:{
      type: Number,
      required: true,  
    },
    pricePerUnit:{
      type: Number,
      required: true,  
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
