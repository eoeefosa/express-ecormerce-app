"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the SubscriptionPlan schema
const subscriptionPlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }, // Name of the subscription plan
    description: { type: String }, // Description of the subscription plan
    price: { type: Number, required: true }, // Price of the subscription plan
    duration: { type: String, required: true }, // Duration of the plan (e.g., "1 month", "1 year")
    features: [String], // List of features included in the plan
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the plan was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp for when the plan was last updated
});
// Middleware to update the updatedAt field before saving
subscriptionPlanSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the SubscriptionPlan model from the schema
const SubscriptionPlan = (0, mongoose_1.model)("SubscriptionPlan", subscriptionPlanSchema);
exports.default = SubscriptionPlan;
