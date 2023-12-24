"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRoutes = void 0;
const express_1 = require("express");
const subscription_controller_1 = require("./subscription.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const subscription_validation_1 = require("./subscription.validation");
const router = (0, express_1.Router)();
// create Subscription
router.post("/", (0, validateRequest_1.default)(subscription_validation_1.SubscriptionValidation.createSubscriptionSchema), subscription_controller_1.SubscriptionController.createSubscription);
// get all Subscriptions
router.get("/", subscription_controller_1.SubscriptionController.getAllSubscriptions);
// get single Subscription
router.get("/:id", subscription_controller_1.SubscriptionController.getSingleSubscription);
// update single Subscription
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(subscription_validation_1.SubscriptionValidation.updateSubscriptionZodSchema), subscription_controller_1.SubscriptionController.updateSubscription);
// delete Subscription
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), subscription_controller_1.SubscriptionController.deleteSubscription);
exports.SubscriptionRoutes = router;
