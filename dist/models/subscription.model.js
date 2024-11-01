"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Subscription schema
const subscriptionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User schema
    plan: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plan", required: true }, // Reference to the Plan schema
    startDate: { type: Date, default: Date.now }, // Start date of the subscription
    endDate: { type: Date, required: true }, // End date of the subscription
    status: {
        type: String,
        enum: ["active", "expired", "canceled", "pending"],
        default: "pending",
    }, // Subscription status
    autoRenew: { type: Boolean, default: true }, // Whether the subscription will auto-renew
    lastPaymentDate: { type: Date }, // The date of the last payment made
    nextBillingDate: { type: Date }, // The next date the billing will occur
    transactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" }], // References to the Transaction schema for payment records
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the subscription was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp for when the subscription was last updated
});
// Middleware to update the updatedAt field before saving
subscriptionSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the Subscription model from the schema
const Subscription = (0, mongoose_1.model)("Subscription", subscriptionSchema);
exports.default = Subscription;
