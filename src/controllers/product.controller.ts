// src/controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/product.model";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      inventory,
      category,
      variations,
      location,
      sold,
      ratings,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      inventory,
      category,
      variations,
      location,
      sold,
      ratings,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product.");
  }
};

// Get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("ratings");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Error retrieving products.");
  }
};

// Get a product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("category")
      .populate("ratings");
    if (!product) {
      res.status(404).send("Product not found.");
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).send("Error retrieving product.");
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      inventory,
      category,
      variations,
      location,
      sold,
      ratings,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        inventory,
        category,
        variations,
        location,
        sold,
        ratings,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).send("Product not found.");
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product.");
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Product not found.");
      return;
    }

    res.status(200).send("Product deleted.");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product.");
  }
};
