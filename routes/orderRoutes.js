import express from "express";
import {
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
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);
router.route("/analytics/user/:id").get(ordersByUser);
router.route("/analytics/store/:id").get(ordersByStore);
router.route("/analytics/count/store").get(ordersCountByStore);
router.route("/analytics/sales/store").get(salesByStore);
router.route("/analytics/sales/user").get(salesByUser);
router.route("/analytics/store-order-details/:id").get(getStoreOrderDetails);
router.route("/analytics/paymode").get(ordersByPayMode);
router.route("/myorders").get(getMyOrders);
router.route("/store/:id").get(getAllOrdersByStoreId);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/paymentdetails").put(updateOrderPaymentDetails);
router.route("/:id/:orderStatus").put(updateOrderStatus);
router.route("/:id/cancel").put(cancelOrder);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
