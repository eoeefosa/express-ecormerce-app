// src/controllers/cartController.ts
import { Request, Response } from "express";
import Cart from "../models/cart.model";

// Add an item to the cart
export const addItemToCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, product, quantity, totalPrice } = req.body;

    if (!user || !product || !quantity) {
      res.status(400).send("User, product ID, and quantity are required.");
      return;
    }

    // Check if the item already exists in the cart
    const existingItem = await Cart.findOne({ user, product });

    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity;
      existingItem.totalPrice = totalPrice || existingItem.totalPrice;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      // Create a new cart item
      const newCartItem = new Cart({ user, product, quantity, totalPrice });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Error adding item to cart.");
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Cart item ID is required.");
      return;
    }

    const result = await Cart.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Cart item not found.");
      return;
    }

    res.status(200).send("Item removed from cart.");
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Error removing item from cart.");
  }
};

// View the cart for a specific user
export const viewCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).send("User ID is required.");
      return;
    }

    const items = await Cart.find({ user: userId }).populate("product");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).send("Error retrieving cart.");
  }
};
