"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustWalletBalance = exports.getAllWallets = exports.getWalletTransactions = exports.withdrawFundsFromWallet = exports.addFundsToWallet = exports.getWalletBalance = void 0;
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get Wallet Balance
const getWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const wallet = yield wallet_model_1.default.findOne({
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (!wallet) {
            res.status(404).send("Wallet not found.");
            return;
        }
        res
            .status(200)
            .json({ balance: wallet.balance, currency: wallet.currency });
    }
    catch (error) {
        console.error("Error retrieving wallet balance:", error);
        res.status(500).send("Error retrieving wallet balance.");
    }
});
exports.getWalletBalance = getWalletBalance;
// Add Funds to Wallet
const addFundsToWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { amount, method } = req.body;
        if (!amount || amount <= 0) {
            res.status(400).send("Invalid amount specified.");
            return;
        }
        const wallet = yield wallet_model_1.default.findOne({
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (!wallet) {
            res.status(404).send("Wallet not found.");
            return;
        }
        // Update wallet balance
        wallet.balance += amount;
        yield wallet.save();
        // Create a transaction record for adding funds
        const newTransaction = new transaction_model_1.default({
            customerId: userId,
            type: "deposit",
            method,
            amount,
            status: "successful",
        });
        yield newTransaction.save();
        // Add transaction to the wallet's transaction list
        wallet.transactions.push(newTransaction._id);
        yield wallet.save();
        res
            .status(200)
            .json({ message: "Funds added successfully.", balance: wallet.balance });
    }
    catch (error) {
        console.error("Error adding funds to wallet:", error);
        res.status(500).send("Error adding funds to wallet.");
    }
});
exports.addFundsToWallet = addFundsToWallet;
// Withdraw Funds from Wallet
const withdrawFundsFromWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { amount, method } = req.body;
        if (!amount || amount <= 0) {
            res.status(400).send("Invalid amount specified.");
            return;
        }
        const wallet = yield wallet_model_1.default.findOne({
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (!wallet) {
            res.status(404).send("Wallet not found.");
            return;
        }
        if (wallet.balance < amount) {
            res.status(400).send("Insufficient balance.");
            return;
        }
        // Update wallet balance
        wallet.balance -= amount;
        yield wallet.save();
        // Create a transaction record for withdrawal
        const newTransaction = new transaction_model_1.default({
            customerId: userId,
            type: "withdrawal",
            method,
            amount,
            status: "successful",
        });
        yield newTransaction.save();
        // Add transaction to the wallet's transaction list
        wallet.transactions.push(newTransaction._id);
        yield wallet.save();
        res
            .status(200)
            .json({
            message: "Funds withdrawn successfully.",
            balance: wallet.balance,
        });
    }
    catch (error) {
        console.error("Error withdrawing funds from wallet:", error);
        res.status(500).send("Error withdrawing funds from wallet.");
    }
});
exports.withdrawFundsFromWallet = withdrawFundsFromWallet;
// Get Wallet Transactions
const getWalletTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const wallet = yield wallet_model_1.default.findOne({
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (!wallet) {
            res.status(404).send("Wallet not found.");
            return;
        }
        const transactions = yield transaction_model_1.default.find({ customerId: userId });
        res.status(200).json(transactions);
    }
    catch (error) {
        console.error("Error retrieving wallet transactions:", error);
        res.status(500).send("Error retrieving wallet transactions.");
    }
});
exports.getWalletTransactions = getWalletTransactions;
// Admin: Get All Wallets
const getAllWallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield wallet_model_1.default.find().populate("userId");
        res.status(200).json(wallets);
    }
    catch (error) {
        console.error("Error retrieving all wallets:", error);
        res.status(500).send("Error retrieving all wallets.");
    }
});
exports.getAllWallets = getAllWallets;
// Admin: Adjust Wallet Balance
const adjustWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { amount, operation } = req.body; // operation can be "add" or "subtract"
        const wallet = yield wallet_model_1.default.findOne({
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (!wallet) {
            res.status(404).send("Wallet not found.");
            return;
        }
        if (operation === "add") {
            wallet.balance += amount;
        }
        else if (operation === "subtract") {
            if (wallet.balance < amount) {
                res.status(400).send("Insufficient balance.");
                return;
            }
            wallet.balance -= amount;
        }
        else {
            res.status(400).send("Invalid operation.");
            return;
        }
        yield wallet.save();
        res
            .status(200)
            .json({
            message: "Wallet balance adjusted successfully.",
            balance: wallet.balance,
        });
    }
    catch (error) {
        console.error("Error adjusting wallet balance:", error);
        res.status(500).send("Error adjusting wallet balance.");
    }
});
exports.adjustWalletBalance = adjustWalletBalance;
