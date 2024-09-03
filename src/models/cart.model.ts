// src/models/cart.ts
import { Schema, model, Document } from "mongoose";

// Define the Cart interface
export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice?: number;
}

// Define the Cart schema
const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number },
});

// Create the Cart model
const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
