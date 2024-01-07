"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const settings_validation_1 = require("./settings.validation");
const settings_controller_1 = require("./settings.controller");
const router = (0, express_1.Router)();
// create Settings
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.addSettingsZodSchema), settings_controller_1.SettingsController.addSettings);
// get all Settings
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), settings_controller_1.SettingsController.getAllSettings);
// get shipping charge inside dhaka
router.get("/shipping-charge-inside-dhaka", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), settings_controller_1.SettingsController.getShippingChargeInsideDhaka);
// get shipping charge outside dhaka
router.get("/shipping-charge-outside-dhaka", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), settings_controller_1.SettingsController.getShippingChargeOutsideDhaka);
// get single Settings
router.get("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), settings_controller_1.SettingsController.getSingleSettings);
// update single Settings
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.updateSettingsZodSchema), settings_controller_1.SettingsController.updateSettings);
// delete single Settings
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), settings_controller_1.SettingsController.deleteSettings);
exports.SettingsRoutes = router;
