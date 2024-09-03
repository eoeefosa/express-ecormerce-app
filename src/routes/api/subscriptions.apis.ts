// src/routes/subscriptionRoutes.ts
import { Router } from "express";
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "../../controllers/subscription.controller";

const router = Router();

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.get("/:id", getSubscriptionById);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
