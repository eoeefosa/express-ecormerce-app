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
exports.removeProductFromStore = exports.addProductsToStore = exports.deleteStore = exports.updateStore = exports.getStoreById = exports.getStores = exports.createStore = void 0;
const store_model_1 = __importDefault(require("../models/store.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
// Create a new store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, owner, location, storeImage, contact, products, openingHours, ratings, description, isActive, } = req.body;
        if (!name || !owner || !location || !contact || !location.coordinates) {
            res.status(400).send("Required fields are missing.");
            return;
        }
        const newStore = new store_model_1.default({
            name,
            owner,
            location,
            storeImage,
            contact,
            products,
            openingHours,
            ratings,
            description,
            isActive,
        });
        yield newStore.save();
        res.status(201).json(newStore);
    }
    catch (error) {
        console.error("Error creating store:", error);
        res.status(500).send("Error creating store.");
    }
});
exports.createStore = createStore;
// Get all stores
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield store_model_1.default.find().populate("owner").populate("products");
        res.status(200).json(stores);
    }
    catch (error) {
        console.error("Error retrieving stores:", error);
        res.status(500).send("Error retrieving stores.");
    }
});
exports.getStores = getStores;
// Get a store by ID
const getStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const store = yield store_model_1.default.findById(id)
            .populate("owner")
            .populate("products");
        if (!store) {
            res.status(404).send("Store not found.");
            return;
        }
        res.status(200).json(store);
    }
    catch (error) {
        console.error("Error retrieving store:", error);
        res.status(500).send("Error retrieving store.");
    }
});
exports.getStoreById = getStoreById;
// Update a store by ID
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, owner, location, storeImage, contact, products, openingHours, ratings, description, isActive, } = req.body;
        const updatedStore = yield store_model_1.default.findByIdAndUpdate(id, {
            name,
            owner,
            location,
            storeImage,
            contact,
            products,
            openingHours,
            ratings,
            description,
            isActive,
            updatedAt: new Date(),
        }, { new: true, runValidators: true });
        if (!updatedStore) {
            res.status(404).send("Store not found.");
            return;
        }
        res.status(200).json(updatedStore);
    }
    catch (error) {
        console.error("Error updating store:", error);
        res.status(500).send("Error updating store.");
    }
});
exports.updateStore = updateStore;
// Delete a store by ID
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield store_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Store not found.");
            return;
        }
        res.status(200).send("Store deleted.");
    }
    catch (error) {
        console.error("Error deleting store:", error);
        res.status(500).send("Error deleting store.");
    }
});
exports.deleteStore = deleteStore;
// Add products to a store
const addProductsToStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeId, productIds } = req.body;
        if (!storeId || !productIds || !Array.isArray(productIds)) {
            res.status(400).send("Store ID and product IDs are required.");
            return;
        }
        const store = yield store_model_1.default.findById(storeId);
        if (!store) {
            res.status(404).send("Store not found.");
            return;
        }
        // Ensure products exist before adding
        const products = yield product_model_1.default.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
            res.status(404).send("One or more products not found.");
            return;
        }
        if (store.products != null) {
            store.products.push(...productIds);
        }
        else {
            store.products = [...productIds];
        }
        yield store.save();
        res.status(200).json(store);
    }
    catch (error) {
        console.error("Error adding products to store:", error);
        res.status(500).send("Error adding products to store.");
    }
});
exports.addProductsToStore = addProductsToStore;
// Remove a product from a store
const removeProductFromStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeId, productId } = req.body;
        if (!storeId || !productId) {
            res.status(400).send("Store ID and product ID are required.");
            return;
        }
        const store = yield store_model_1.default.findById(storeId);
        if (!store) {
            res.status(404).send("Store not found.");
            return;
        }
        if (store.products != null) {
            store.products = store.products.filter((id) => id.toString() !== productId);
        }
        else {
            res.status(404).send("Store is empty");
            return;
        }
        yield store.save();
        res.status(200).json(store);
    }
    catch (error) {
        console.error("Error removing product from store:", error);
        res.status(500).send("Error removing product from store.");
    }
});
exports.removeProductFromStore = removeProductFromStore;
