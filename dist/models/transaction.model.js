"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to a User schema
    // Optional references to related entities based on transaction type
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order" }, // Reference to an Order schema for product payments
    subscriptionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Subscription" }, // Reference to a Subscription schema for subscription payments
    type: {
        type: String,
        enum: [
            "Deposit",
            "Withdrawal",
            "Payment",
            "Refund",
            "Transfer",
            "Subscription",
        ], // Types of transactions
        required: true,
    },
    method: {
        type: String,
        enum: ["Debit Card", "Bank Transfer", "Cash", "Cryptocurrency", "Wallet"], // Payment methods
        required: true,
    },
    amount: { type: Number, required: true }, // Transaction amount
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Cancelled"],
        default: "Pending",
    },
    paymentDetails: {
        // Optional: Store additional details about the payment method
        cardNumber: { type: String }, // Masked card number (if applicable)
        bankName: { type: String }, // Bank name (if applicable)
        cryptoWallet: { type: String }, // Crypto wallet address (if applicable)
        walletid: { type: mongoose_1.Schema.Types.ObjectId },
    },
    transactionResult: {
        id: { type: String }, // Payment gateway transaction ID
        status: { type: String }, // Status returned by payment gateway
        update_time: { type: Date }, // Time when the transaction status was last updated
        email_address: { type: String }, // Email address used in transaction (if applicable)
    },
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the transaction was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp for when the transaction was last updated
});
// Middleware to update the updatedAt field before saving
transactionSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create a model from the schema
const Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
exports.default = Transaction;
