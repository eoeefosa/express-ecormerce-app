"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/category.model.ts
const mongoose_1 = require("mongoose");
// Define the Category schema
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    categoryImage: { type: String },
    description: { type: String },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
// Create the Category model
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
