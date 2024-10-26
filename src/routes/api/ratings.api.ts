// src/routes/ratingRoutes.ts
import { Router } from "express";
import {
  createRating,
  getRatings,
  getRatingById,
  updateRating,
  deleteRating,
} from "../../controllers/ratings.controller";

const router = Router();

router.post("/ratings", createRating);
router.get("/ratings", getRatings);
router.get("/ratings/:id", getRatingById);
router.put("/ratings/:id", updateRating);
router.delete("/ratings/:id", deleteRating);

export default router;
