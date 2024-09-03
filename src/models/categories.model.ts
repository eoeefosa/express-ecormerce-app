import { Schema, model } from "mongoose";

const categoryschema = new Schema({
  name: { type: String, required: true },
  category_image: { type: String },
  description: { type: String },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

const Category = model("Categories", categoryschema);

export default Category;
