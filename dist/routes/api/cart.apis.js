"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/cartRoutes.ts
const express_1 = require("express");
const cart_controller_1 = require("../../controllers/cart.controller");
const router = (0, express_1.Router)();
/// add item to cart
router.post("/cart", cart_controller_1.addItemToCart);
/// remove item from cart
router.delete("/cart/:id", cart_controller_1.removeItemFromCart);
/// view cart
router.get("/cart/:userId", cart_controller_1.viewCart);
/// view cart
router.get("/cart/:id", cart_controller_1.viewCart);
/// update cart
router.patch("/cart/:id", cart_controller_1.viewCart);
exports.default = router;
