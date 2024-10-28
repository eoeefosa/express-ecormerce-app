"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = require("express");
const order_controller_1 = require("../../controllers/order.controller");
const router = (0, express_1.Router)();
router.post("/order", order_controller_1.createOrder);
router.get("/order", order_controller_1.getOrders);
router.get("/order/:id", order_controller_1.getOrderById);
router.put("/order/:id", order_controller_1.updateOrder);
router.delete("/order/:id", order_controller_1.deleteOrder);
exports.default = router;
