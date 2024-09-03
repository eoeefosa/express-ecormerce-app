// src/models/category.model.ts
import { Schema, model, Document } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
  name: string;
  categoryImage?: string;
  description?: string;
  updatedAt: Date;
  createdAt: Date;
}

// Define the Category schema
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    categoryImage: { type: String },
    description: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Create the Category model
const Category = model<ICategory>("Category", categorySchema);

export default Category;
