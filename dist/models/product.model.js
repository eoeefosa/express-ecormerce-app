"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/product.model.ts
const mongoose_1 = require("mongoose");
// Define the schema for product variations
const productVariationSchema = new mongoose_1.Schema({
    // sku: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [String],
});
// Define the schema for products
const productSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    inventory: { type: Number },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
    variations: [productVariationSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: String },
    sold: { type: Boolean },
    ratings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Rating" }],
});
// Create and export the Product model
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
