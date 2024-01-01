"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const exam_result_validation_1 = require("./exam-result.validation");
const exam_result_controller_1 = require("./exam-result.controller");
const router = (0, express_1.Router)();
// create Exam Result
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), (0, validateRequest_1.default)(exam_result_validation_1.ExamResultValidation.createExamResultZodSchema), exam_result_controller_1.ExamResultController.createExamResult);
// get all Exam Results
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_result_controller_1.ExamResultController.getAllExamResults);
// get single Exam Result
router.get("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_result_controller_1.ExamResultController.getSingleExamResult);
// give question mark
router.patch("/give-mark", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(exam_result_validation_1.ExamResultValidation.giveQuestionMarkZodSchema), exam_result_controller_1.ExamResultController.giveQuestionMark);
// update single Exam Result
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(exam_result_validation_1.ExamResultValidation.updateExamResultZodSchema), exam_result_controller_1.ExamResultController.updateExamResult);
// delete single Exam Result
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_result_controller_1.ExamResultController.deleteExamResult);
exports.ExamResultRoutes = router;
