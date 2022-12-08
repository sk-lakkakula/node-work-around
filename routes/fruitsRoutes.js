import express from "express";
import {
  getAll,
} from "../controllers/fruitsController.js";

const router = express.Router();

router
  .get("/process", getAll)

export default router;
