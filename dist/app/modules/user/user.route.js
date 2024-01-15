"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const authUserOrRole_1 = __importDefault(require("../../middlewares/authUserOrRole"));
const router = (0, express_1.Router)();
// register user
router.post("/", (0, validateRequest_1.default)(user_validation_1.UserValidation.registerUserZodSchema), user_controller_1.UserController.registerUser);
// create super admin
// router.post(
//   "/create-super-admin",
//   validateRequest(UserValidation.registerUserZodSchema),
//   UserController.createSuperAdmin
// );
// create admin
router.post("/create-admin", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */), (0, validateRequest_1.default)(user_validation_1.UserValidation.registerUserZodSchema), user_controller_1.UserController.createAdmin);
// login user
router.post("/login", (0, validateRequest_1.default)(user_validation_1.UserValidation.loginUserZodSchema), user_controller_1.UserController.login);
// get all users
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.UserController.getAllUsers);
// get single user
router.get("/:user_id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.UserController.getSingleUser);
// update user
router.patch("/:user_id", (0, authUserOrRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateUser);
// delete user
router.delete("/:user_id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
