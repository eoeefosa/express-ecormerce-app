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
exports.viewCart = exports.removeItemFromCart = exports.addItemToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// Add an item to the cart
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, product, quantity, totalPrice } = req.body;
        if (!user || !product || !quantity) {
            res.status(400).send("User, product ID, and quantity are required.");
            return;
        }
        // Check if the item already exists in the cart
        const existingItem = yield cart_model_1.default.findOne({ user, product });
        if (existingItem) {
            // Update quantity if item already exists
            existingItem.quantity += quantity;
            existingItem.totalPrice = totalPrice || existingItem.totalPrice;
            yield existingItem.save();
            res.status(200).json(existingItem);
        }
        else {
            // Create a new cart item
            const newCartItem = new cart_model_1.default({ user, product, quantity, totalPrice });
            yield newCartItem.save();
            res.status(201).json(newCartItem);
        }
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send("Error adding item to cart.");
    }
});
exports.addItemToCart = addItemToCart;
// Remove an item from the cart
const removeItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("Cart item ID is required.");
            return;
        }
        const result = yield cart_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Cart item not found.");
            return;
        }
        res.status(200).send("Item removed from cart.");
    }
    catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Error removing item from cart.");
    }
});
exports.removeItemFromCart = removeItemFromCart;
// View the cart for a specific user
const viewCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId) {
            res.status(400).send("User ID is required.");
            return;
        }
        const items = yield cart_model_1.default.find({ user: userId }).populate("product");
        res.status(200).json(items);
    }
    catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).send("Error retrieving cart.");
    }
});
exports.viewCart = viewCart;
