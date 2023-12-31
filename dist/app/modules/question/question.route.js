"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const question_controller_1 = require("./question.controller");
const question_validation_1 = require("./question.validation");
const router = (0, express_1.Router)();
// create question
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(question_validation_1.QuestionValidation.createQuestionZodSchema), question_controller_1.QuestionController.createQuestion);
// get all questions with filter
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), question_controller_1.QuestionController.getAllQuestions);
// get questions of an exam
router.get("/exam/:exam_id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), question_controller_1.QuestionController.getQuestionsOfAnExam);
// get single question
router.get("/:id", question_controller_1.QuestionController.getSingleQuestion);
// update single question
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(question_validation_1.QuestionValidation.updateQuestionZodSchema), question_controller_1.QuestionController.updateQuestion);
// delete single question
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), question_controller_1.QuestionController.deleteQuestion);
exports.QuestionRoutes = router;
