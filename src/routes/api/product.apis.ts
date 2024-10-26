// src/routes/productRoutes.ts
import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controllers/product.controller";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Products:
 *       type: object
 *       required:
 *          - name
 *          - description
 *          - price
 *          - inventory
 *          - category
 *       properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the product
 *          name:
 *            type: string
 *            description: The name of the product
 *          description:
 *            type: string
 *            description: The description of the product
 *          price:
 *            type: number
 *            description: The price of the product
 *          inventory:
 *            type: number
 *            description: The inventory of the product
 *          category:
 *            type: string
 *            description: The category of the product
 *          variations:
 *            type: array
 *            description: The variations of the product
 *            items:
 *              type: string
 *          location:
 *            type: object
 *            description: The location of the product
 *            properties:
 *              type:
 *                type: string
 *                description: The type of location
 *              coordinates:
 *                type: array
 *                description: The coordinates of the location
 *                items:
 *                  type: number
 *          sold:
 *            type: number
 *            description: The number of products sold
 *          ratings:
 *            type: array
 *            description: The ratings of the product
 *            items:
 *              type: string
 *       example:
 *         id: 64d7f2a6e87a44a68a12b123
 *         name: Product Name
 *         description: Product Description
 *         price: 100
 *         inventory: 10
 *         category: 64d7f2a6e87a44a68a12b122
 *         variations: ["red", "blue", "green"]
 *         location: {
 *           type: "Point",
 *           coordinates: [123.456, 78.901]
 *         }
 *         sold: 100
 *         ratings: ["64d7f2a6e87a44a68a12b121"]
 *
 *
 */

router.post("/product", createProduct);
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
