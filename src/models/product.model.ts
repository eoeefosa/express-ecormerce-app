import mongoose, { Schema, model } from "mongoose";

const productVariationSchema = new Schema({
  sku: { type: String, required: true, unique: true }, // Stock Keeping Unit, unique for each variation
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }, // Inventory count for the variation
  images: [String], // Array of image
});

const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  inventory: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  variations: [productVariationSchema], // Embedding the variations schema as an array
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  location: { type: String },
  sold: { type: Boolean },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
