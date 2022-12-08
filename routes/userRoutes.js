import express from "express";
import {
  create
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").post(create);

export default router;
