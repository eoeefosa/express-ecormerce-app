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
const supertest_1 = __importDefault(require("supertest"));
const product_model_1 = __importDefault(require("../../../models/product.model"));
const categories_model_1 = __importDefault(require("../../../models/categories.model"));
const __1 = __importDefault(require("../../.."));
describe("Product Routes", () => {
    let product;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        let category = yield categories_model_1.default.findOne({
            name: "Electronics",
        }); // Or create if it doesn't exist
        // ... create product ...
        product = yield product_model_1.default.create({
            name: "Test Product",
            description: "Test product description",
            price: 100,
            category: category._id,
            imageUrl: "https://example.com/image.jpg",
        });
        console.log(product);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Delete the specific product created in beforeEach
        // await ProductCurrent.deleteProduct(product._id);
        // Ensure you are deleting the correct product
        if (product && product._id) {
            yield product_model_1.default.findByIdAndDelete(product._id);
        }
    }));
    it("should create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post("/product").send({
            name: "New Test Product",
            description: "New test product description",
            price: 200,
            category: "Electronics",
            imageUrl: "https://example.com/newimage.jpg",
        });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("New Test Product");
    }));
    it("should get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get("/product");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    }));
    it("should get a product by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get(`/product/${product._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Test Product");
    }));
    it("should update a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).put(`/product/${product._id}`).send({
            name: "Updated Test Product",
        });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated Test Product");
    }));
    it("should delete a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).delete(`/product/${product._id}`);
        expect(res.status).toBe(200);
    }));
});
