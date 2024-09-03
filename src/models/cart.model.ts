import { Schema, model } from "mongoose";

const cartschema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number },
});

const Cart = model("Carts", cartschema);
