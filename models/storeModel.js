import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    managerName: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    managerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
