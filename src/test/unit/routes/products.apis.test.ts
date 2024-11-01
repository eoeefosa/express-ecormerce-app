import request from "supertest";
import Product, { IProduct } from "../../../models/product.model";
import Category, { ICategory } from "../../../models/categories.model";
import app from "../../..";

describe("Product Routes", () => {
  let product: IProduct;

  beforeEach(async () => {
    let category: ICategory | null = await Category.findOne({
      name: "Electronics",
    }); // Or create if it doesn't exist
    // ... create product ...
    product = await Product.create({
      name: "Test Product",
      description: "Test product description",
      price: 100,
      category: category!._id,
      imageUrl: "https://example.com/image.jpg",
    });

    console.log(product);
  });

  afterEach(async () => {
    // Delete the specific product created in beforeEach
    // await ProductCurrent.deleteProduct(product._id);
    // Ensure you are deleting the correct product
    if (product && product._id) {
      await Product.findByIdAndDelete(product._id);
    }
  });

  it("should create a new product", async () => {
    const res = await request(app).post("/product").send({
      name: "New Test Product",
      description: "New test product description",
      price: 200,
      category: "Electronics",
      imageUrl: "https://example.com/newimage.jpg",
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("New Test Product");
  });

  it("should get all products", async () => {
    const res = await request(app).get("/product");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a product by ID", async () => {
    const res = await request(app).get(`/product/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test Product");
  });

  it("should update a product", async () => {
    const res = await request(app).put(`/product/${product._id}`).send({
      name: "Updated Test Product",
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Test Product");
  });

  it("should delete a product", async () => {
    const res = await request(app).delete(`/product/${product._id}`);

    expect(res.status).toBe(200);
  });
});
