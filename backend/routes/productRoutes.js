import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  getProductAttrById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts); // no need to add protected middleware here
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/attr/:id").get(getProductAttrById);

export default router;
