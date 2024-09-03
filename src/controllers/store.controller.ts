// src/controllers/storeController.ts
import { Request, Response } from "express";
import Store from "../models/store.model";
import Product from "../models/product.model";

// Create a new store
export const createStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      owner,
      location,
      storeImage,
      contact,
      products,
      openingHours,
      ratings,
      description,
      isActive,
    } = req.body;

    if (!name || !owner || !location || !contact || !location.coordinates) {
      res.status(400).send("Required fields are missing.");
      return;
    }

    const newStore = new Store({
      name,
      owner,
      location,
      storeImage,
      contact,
      products,
      openingHours,
      ratings,
      description,
      isActive,
    });

    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).send("Error creating store.");
  }
};

// Get all stores
export const getStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const stores = await Store.find().populate("owner").populate("products");
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error retrieving stores:", error);
    res.status(500).send("Error retrieving stores.");
  }
};

// Get a store by ID
export const getStoreById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const store = await Store.findById(id)
      .populate("owner")
      .populate("products");
    if (!store) {
      res.status(404).send("Store not found.");
      return;
    }

    res.status(200).json(store);
  } catch (error) {
    console.error("Error retrieving store:", error);
    res.status(500).send("Error retrieving store.");
  }
};

// Update a store by ID
export const updateStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      owner,
      location,
      storeImage,
      contact,
      products,
      openingHours,
      ratings,
      description,
      isActive,
    } = req.body;

    const updatedStore = await Store.findByIdAndUpdate(
      id,
      {
        name,
        owner,
        location,
        storeImage,
        contact,
        products,
        openingHours,
        ratings,
        description,
        isActive,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedStore) {
      res.status(404).send("Store not found.");
      return;
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).send("Error updating store.");
  }
};

// Delete a store by ID
export const deleteStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Store.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Store not found.");
      return;
    }

    res.status(200).send("Store deleted.");
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).send("Error deleting store.");
  }
};

// Add products to a store
export const addProductsToStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { storeId, productIds } = req.body;

    if (!storeId || !productIds || !Array.isArray(productIds)) {
      res.status(400).send("Store ID and product IDs are required.");
      return;
    }

    const store = await Store.findById(storeId);
    if (!store) {
      res.status(404).send("Store not found.");
      return;
    }

    // Ensure products exist before adding
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      res.status(404).send("One or more products not found.");
      return;
    }
    if (store.products != null) {
      store.products.push(...productIds);
    } else {
      store.products = [...productIds];
    }
    await store.save();

    res.status(200).json(store);
  } catch (error) {
    console.error("Error adding products to store:", error);
    res.status(500).send("Error adding products to store.");
  }
};

// Remove a product from a store
export const removeProductFromStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { storeId, productId } = req.body;

    if (!storeId || !productId) {
      res.status(400).send("Store ID and product ID are required.");
      return;
    }

    const store = await Store.findById(storeId);
    if (!store) {
      res.status(404).send("Store not found.");
      return;
    }

    if (store.products != null) {
      store.products = store.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      res.status(404).send("Store is empty");
      return;
    }

    await store.save();

    res.status(200).json(store);
  } catch (error) {
    console.error("Error removing product from store:", error);
    res.status(500).send("Error removing product from store.");
  }
};
