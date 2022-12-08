import express from "express";
import { create } from "../controllers/purchaseOrderController.js";
import {

  getStockCountByProductName,
  addStockCountByProductName,
  resetAllProductsStockCount,
  updateOrInsertProductsStockCountByNames,
  updateStockCountByProductName,
  createStockEntryForProduct
} from "../controllers/stockController.js";

const router = express.Router();

router
  .get("/product/:Name", getStockCountByProductName)
  .put("/product/:Name", updateStockCountByProductName)
  .post("/product/:name", addStockCountByProductName)
  .post("/new", createStockEntryForProduct)
  .put("/product", resetAllProductsStockCount)
  .post("/products", updateOrInsertProductsStockCountByNames)

export default router;
