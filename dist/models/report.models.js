"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Report schema
const reportSchema = new mongoose_1.Schema({
    reporter: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // The user who is making the report
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }, // Reference to a Product schema (optional)
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }, // Reference to a User schema (optional)
    reason: { type: String, required: true }, // The reason for the report
    description: { type: String }, // Optional detailed description of the report
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Resolved", "Dismissed"],
        default: "Pending",
    }, // Status of the report
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the report was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp for when the report was last updated
});
// Add validation to ensure that at least one of "product" or "user" is provided
reportSchema.pre("validate", function (next) {
    if (!this.product && !this.user) {
        next(new Error("At least one of 'product' or 'user' must be provided."));
    }
    else {
        next();
    }
});
// Create a model from the schema
const Report = (0, mongoose_1.model)("Report", reportSchema);
exports.default = Report;
