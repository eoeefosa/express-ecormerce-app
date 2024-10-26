// src/models/product.model.ts
import { Schema, model, Document } from "mongoose";

// Define an interface for the product variation
interface IProductVariation {
  sku: string;
  color: string;
  size: string;
  price: number;
  stock?: number;
  images?: string[];
}

// Define an interface for the Product document
export interface IProduct extends Document {
  name?: string;
  description?: string;
  price?: number;
  inventory?: number;
  category?: Schema.Types.ObjectId;
  variations?: IProductVariation[];
  createdAt: Date;
  updatedAt: Date;
  location?: string;
  sold?: boolean;
  ratings?: Schema.Types.ObjectId[];
}

// Define the schema for product variations
const productVariationSchema = new Schema<IProductVariation>({
  // sku: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
});

// Define the schema for products
const productSchema = new Schema<IProduct>({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  inventory: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  variations: [productVariationSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  location: { type: String },
  sold: { type: Boolean },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
});

// Create and export the Product model
const Product = model<IProduct>("Product", productSchema);

export default Product;
