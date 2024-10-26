import app from "../../../index";
import request from "supertest";
import Category, { ICategory } from "../../../src/models/categories.model";


describe("Category Routes", () => {
    let category: ICategory;

    beforeEach(async () => {
        category = await Category.create({ name: "Electronics" });
    });

    afterEach(async () => {
        await Category.findByIdAndDelete(category._id);
    });

    it("should create a new category", async () => {
        const res = await request(app).post("/category").send({ name: "New Category" });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe("New Category");
    });

    it("should get all categories", async () => {
        const res = await request(app).get("/category");

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it("should get a category by ID", async () => {
        const res = await request(app).get(`/category/${category._id}`);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Electronics");
    });

    it("should update a category", async () => {
        const res = await request(app).put(`/category/${category._id}`).send({ name: "Updated Category" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated Category");
    });
})