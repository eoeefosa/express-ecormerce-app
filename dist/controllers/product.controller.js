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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, inventory, category, variations, location, sold, ratings, } = req.body;
        const newProduct = new product_model_1.default({
            name,
            description,
            price,
            inventory,
            category,
            variations,
            location,
            sold,
            ratings,
        });
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Error creating product.");
    }
});
exports.createProduct = createProduct;
// Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find()
            .populate("category")
            .populate("ratings");
        res.status(201).json(products);
    }
    catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).send("Error retrieving products.");
    }
});
exports.getProducts = getProducts;
// Get a product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.default.findById(id)
            .populate("category")
            .populate("ratings");
        if (!product) {
            res.status(404).send("Product not found.");
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send("Error retrieving product.");
    }
});
exports.getProductById = getProductById;
// Update a product by ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, inventory, category, variations, location, sold, ratings, } = req.body;
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, {
            name,
            description,
            price,
            inventory,
            category,
            variations,
            location,
            sold,
            ratings,
        }, { new: true, runValidators: true });
        if (!updatedProduct) {
            res.status(404).send("Product not found.");
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product.");
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Product not found.");
            return;
        }
        res.status(200).send("Product deleted.");
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product.");
    }
});
exports.deleteProduct = deleteProduct;
// export default {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } as ProductCurrent;
// interface ProductCurrent {
//   createProduct: (req: Request, res: Response) => Promise<void>;
//   getProducts: (req: Request, res: Response) => Promise<void>;
//   getProductById: (req: Request, res: Response) => Promise<void>;
//   updateProduct: (req: Request, res: Response) => Promise<void>;
//   deleteProduct: (req: Request, res: Response) => Promise<void>;
// }
