// src/controllers/transactionController.ts
import { Request, Response } from "express";
import Transaction from "../models/transaction.model";

// Create a new transaction
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      customerId,
      orderId,
      subscriptionId,
      type,
      method,
      amount,
      status,
      paymentDetails,
      transactionResult,
    } = req.body;

    if (!customerId || !type || !method || !amount) {
      res.status(400).send("Required fields are missing.");
      return;
    }

    const newTransaction = new Transaction({
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

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).send("Error creating transaction.");
  }
};

// Get all transactions
export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await Transaction.find()
      .populate("customerId")
      .populate("orderId")
      .populate("subscriptionId");
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).send("Error retrieving transactions.");
  }
};

// Get a transaction by ID
export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)
      .populate("customerId")
      .populate("orderId")
      .populate("subscriptionId");
    if (!transaction) {
      res.status(404).send("Transaction not found.");
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error retrieving transaction:", error);
    res.status(500).send("Error retrieving transaction.");
  }
};

// Update a transaction by ID
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      res.status(404).send("Transaction not found.");
      return;
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Error updating transaction.");
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Transaction not found.");
      return;
    }

    res.status(200).send("Transaction deleted.");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).send("Error deleting transaction.");
  }
};
