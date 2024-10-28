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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const categories_model_1 = __importDefault(require("../models/categories.model"));
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryImage, description } = req.body;
        if (!name) {
            res.status(400).send("Category name is required.");
            return;
        }
        const newCategory = new categories_model_1.default({ name, categoryImage, description });
        yield newCategory.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send("Error creating category.");
    }
});
exports.createCategory = createCategory;
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).send("Error retrieving categories.");
    }
});
exports.getCategories = getCategories;
// Get a single category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_model_1.default.findById(id);
        if (!category) {
            res.status(404).send("Category not found.");
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error("Error retrieving category:", error);
        res.status(500).send("Error retrieving category.");
    }
});
exports.getCategoryById = getCategoryById;
// Update a category by ID
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, categoryImage, description } = req.body;
        const updatedCategory = yield categories_model_1.default.findByIdAndUpdate(id, { name, categoryImage, description }, { new: true, runValidators: true });
        if (!updatedCategory) {
            res.status(404).send("Category not found.");
            return;
        }
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).send("Error updating category.");
    }
});
exports.updateCategory = updateCategory;
// Delete a category by ID
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield categories_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Category not found.");
            return;
        }
        res.status(200).send("Category deleted.");
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("Error deleting category.");
    }
});
exports.deleteCategory = deleteCategory;
