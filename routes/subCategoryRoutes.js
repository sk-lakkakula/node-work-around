import express from "express";
import {
  create,
  getAll,
  remove,
  getById,
  update,
  getAllByCategoryId,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router.route("/").post(create).get(getAll);
router.route("/").get(getAll);
router.route("/catId/:id").get(getAllByCategoryId);
router.route("/:id").delete(remove).get(getById).put(update);

export default router;
