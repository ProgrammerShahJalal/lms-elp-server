"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const category_validation_1 = require("./category.validation");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
const router = (0, express_1.Router)();
// create category
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    req.body = category_validation_1.CategoryValidation.createCategorySchema.parse(JSON.parse(req.body.data));
    return category_controller_1.CategoryController.createCategory(req, res, next);
});
// get all categories
router.get("/", category_controller_1.CategoryController.getAllCategories);
// get single category
router.get("/:id", category_controller_1.CategoryController.getSingleCategory);
// update single category
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = category_validation_1.CategoryValidation.updateCategoryZodSchema.parse(JSON.parse(req.body.data));
        }
        else {
            req.body = category_validation_1.CategoryValidation.updateCategoryZodSchema.parse({});
        }
    }
    catch (error) {
        return next(error);
    }
    return category_controller_1.CategoryController.updateCategory(req, res, next);
});
// delete category
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
