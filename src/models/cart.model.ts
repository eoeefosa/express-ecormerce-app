import { Schema, model } from "mongoose";

const cartschema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number },
});

const Cart = model("Cart", cartschema);
