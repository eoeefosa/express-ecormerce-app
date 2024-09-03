// src/routes/userRoutes.ts
import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  protect,
  admin,
} from "../../controllers/user.controller";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/all", protect, admin, getAllUsers);

export default router;
