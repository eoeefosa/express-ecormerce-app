import { Schema, model } from "mongoose";

const categoryschema = new Schema({
  name: { type: String, required: true },
  categoryImage: { type: String },
  description: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Category = model("Category", categoryschema);

export default Category;
