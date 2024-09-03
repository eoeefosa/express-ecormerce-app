import mongoose, { Schema, model } from "mongoose";
// Define a schema for ratings
const ratingSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to a User schema
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to a Product schema
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating value between 1 and 5
  comment: { type: String }, // Optional review comment
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the rating was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp for when the rating was last updated
});

const Rating = model("Rating", ratingSchema);

export default Rating;
