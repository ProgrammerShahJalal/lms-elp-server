"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const course_validation_1 = require("./course.validation");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
const router = (0, express_1.Router)();
// create Course
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    req.body = course_validation_1.CourseValidation.createCourseSchema.parse(JSON.parse(req.body.data));
    return course_controller_1.CourseController.createCourse(req, res, next);
});
// get all courses
router.get("/", course_controller_1.CourseController.getAllCourses);
// get single Course
router.get("/:id", course_controller_1.CourseController.getSingleCourse);
// update single Course
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = course_validation_1.CourseValidation.updateCourseZodSchema.parse(JSON.parse(req.body.data));
        }
        else {
            req.body = course_validation_1.CourseValidation.updateCourseZodSchema.parse({});
        }
    }
    catch (error) {
        return next(error);
    }
    return course_controller_1.CourseController.updateCourse(req, res, next);
});
// delete Course
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), course_controller_1.CourseController.deleteCourse);
exports.CourseRoutes = router;
