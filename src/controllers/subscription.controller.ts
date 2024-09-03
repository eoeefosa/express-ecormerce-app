// src/controllers/subscriptionController.ts
import { Request, Response } from "express";
import Subscription from "../models/subscription.model";
import Plan from "../models/subplans.model"; // Assuming you have a Plan model
import User from "../models/user.model"; // Assuming you have a User model

// Create a new subscription
export const createSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, plan, endDate, autoRenew } = req.body;

    if (!user || !plan || !endDate) {
      res.status(400).send("Required fields are missing.");
      return;
    }

    // Verify the existence of the user and plan
    const existingUser = await User.findById(user);
    const existingPlan = await Plan.findById(plan);

    if (!existingUser || !existingPlan) {
      res.status(404).send("User or Plan not found.");
      return;
    }

    const newSubscription = new Subscription({
      user,
      plan,
      endDate,
      autoRenew,
    });

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).send("Error creating subscription.");
  }
};

// Get all subscriptions
export const getSubscriptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user")
      .populate("plan");
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    res.status(500).send("Error retrieving subscriptions.");
  }
};

// Get a subscription by ID
export const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id)
      .populate("user")
      .populate("plan");
    if (!subscription) {
      res.status(404).send("Subscription not found.");
      return;
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error retrieving subscription:", error);
    res.status(500).send("Error retrieving subscription.");
  }
};

// Update a subscription by ID
export const updateSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      user,
      plan,
      endDate,
      status,
      autoRenew,
      lastPaymentDate,
      nextBillingDate,
      transactions,
    } = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      {
        user,
        plan,
        endDate,
        status,
        autoRenew,
        lastPaymentDate,
        nextBillingDate,
        transactions,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSubscription) {
      res.status(404).send("Subscription not found.");
      return;
    }

    res.status(200).json(updatedSubscription);
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).send("Error updating subscription.");
  }
};

// Delete a subscription by ID
export const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Subscription.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Subscription not found.");
      return;
    }

    res.status(200).send("Subscription deleted.");
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).send("Error deleting subscription.");
  }
};
