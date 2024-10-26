// src/routes/orderRoutes.ts
import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../../controllers/order.controller";

const router = Router();

router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;
