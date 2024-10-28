"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const router = (0, express_1.Router)();
// Public Routes
router.post("/user/register", user_controller_1.registerUser);
router.post("/user/login", user_controller_1.loginUser);
// Protected Routes
router.get("/all", user_controller_1.protect, user_controller_1.admin, user_controller_1.getAllUsers);
exports.default = router;
