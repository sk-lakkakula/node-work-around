import mongoose from "mongoose";

const purchaseOrderSchema = mongoose.Schema(
  {
    partyName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    billNo: {
      type: String,
    },
    billDate: {
      type: String,
    },
    stateOfSupply: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    description: {
      type: String,
    },
    roundOff: {
      type: Number,
      required: false,
    },
    total: {
      type: String,
      required: true,
    },
    purchaseOrderProducts: {
      type:Array,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
export default PurchaseOrder;
