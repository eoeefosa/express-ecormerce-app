"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/rating.model.ts
const mongoose_1 = require("mongoose");
// Define the schema for ratings
const ratingSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Create and export the Rating model
const Rating = (0, mongoose_1.model)("Rating", ratingSchema);
exports.default = Rating;
