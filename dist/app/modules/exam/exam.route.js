"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutes = void 0;
const express_1 = require("express");
const exam_controller_1 = require("./exam.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const exam_validation_1 = require("./exam.validation");
const router = (0, express_1.Router)();
// create exam
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(exam_validation_1.ExamValidation.createExamZodSchema), exam_controller_1.ExamController.createExam);
// get all exams
router.get("/", exam_controller_1.ExamController.getAllExams);
// get single exam
router.get("/:id", exam_controller_1.ExamController.getSingleExam);
// update single exam
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(exam_validation_1.ExamValidation.updateExamZodSchema), exam_controller_1.ExamController.updateExam);
// delete single exam
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_controller_1.ExamController.deleteExam);
exports.ExamRoutes = router;
