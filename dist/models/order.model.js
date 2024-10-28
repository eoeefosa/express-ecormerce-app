"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/order.model.ts
const mongoose_1 = require("mongoose");
// Define the schema for order items
const orderItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    variationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product.variations",
        required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, default: 0 },
});
// Define the schema for orders
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    transactionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
// Create and export the Order model
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
