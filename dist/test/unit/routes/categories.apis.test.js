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
const __1 = __importDefault(require("../../.."));
const categories_model_1 = __importDefault(require("../../../models/categories.model"));
describe("Category Routes", () => {
    let category;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        category = yield categories_model_1.default.create({ name: "Food and drinks" });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield categories_model_1.default.findByIdAndDelete(category._id);
    }));
    it("should create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default)
            .post("/category")
            .send({ name: "New Category" });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("New Category");
    }));
    it("should get all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get("/category");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    }));
    it("should get a category by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get(`/category/${category._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Electronics");
    }));
    it("should update a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default)
            .put(`/category/${category._id}`)
            .send({ name: "Updated Category" });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated Category");
    }));
});
