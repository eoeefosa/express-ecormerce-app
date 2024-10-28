"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/cart.ts
const mongoose_1 = require("mongoose");
// Define the Cart schema
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number },
});
// Create the Cart model
const Cart = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = Cart;
