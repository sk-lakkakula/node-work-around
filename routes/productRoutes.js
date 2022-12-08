import express from "express";
import {
  // getAll,
  getById,
  remove,
  create,
  update,
  getAllBySubCategory,
  getBestSellers,
  getAllProductsByCategory,
  getAllProducts
} from "../controllers/productController.js";


const router = express.Router();

router.get("/cat/:id", getAllProductsByCategory);
router.get("/subcat/:id", getAllBySubCategory);
router.get("/best-seller", getBestSellers);
router.route("/").get(getAllProducts).post(create);

router.route("/:id").get(getById).delete(remove).put(update);

export default router;
