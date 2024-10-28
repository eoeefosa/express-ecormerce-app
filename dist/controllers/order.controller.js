"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, status, orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice, transactionId, } = req.body;
        if (!user ||
            !orderItems ||
            !shippingAddress ||
            itemsPrice === undefined ||
            taxPrice === undefined ||
            shippingPrice === undefined ||
            totalPrice === undefined) {
            res.status(400).send("Required fields are missing.");
            return;
        }
        const newOrder = new order_model_1.default({
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
        yield newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order.");
    }
});
exports.createOrder = createOrder;
// Get all orders
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find()
            .populate("user")
            .populate("orderItems.productId");
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Error retrieving orders.");
    }
});
exports.getOrders = getOrders;
// Get an order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_model_1.default.findById(id)
            .populate("user")
            .populate("orderItems.productId");
        if (!order) {
            res.status(404).send("Order not found.");
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error("Error retrieving order:", error);
        res.status(500).send("Error retrieving order.");
    }
});
exports.getOrderById = getOrderById;
// Update an order by ID
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, isDelivered, deliveredAt } = req.body;
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, { status, isDelivered, deliveredAt }, { new: true, runValidators: true });
        if (!updatedOrder) {
            res.status(404).send("Order not found.");
            return;
        }
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error("Error updating order:", error);
        res.status(500).send("Error updating order.");
    }
});
exports.updateOrder = updateOrder;
// Delete an order by ID
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield order_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Order not found.");
            return;
        }
        res.status(200).send("Order deleted.");
    }
    catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send("Error deleting order.");
    }
});
exports.deleteOrder = deleteOrder;
