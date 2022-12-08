import asyncHandler from "express-async-handler";
import PurchaseOrder from "../models/purchaseOrderModel.js";
// import Stock from "../models/stockModel.js";
import {updateOrInsertProductsStockCountByNames} from "./stockController.js";

// @desc    Fetch all PurchaseOrders
// @route   GET /api/purchase-orders
// @access  Public
const getAllPurchaseOrders = asyncHandler(async (req, res) => {
  const purchaseOrders = await PurchaseOrder.find()
    .sort({ name: 1 });
  res.json(purchaseOrders);
});

// @desc    Fetch single Purchase Order
// @route   GET /api/purchase-order/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log('Inside getById , Id : ',id);
  const purchaseOrder = await PurchaseOrder.findById(id);
  if (purchaseOrder) {
    res.json(purchaseOrder);
  } else {
    res.status(404);
    throw new Error("purchaseOrder not found");
  }
});

// @desc    Delete a Purchase Order
// @route   DELETE /api/purchase-order/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const purchaseOrder = await PurchaseOrder.findById(req.params.id);

  if (purchaseOrder) {
    await purchaseOrder.remove();
    res.json({ message: "PurchaseOrder removed" });
  } else {
    res.status(404);
    throw new Error("PurchaseOrder not found");
  }
});

// @desc    Create a Purchase Order
// @route   POST /api/purchase-order
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  console.log("Exe create of Purchase Order");
  const {
    partyName,
    contactNo,
    billNo,
    billDate,
    stateOfSupply,
    paymentType,
    description,
    roundOff,
    total,
    purchaseOrderProducts
  } = req.body;

  const purchaseOrder = new PurchaseOrder({
    partyName,
    contactNo,
    billNo,
    billDate,
    stateOfSupply,
    paymentType,
    description,
    roundOff,
    total,
    purchaseOrderProducts
  });
  console.log("Before Saving product from Purchase Order Controller : " + purchaseOrder);
  const createdPurchaseOrder = await purchaseOrder.save();
  if (createdPurchaseOrder) {
    // updateProductsStockCountByNames(purchaseOrderProducts)
    // const query = { name: "Deli Llama" };
    // const update = { $set: { name: "Deli Llama", address: "3 Nassau St" }};
    // const options = { upsert: true };
    // collection.updateOne(query, update, options);
    
    res.status(201).json(createdPurchaseOrder);
  } else {
    res.status(404);
    throw new Error("Purchase Order not found");
  }
});

// @desc    Update a PurchaseOrder
// @route   PUT /api/purchase-order/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const {
    partyName,
    contactNo,
    billNo,
    billDate,
    stateOfSupply,
    paymentType,
    description,
    roundOff,
    total
  } = req.body;

  const purchaseOrder = await PurchaseOrder.findById(req.params.id);

  if (purchaseOrder) {
    purchaseOrder.partyName = partyName;
    purchaseOrder.contactNo = contactNo;
    purchaseOrder.billNo = billNo;
    purchaseOrder.billDate = billDate;
    purchaseOrder.stateOfSupply = stateOfSupply;
    purchaseOrder.paymentType = paymentType;  
    purchaseOrder.description = description;
    purchaseOrder.roundOff = roundOff;
    purchaseOrder.total = total;

    const updatedPurchaseOrder= await purchaseOrder.save();
    res.json(updatedPurchaseOrder);
  } else {
    res.status(404);
    throw new Error("PurchaseOrder not found");
  }
});

export {
  getAllPurchaseOrders,
  getById,
  remove,
  create,
  update,
};
