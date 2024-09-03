// src/models/order.model.ts
import { Schema, model, Document } from "mongoose";

// Define an interface for the order item
interface IOrderItem {
  productId: Schema.Types.ObjectId;
  variationId: Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  total: number;
  tax?: number;
}

// Define an interface for the Order document
export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderItems: IOrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  transactionId?: Schema.Types.ObjectId;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for order items
const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  variationId: {
    type: Schema.Types.ObjectId,
    ref: "Product.variations",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  tax: { type: Number, default: 0 },
});

// Define the schema for orders
const orderSchema = new Schema<IOrder>(
  {
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
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    transactionId: { type: Schema.Types.ObjectId, ref: "Transaction" },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Create and export the Order model
const Order = model<IOrder>("Order", orderSchema);

export default Order;
