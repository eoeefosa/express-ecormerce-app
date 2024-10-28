"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categoryRoutes.ts
const express_1 = require("express");
const categories_controller_1 = require("../../controllers/categories.controller");
const router = (0, express_1.Router)();
router.post("/cartegory", categories_controller_1.createCategory);
router.get("/cartegory", categories_controller_1.getCategories);
router.get("/cartegory/:id", categories_controller_1.getCategoryById);
router.put("/cartegory/:id", categories_controller_1.updateCategory);
router.delete("/cartegory/:id", categories_controller_1.deleteCategory);
exports.default = router;
