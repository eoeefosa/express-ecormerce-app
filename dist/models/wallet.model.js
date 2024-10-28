"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User schema
    balance: { type: Number, default: 0, required: true }, // Current wallet balance
    currency: { type: String, default: "USD", required: true }, // Currency type, defaulting to USD
    transactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" }], // Array of references to Transaction schema
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the wallet was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp for when the wallet was last updated
});
// Middleware to update the updatedAt field before saving
walletSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the Wallet model from the schema
const Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
exports.default = Wallet;
