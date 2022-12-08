import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import Store from "../models/storeModel.js";

const ObjectId = mongoose.Types.ObjectId;
// @desc    Create new order
// @route   POST /api/order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    store,
  } = req.body;

  console.log("Add Order Items .!" + orderItems + ", totalPrice" + totalPrice);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      store,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  console.log("EXEC updateOrderStatus");
  const order = await Order.findById(req.params.id);
  const newStatus = req.params.orderStatus;
  if (order) {
    console.log("EXEC updateOrderStatus", order);
    order.orderStatus = newStatus || order.orderStatus;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderPaymentDetails = asyncHandler(async (req, res) => {
  console.log("EXEC updateOrderPaymentDetails");
  console.log(req.params);

  const order = await Order.findById(req.params.id);
  console.log(order);
  const { mode, amount, paidTo, chequeNo, bankName, comments } = req.body;
  console.log(mode, amount, paidTo, chequeNo, bankName, comments);
  if (order) {
    console.log("Fond Order ... so trying to  Update...with above values");
    order.paymentDetails = {
      mode: mode,
      amount: amount,
      paidTo: paidTo,
      chequeNo: chequeNo,
      bankName: bankName,
      comments: comments,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req.user._id });
  const id = req.user._id;
  console.log("MyORDERS" + id);
  const orders = await Order.find({ user: id })
    .sort({ createdAt: -1 })
    .populate("user", "id name");
  // const orders = await Order.find({ user: id })

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  console.log("Get All Orders Exec");
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "id name");

  if (orders) {
    console.log("Found Stores ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all orders By Stroe ID
// @route   GET /api/orders/store/:id

const getAllOrdersByStoreId = asyncHandler(async (req, res) => {
  const store = req.params.id;
  console.log("Get All Orders By Store ID : ", store);
  const orders = await Order.find({ store }).populate("user", "id name");
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found for Store ID : ", store);
  }
});

// @desc    Cancel order by Id
// @route   GET /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  console.log("EXEC cancelOrder");
  const orderExists = await Order.findById(req.params.id);
  if (orderExists) {
    console.log("EXEC updateOrderStatus", orderExists);
    orderExists.orderStatus = "Cancel";
    const updatedOrder = await orderExists.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/analytics/store
// @access  Private/Admin
const ordersCountByStore = asyncHandler(async (req, res) => {
  console.log("Get Orders Count By Store ID : ");

  const orders = await Order.aggregate([
    { $group: { _id: { store: "$store" }, totalOrders: { $sum: 1 } } },

    {
      $lookup: {
        from: "stores",
        localField: "_id",
        foreignField: "store",
        as: "Store",
      },
    },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        Store: 1,
      },
    },
  ]).sort({ store: -1 });

  if (orders) {
    console.log("Found Orders by Store ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/analytics/store
// @access  Private/Admin
const ordersByStore = asyncHandler(async (req, res) => {
  console.log("Get Orders By Store ID : ", req.params.id);
  const storeId = req.params.id;
  const orders = await Order.aggregate([
    { $match: { store: ObjectId(storeId) } },
    { $group: { _id: { store: "$store" }, totalOrders: { $sum: 1 } } },
    // {
    //   $lookup: {
    //     from: "store",
    //     localField: "_id",
    //     foreignField: "store",
    //     as: "Store Name",
    //   },
    // },
    // {
    //   $project: { "Store Name": 1 },
    // },
  ]).sort({ store: -1 });

  if (orders) {
    console.log("Found Orders by Store ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/analytics/user/:id
// @access  Private/Admin
const ordersByUser = asyncHandler(async (req, res) => {
  console.log("Get Orders By User", req.params.id);
  const userId = req.params.id;
  // const userId = ObjectId("608a2d2272260a787819ab49");
  const orders = await Order.aggregate([
    { $match: { user: ObjectId(userId) } },
    {
      $group: {
        _id: {
          user: "$user",
          orderItems: "$orderItems",
        },
        totalPrice: { $sum: "$totalPrice" },
        shippingPrice: { $sum: "$shippingPrice" },
        taxPrice: { $sum: "$taxPrice" },
      },
    },
    {
      $project: { totalPrice: 1, shippingPrice: 1, taxPrice: 1 },
    },
  ]).sort({ totalPrice: -1 });

  if (orders) {
    console.log("Found Orders by User Name ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/analytics/paymode
// @access  Private/Admin
const ordersByPayMode = asyncHandler(async (req, res) => {
  console.log("Get Orders By PayMode");
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "id name");

  if (orders) {
    console.log("Found Orders by Pay Mode..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all Sales by Store
// @route   GET /api/orders/analytics/sales/store
// @access  Private/Admin
const salesByStore = asyncHandler(async (req, res) => {
  console.log("Get Sales By Store ");
  const orders = await Order.aggregate([
    {
      $group: {
        _id: {
          store: "$store",
        },
        totalPrice: { $sum: "$totalPrice" },
      },
    },

    {
      $project: { totalPrice: 1, Store: 1 },
    },
  ]).sort({ store: -1 });

  if (orders) {
    console.log("Found Orders by Store ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    Get all Sales by User
// @route   GET /api/orders/analytics/sales/user
// @access  Private/Admin
const salesByUser = asyncHandler(async (req, res) => {
  console.log("Sales By User");
  const orders = await Order.aggregate([
    {
      $group: {
        _id: {
          user: "$user",
        },
        ordersCount: { $sum: 1 },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
    {
      $project: { totalPrice: 1, ordersCount: 1 },
    },
  ]).sort({ user: -1 });

  if (orders) {
    console.log("Found Orders by User ..", orders.length);
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

// @desc    GET STORE ORDER DETAILS
const getStoreOrderDetails = asyncHandler(async (req, res) => {
  const storeId = req.params.id;
  console.log("Store ID passed : ", storeId);
  const results = await Order.aggregate([
    { $match: { store: ObjectId(storeId) } },
    {
      $lookup: {
        from: "stores",
        localField: "store",
        foreignField: "_id",
        as: "Store",
      },
    },
    {
      $project: { totalPrice: 1, ordersCount: 1, Store: 1 },
    },
  ]);

  if (results) {
    console.log(
      "Results : ",
      results.forEach((rec) =>
        console.log("Store Info  : ", rec.Store, " toStr : ", toString(rec))
      )
    );
    res.json(results);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  getAllOrdersByStoreId,
  updateOrderStatus,
  cancelOrder,
  updateOrderPaymentDetails,
  ordersByUser,
  ordersByStore,
  ordersCountByStore,
  ordersByPayMode,
  getStoreOrderDetails,
  salesByStore,
  salesByUser,
};
