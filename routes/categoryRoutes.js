import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getAll).post(create);
router.route("/:id").delete(remove).get(getById).put(update);

export default router;
