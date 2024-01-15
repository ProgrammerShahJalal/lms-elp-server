"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamPaymentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const exam_payment_validation_1 = require("./exam-payment.validation");
const exam_payment_controller_1 = require("./exam-payment.controller");
const router = (0, express_1.Router)();
// create Exam Payment
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), (0, validateRequest_1.default)(exam_payment_validation_1.ExamPaymentValidation.createExamPaymentZodSchema), exam_payment_controller_1.ExamPaymentController.createExamPayment);
// get all Exam Payments
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_payment_controller_1.ExamPaymentController.getAllExamPayments);
// get my exam payments
router.get("/my-exam-payments", (0, authRole_1.default)("student" /* ENUM_USER_ROLE.STUDENT */), exam_payment_controller_1.ExamPaymentController.getMyExamPayments);
// get single Exam Payment
router.get("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_payment_controller_1.ExamPaymentController.getSingleExamPayment);
// update single Exam Payment
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(exam_payment_validation_1.ExamPaymentValidation.updateExamPaymentZodSchema), exam_payment_controller_1.ExamPaymentController.updateExamPayment);
// delete single Exam Payment
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), exam_payment_controller_1.ExamPaymentController.deleteExamPayment);
exports.ExamPaymentRoutes = router;
