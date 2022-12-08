import express from "express";
import {
  getAllPurchaseOrders,
  getById,
  remove,
  create,
  update,
} from "../controllers/purchaseOrderController.js";


const router = express.Router();

router.route("/").get(getAllPurchaseOrders).post(create);

router.route("/:id").get(getById).delete(remove).put(update);

export default router;
