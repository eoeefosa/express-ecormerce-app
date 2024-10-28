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
exports.deleteRating = exports.updateRating = exports.getRatingById = exports.getRatings = exports.createRating = void 0;
const ratings_model_1 = __importDefault(require("../models/ratings.model"));
// Create a new rating
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, productId, rating, comment } = req.body;
        if (!customerId || !productId || rating === undefined) {
            res.status(400).send("Required fields are missing.");
            return;
        }
        const newRating = new ratings_model_1.default({ customerId, productId, rating, comment });
        yield newRating.save();
        res.status(201).json(newRating);
    }
    catch (error) {
        console.error("Error creating rating:", error);
        res.status(500).send("Error creating rating.");
    }
});
exports.createRating = createRating;
// Get all ratings
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield ratings_model_1.default.find()
            .populate("customerId")
            .populate("productId");
        res.status(200).json(ratings);
    }
    catch (error) {
        console.error("Error retrieving ratings:", error);
        res.status(500).send("Error retrieving ratings.");
    }
});
exports.getRatings = getRatings;
// Get a rating by ID
const getRatingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rating = yield ratings_model_1.default.findById(id)
            .populate("customerId")
            .populate("productId");
        if (!rating) {
            res.status(404).send("Rating not found.");
            return;
        }
        res.status(200).json(rating);
    }
    catch (error) {
        console.error("Error retrieving rating:", error);
        res.status(500).send("Error retrieving rating.");
    }
});
exports.getRatingById = getRatingById;
// Update a rating by ID
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const updatedRating = yield ratings_model_1.default.findByIdAndUpdate(id, { rating, comment, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!updatedRating) {
            res.status(404).send("Rating not found.");
            return;
        }
        res.status(200).json(updatedRating);
    }
    catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).send("Error updating rating.");
    }
});
exports.updateRating = updateRating;
// Delete a rating by ID
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield ratings_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Rating not found.");
            return;
        }
        res.status(200).send("Rating deleted.");
    }
    catch (error) {
        console.error("Error deleting rating:", error);
        res.status(500).send("Error deleting rating.");
    }
});
exports.deleteRating = deleteRating;
