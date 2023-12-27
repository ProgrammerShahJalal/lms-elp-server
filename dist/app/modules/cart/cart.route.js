"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const authUserOrRole_1 = __importDefault(require("../../middlewares/authUserOrRole"));
const router = (0, express_1.Router)();
// create Cart
router.post("/", (0, validateRequest_1.default)(cart_validation_1.CartValidation.createCartZodSchema), cart_controller_1.CartController.addCart);
// get all Carts
router.get("/", cart_controller_1.CartController.getAllCarts);
// get single Cart
router.get("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), cart_controller_1.CartController.getSingleCart);
// update single Cart
router.patch("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(cart_validation_1.CartValidation.updateCartZodSchema), cart_controller_1.CartController.updateCart);
// delete single Cart
router.delete("/:id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), cart_controller_1.CartController.deleteCart);
exports.CartRoutes = router;
