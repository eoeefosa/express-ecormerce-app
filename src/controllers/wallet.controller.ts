// src/controllers/walletController.ts
import { Request, Response } from "express";
import Wallet from "../models/wallet.model";
import Transaction from "../models/transaction.model";
import mongoose from "mongoose";

// Get Wallet Balance
export const getWalletBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!wallet) {
      res.status(404).send("Wallet not found.");
      return;
    }

    res
      .status(200)
      .json({ balance: wallet.balance, currency: wallet.currency });
  } catch (error) {
    console.error("Error retrieving wallet balance:", error);
    res.status(500).send("Error retrieving wallet balance.");
  }
};

// Add Funds to Wallet
export const addFundsToWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { amount, method } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).send("Invalid amount specified.");
      return;
    }

    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!wallet) {
      res.status(404).send("Wallet not found.");
      return;
    }

    // Update wallet balance
    wallet.balance += amount;
    await wallet.save();

    // Create a transaction record for adding funds
    const newTransaction = new Transaction({
      customerId: userId,
      type: "deposit",
      method,
      amount,
      status: "successful",
    });

    await newTransaction.save();

    // Add transaction to the wallet's transaction list
    wallet.transactions.push(newTransaction._id);
    await wallet.save();

    res
      .status(200)
      .json({ message: "Funds added successfully.", balance: wallet.balance });
  } catch (error) {
    console.error("Error adding funds to wallet:", error);
    res.status(500).send("Error adding funds to wallet.");
  }
};

// Withdraw Funds from Wallet
export const withdrawFundsFromWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { amount, method } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).send("Invalid amount specified.");
      return;
    }

    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(userId),
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
    await wallet.save();

    // Create a transaction record for withdrawal
    const newTransaction = new Transaction({
      customerId: userId,
      type: "withdrawal",
      method,
      amount,
      status: "successful",
    });

    await newTransaction.save();

    // Add transaction to the wallet's transaction list
    wallet.transactions.push(newTransaction._id);
    await wallet.save();

    res
      .status(200)
      .json({
        message: "Funds withdrawn successfully.",
        balance: wallet.balance,
      });
  } catch (error) {
    console.error("Error withdrawing funds from wallet:", error);
    res.status(500).send("Error withdrawing funds from wallet.");
  }
};

// Get Wallet Transactions
export const getWalletTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!wallet) {
      res.status(404).send("Wallet not found.");
      return;
    }

    const transactions = await Transaction.find({ customerId: userId });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving wallet transactions:", error);
    res.status(500).send("Error retrieving wallet transactions.");
  }
};

// Admin: Get All Wallets
export const getAllWallets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const wallets = await Wallet.find().populate("userId");

    res.status(200).json(wallets);
  } catch (error) {
    console.error("Error retrieving all wallets:", error);
    res.status(500).send("Error retrieving all wallets.");
  }
};

// Admin: Adjust Wallet Balance
export const adjustWalletBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { amount, operation } = req.body; // operation can be "add" or "subtract"

    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!wallet) {
      res.status(404).send("Wallet not found.");
      return;
    }

    if (operation === "add") {
      wallet.balance += amount;
    } else if (operation === "subtract") {
      if (wallet.balance < amount) {
        res.status(400).send("Insufficient balance.");
        return;
      }
      wallet.balance -= amount;
    } else {
      res.status(400).send("Invalid operation.");
      return;
    }

    await wallet.save();

    res
      .status(200)
      .json({
        message: "Wallet balance adjusted successfully.",
        balance: wallet.balance,
      });
  } catch (error) {
    console.error("Error adjusting wallet balance:", error);
    res.status(500).send("Error adjusting wallet balance.");
  }
};
