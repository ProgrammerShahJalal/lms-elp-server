"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHistoryRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const subscription_history_validation_1 = require("./subscription-history.validation");
const subscription_history_controller_1 = require("./subscription-history.controller");
const router = (0, express_1.Router)();
// create Subscription History
router.post("/", (0, validateRequest_1.default)(subscription_history_validation_1.SubscriptionHistoryValidation.createSubscriptionHistorySchema), subscription_history_controller_1.SubscriptionHistoryController.createSubscriptionHistory);
// get all SubscriptionHistorys
router.get("/", subscription_history_controller_1.SubscriptionHistoryController.getAllSubscriptionHistorys);
// get my subscription histories
router.get("/my-subscription-histories", (0, authRole_1.default)("student" /* ENUM_USER_ROLE.STUDENT */), subscription_history_controller_1.SubscriptionHistoryController.getMySubscriptionHistories);
// get single SubscriptionHistory
router.get("/:id", subscription_history_controller_1.SubscriptionHistoryController.getSingleSubscriptionHistory);
// update single SubscriptionHistory
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(subscription_history_validation_1.SubscriptionHistoryValidation.updateSubscriptionHistoryZodSchema), subscription_history_controller_1.SubscriptionHistoryController.updateSubscriptionHistory);
// delete SubscriptionHistory
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), subscription_history_controller_1.SubscriptionHistoryController.deleteSubscriptionHistory);
exports.SubscriptionHistoryRoutes = router;
