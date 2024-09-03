import { Schema, model } from "mongoose";

// Define a schema for the individual items in an order
const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the Product schema
  variationId: {
    type: Schema.Types.ObjectId,
    ref: "Product.variations",
    required: true,
  }, // Reference to a specific product variation
  name: { type: String, required: true }, // Name of the product
  quantity: { type: Number, required: true, min: 1 }, // Quantity of the product ordered
  price: { type: Number, required: true }, // Price of a single unit at the time of order
  total: { type: Number, required: true }, // Total price for this line item (price * quantity)
  tax: { type: Number, default: 0 },
});

const orderschema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  itemsPrice: { type: Number, required: true }, // Sum of all the order items' prices
  taxPrice: { type: Number, required: true }, // Tax amount
  shippingPrice: { type: Number, required: true }, // Shipping cost
  totalPrice: { type: Number, required: true }, // Total price (items + tax + shipping)
  transactionId: { type: Schema.Types.ObjectId, ref: "Transaction" }, // Reference to the Transaction schema
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
