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

router.post("/subscriptions", createSubscription);
router.get("/subscriptions", getSubscriptions);
router.get("/subscriptions/:id", getSubscriptionById);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", deleteSubscription);

export default router;
