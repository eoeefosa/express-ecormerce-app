"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/subscriptionRoutes.ts
const express_1 = require("express");
const subscription_controller_1 = require("../../controllers/subscription.controller");
const router = (0, express_1.Router)();
router.post("/subscriptions", subscription_controller_1.createSubscription);
router.get("/subscriptions", subscription_controller_1.getSubscriptions);
router.get("/subscriptions/:id", subscription_controller_1.getSubscriptionById);
router.put("/subscriptions/:id", subscription_controller_1.updateSubscription);
router.delete("/subscriptions/:id", subscription_controller_1.deleteSubscription);
exports.default = router;
