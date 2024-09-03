// src/models/rating.model.ts
import { Schema, model, Document } from "mongoose";

// Define an interface for the Rating document
export interface IRating extends Document {
  customerId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for ratings
const ratingSchema = new Schema<IRating>({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the Rating model
const Rating = model<IRating>("Rating", ratingSchema);

export default Rating;
