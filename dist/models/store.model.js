"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/store.model.ts
const mongoose_1 = require("mongoose");
// Define the schema for stores
const storeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        country: { type: String, required: true },
        zipCode: { type: String },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    storeImage: { type: String },
    contact: {
        phone: { type: String, required: true },
        email: { type: String },
    },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
    openingHours: {
        monday: { open: { type: String }, close: { type: String } },
        tuesday: { open: { type: String }, close: { type: String } },
        wednesday: { open: { type: String }, close: { type: String } },
        thursday: { open: { type: String }, close: { type: String } },
        friday: { open: { type: String }, close: { type: String } },
        saturday: { open: { type: String }, close: { type: String } },
        sunday: { open: { type: String }, close: { type: String } },
    },
    ratings: {
        average: { type: Number, default: 0 },
        totalRatings: { type: Number, default: 0 },
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});
// Middleware to update the updatedAt field before saving
storeSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create and export the Store model
const Store = (0, mongoose_1.model)("Store", storeSchema);
exports.default = Store;
