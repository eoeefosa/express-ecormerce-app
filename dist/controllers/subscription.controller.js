"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.updateSubscription = exports.getSubscriptionById = exports.getSubscriptions = exports.createSubscription = void 0;
const subscription_model_1 = __importDefault(require("../models/subscription.model"));
const subplans_model_1 = __importDefault(require("../models/subplans.model")); // Assuming you have a Plan model
const user_model_1 = __importDefault(require("../models/user.model")); // Assuming you have a User model
// Create a new subscription
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, plan, endDate, autoRenew } = req.body;
        if (!user || !plan || !endDate) {
            res.status(400).send("Required fields are missing.");
            return;
        }
        // Verify the existence of the user and plan
        const existingUser = yield user_model_1.default.findById(user);
        const existingPlan = yield subplans_model_1.default.findById(plan);
        if (!existingUser || !existingPlan) {
            res.status(404).send("User or Plan not found.");
            return;
        }
        const newSubscription = new subscription_model_1.default({
            user,
            plan,
            endDate,
            autoRenew,
        });
        yield newSubscription.save();
        res.status(201).json(newSubscription);
    }
    catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).send("Error creating subscription.");
    }
});
exports.createSubscription = createSubscription;
// Get all subscriptions
const getSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield subscription_model_1.default.find()
            .populate("user")
            .populate("plan");
        res.status(200).json(subscriptions);
    }
    catch (error) {
        console.error("Error retrieving subscriptions:", error);
        res.status(500).send("Error retrieving subscriptions.");
    }
});
exports.getSubscriptions = getSubscriptions;
// Get a subscription by ID
const getSubscriptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subscription = yield subscription_model_1.default.findById(id)
            .populate("user")
            .populate("plan");
        if (!subscription) {
            res.status(404).send("Subscription not found.");
            return;
        }
        res.status(200).json(subscription);
    }
    catch (error) {
        console.error("Error retrieving subscription:", error);
        res.status(500).send("Error retrieving subscription.");
    }
});
exports.getSubscriptionById = getSubscriptionById;
// Update a subscription by ID
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user, plan, endDate, status, autoRenew, lastPaymentDate, nextBillingDate, transactions, } = req.body;
        const updatedSubscription = yield subscription_model_1.default.findByIdAndUpdate(id, {
            user,
            plan,
            endDate,
            status,
            autoRenew,
            lastPaymentDate,
            nextBillingDate,
            transactions,
            updatedAt: new Date(),
        }, { new: true, runValidators: true });
        if (!updatedSubscription) {
            res.status(404).send("Subscription not found.");
            return;
        }
        res.status(200).json(updatedSubscription);
    }
    catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).send("Error updating subscription.");
    }
});
exports.updateSubscription = updateSubscription;
// Delete a subscription by ID
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield subscription_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("Subscription not found.");
            return;
        }
        res.status(200).send("Subscription deleted.");
    }
    catch (error) {
        console.error("Error deleting subscription:", error);
        res.status(500).send("Error deleting subscription.");
    }
});
exports.deleteSubscription = deleteSubscription;
