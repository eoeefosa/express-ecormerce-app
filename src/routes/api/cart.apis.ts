// src/routes/cartRoutes.ts
import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  viewCart,
} from "../../controllers/cart.controller";

const router = Router();

router.post("/add", addItemToCart);
router.delete("/remove/:id", removeItemFromCart);
router.get("/", viewCart);

export default router;
