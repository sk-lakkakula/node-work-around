import express from "express";
import {
  getStoreById,
  getAllStores,
  removeStoreById,
  updateStoreByName,
  createStore,
} from "../controllers/storeController.js";

const router = express.Router();

router
  .get("/", getAllStores)
  .get("/:id", getStoreById)
  .delete("/:id", removeStoreById)
  .put("/:id", updateStoreByName)
  .post("/", createStore);

export default router;
