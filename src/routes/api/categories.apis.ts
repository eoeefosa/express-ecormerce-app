// src/routes/categoryRoutes.ts
import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/categories.controller";

const router = Router();

router.post("/cartegory", createCategory);
router.get("/cartegory", getCategories);
router.get("/cartegory/:id", getCategoryById);
router.put("/cartegory/:id", updateCategory);
router.delete("/cartegory/:id", deleteCategory);

export default router;
