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
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
// Create a new transaction
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, orderId, subscriptionId, type, method, amount, status, paymentDetails, transactionResult, } = req.body;
        if (!customerId || !type || !method || !amount) {
            res.status(400).send("Required fields are missing.");
            return;
        }
        const newTransaction = new transaction_model_1.default({
            customerId,
            orderId,
            subscriptionId,
            type,
            method,
            amount,
            status,
            paymentDetails,
            transactionResult,
        });
        yield newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).send("Error creating transaction.");
    }
});
exports.createTransaction = createTransaction;
// Get all transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find()
            .populate("customerId")
            .populate("orderId")
            .populate("subscriptionId");
        res.status(200).json(transactions);
    }
    catch (error) {
        console.error("Error retrieving transactions:", error);
        res.status(500).send("Error retrieving transactions.");
    }
});
exports.getTransactions = getTransactions;
// Get a transaction by ID
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield transaction_model_1.default.findById(id)
            .populate("customerId")
            .populate("orderId")
            .populate("subscriptionId");
        if (!transaction) {
            res.status(404).send("Transaction not found.");
            return;
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        console.error("Error retrieving transaction:", error);
        res.status(500).send("Error retrieving transaction.");
    }
});
exports.getTransactionById = getTransactionById;
// Update a transaction by ID
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedTransaction = yield transaction_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedTransaction) {
            res.status(404).send("Transaction not found.");
            return;
        }
        res.status(200).json(updatedTransaction);
    }
    catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).send("Error updating transaction.");
    }
});
exports.updateTransaction = updateTransaction;
// Delete a transaction by ID
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield transaction_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Transaction not found.");
            return;
        }
        res.status(200).send("Transaction deleted.");
    }
    catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).send("Error deleting transaction.");
    }
});
exports.deleteTransaction = deleteTransaction;
