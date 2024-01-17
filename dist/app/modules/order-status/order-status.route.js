"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_status_validation_1 = require("./order-status.validation");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const order_status_controller_1 = require("./order-status.controller");
const router = (0, express_1.Router)();
// create Order status
router.post("/", (0, validateRequest_1.default)(order_status_validation_1.OrderStatusValidation.createOrderStatusZodSchema), order_status_controller_1.OrderStatusController.createOrderStatus);
// get all Order statuses
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), order_status_controller_1.OrderStatusController.getAllOrderStatuss);
// get single Order status
router.get("/:id", order_status_controller_1.OrderStatusController.getSingleOrderStatus);
// update single Order status
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(order_status_validation_1.OrderStatusValidation.updateOrderStatusZodSchema), order_status_controller_1.OrderStatusController.updateOrderStatus);
// delete Order status
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), order_status_controller_1.OrderStatusController.deleteOrderStatus);
exports.OrderStatusRoutes = router;
