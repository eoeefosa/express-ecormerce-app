// src/routes/cartRoutes.ts
import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  viewCart,
} from "../../controllers/cart.controller";

const router = Router();

/// add item to cart
router.post("/cart", addItemToCart);
/// remove item from cart
router.delete("/cart/:id", removeItemFromCart);
/// view cart
router.get("/cart/:userId", viewCart);
/// view cart
router.get("/cart/:id", viewCart);
/// update cart
router.patch("/cart/:id", viewCart);

export default router;
