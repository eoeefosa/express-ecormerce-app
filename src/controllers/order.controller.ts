// src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/order.model";

// Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      user,
      status,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      transactionId,
    } = req.body;

    if (
      !user ||
      !orderItems ||
      !shippingAddress ||
      itemsPrice === undefined ||
      taxPrice === undefined ||
      shippingPrice === undefined ||
      totalPrice === undefined
    ) {
      res.status(400).send("Required fields are missing.");
      return;
    }

    const newOrder = new Order({
      user,
      status,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      transactionId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order.");
  }
};

// Get all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).send("Error retrieving orders.");
  }
};

// Get an order by ID
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user")
      .populate("orderItems.productId");
    if (!order) {
      res.status(404).send("Order not found.");
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).send("Error retrieving order.");
  }
};

// Update an order by ID
export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, isDelivered, deliveredAt } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, isDelivered, deliveredAt },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      res.status(404).send("Order not found.");
      return;
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Error updating order.");
  }
};

// Delete an order by ID
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Order.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Order not found.");
      return;
    }

    res.status(200).send("Order deleted.");
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Error deleting order.");
  }
};
