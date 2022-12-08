import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        description: { type: String, required: false },
        quantityOrdered: { type: Number, required: false },
        imageUrl: { type: String, required: false },
        orderType: { type: String, required: false },
        unitPrice: { type: Number, required: false },
        // totalPrice: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentDetails: {
      mode: { type: String, required: true },
      amount: { type: Number, required: false },
      paidTo: { type: String, required: false },
      chequeNo: { type: String, required: false },
      bankName: { type: String, required: false },
      comments: { type: String, required: false },
      paymentStatus: { type: String, required: false },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      emailAddress: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Store",
    },
    orderStatus: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
