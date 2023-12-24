"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_status_validation_1 = require("./order-status.validation");
const authUserOrRole_1 = __importDefault(require("../../middlewares/authUserOrRole"));
const order_controller_1 = require("../order/order.controller");
const router = (0, express_1.Router)();
// create Order
router.post("/", (0, validateRequest_1.default)(order_status_validation_1.OrderValidation.createOrderSchema), order_controller_1.OrderController.createOrder);
// get all Orders
router.get("/", order_controller_1.OrderController.getAllOrders);
// get single Order
router.get("/:id", order_controller_1.OrderController.getSingleOrder);
// update single Order
router.patch("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(order_status_validation_1.OrderValidation.updateOrderZodSchema), order_controller_1.OrderController.updateOrder);
// delete Order
router.delete("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), order_controller_1.OrderController.deleteOrder);
exports.OrderStatusRoutes = router;
