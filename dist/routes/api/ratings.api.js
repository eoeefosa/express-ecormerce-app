"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/ratingRoutes.ts
const express_1 = require("express");
const ratings_controller_1 = require("../../controllers/ratings.controller");
const router = (0, express_1.Router)();
router.post("/ratings", ratings_controller_1.createRating);
router.get("/ratings", ratings_controller_1.getRatings);
router.get("/ratings/:id", ratings_controller_1.getRatingById);
router.put("/ratings/:id", ratings_controller_1.updateRating);
router.delete("/ratings/:id", ratings_controller_1.deleteRating);
exports.default = router;
