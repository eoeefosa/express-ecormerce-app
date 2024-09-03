// src/controllers/categoryController.ts
import { Request, Response } from "express";
import Category from "../models/categories.model";

// Create a new category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, categoryImage, description } = req.body;

    if (!name) {
      res.status(400).send("Category name is required.");
      return;
    }

    const newCategory = new Category({ name, categoryImage, description });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Error creating category.");
  }
};

// Get all categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).send("Error retrieving categories.");
  }
};

// Get a single category by ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).send("Category not found.");
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).send("Error retrieving category.");
  }
};

// Update a category by ID
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, categoryImage, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, categoryImage, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      res.status(404).send("Category not found.");
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Error updating category.");
  }
};

// Delete a category by ID
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Category not found.");
      return;
    }

    res.status(200).send("Category deleted.");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Error deleting category.");
  }
};
