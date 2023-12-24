"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRoutes = void 0;
const express_1 = require("express");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const sub_category_validation_1 = require("./sub-category.validation");
const sub_category_controller_1 = require("./sub-category.controller");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
const router = (0, express_1.Router)();
// create SubCategory
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    req.body = sub_category_validation_1.SubCategoryValidation.createSubCategorySchema.parse(JSON.parse(req.body.data));
    return sub_category_controller_1.SubCategoryController.createSubCategory(req, res, next);
});
// get all sub-categories
router.get("/", sub_category_controller_1.SubCategoryController.getAllSubCategories);
// get single SubCategory
router.get("/:id", sub_category_controller_1.SubCategoryController.getSingleSubCategory);
// update single SubCategory
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = sub_category_validation_1.SubCategoryValidation.updateSubCategoryZodSchema.parse(JSON.parse(req.body.data));
        }
        else {
            req.body = sub_category_validation_1.SubCategoryValidation.updateSubCategoryZodSchema.parse({});
        }
    }
    catch (error) {
        return next(error);
    }
    return sub_category_controller_1.SubCategoryController.updateSubCategory(req, res, next);
});
// delete SubCategory
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), sub_category_controller_1.SubCategoryController.deleteSubCategory);
exports.SubCategoryRoutes = router;
