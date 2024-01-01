"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsStatusRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authUserOrRole_1 = __importDefault(require("../../middlewares/authUserOrRole"));
const order_details_validation_1 = require("./order-details.validation");
const order_details_controller_1 = require("./order-details.controller");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const router = (0, express_1.Router)();
// create OrderDetails
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), (0, validateRequest_1.default)(order_details_validation_1.OrderDetailsValidation.createOrderDetailsSchema), order_details_controller_1.OrderDetailsController.createOrderDetails);
// get all OrderDetails
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), order_details_controller_1.OrderDetailsController.getAllOrderDetails);
// get all Order Details of an user
router.get("/user/:user_id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), order_details_controller_1.OrderDetailsController.getOrderDetailsOfAnUser);
// get single OrderDetails
router.get("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), order_details_controller_1.OrderDetailsController.getSingleOrderDetails);
// update single OrderDetails
router.patch("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(order_details_validation_1.OrderDetailsValidation.updateOrderDetailsZodSchema), order_details_controller_1.OrderDetailsController.updateOrderDetails);
// delete OrderDetails
router.delete("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), order_details_controller_1.OrderDetailsController.deleteOrderDetails);
exports.OrderDetailsStatusRoutes = router;
