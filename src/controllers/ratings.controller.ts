// src/controllers/ratingController.ts
import { Request, Response } from "express";
import Rating from "../models/ratings.model";

// Create a new rating
export const createRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerId, productId, rating, comment } = req.body;

    if (!customerId || !productId || rating === undefined) {
      res.status(400).send("Required fields are missing.");
      return;
    }

    const newRating = new Rating({ customerId, productId, rating, comment });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).send("Error creating rating.");
  }
};

// Get all ratings
export const getRatings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ratings = await Rating.find()
      .populate("customerId")
      .populate("productId");
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error retrieving ratings:", error);
    res.status(500).send("Error retrieving ratings.");
  }
};

// Get a rating by ID
export const getRatingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const rating = await Rating.findById(id)
      .populate("customerId")
      .populate("productId");
    if (!rating) {
      res.status(404).send("Rating not found.");
      return;
    }

    res.status(200).json(rating);
  } catch (error) {
    console.error("Error retrieving rating:", error);
    res.status(500).send("Error retrieving rating.");
  }
};

// Update a rating by ID
export const updateRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { rating, comment, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedRating) {
      res.status(404).send("Rating not found.");
      return;
    }

    res.status(200).json(updatedRating);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).send("Error updating rating.");
  }
};

// Delete a rating by ID
export const deleteRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Rating.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Rating not found.");
      return;
    }

    res.status(200).send("Rating deleted.");
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).send("Error deleting rating.");
  }
};
