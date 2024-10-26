// src/routes/cartRoutes.ts
import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  viewCart,
} from "../../controllers/cart.controller";

const router = Router();

/// add item to cart
router.post("", addItemToCart);
/// remove item from cart
router.delete("/:id", removeItemFromCart);
/// view cart
router.get("/:userId", viewCart);
/// view cart
router.get("/:id", viewCart);
/// update cart
router.patch("/:id", viewCart);

export default router;
