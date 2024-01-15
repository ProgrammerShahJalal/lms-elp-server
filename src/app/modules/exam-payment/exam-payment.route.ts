import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { ExamPaymentValidation } from "./exam-payment.validation";
import { ExamPaymentController } from "./exam-payment.controller";

const router = Router();

// create Exam Payment
router.post(
  "/",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(ExamPaymentValidation.createExamPaymentZodSchema),
  ExamPaymentController.createExamPayment
);

// get all Exam Payments
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamPaymentController.getAllExamPayments
);

// get my exam payments
router.get(
  "/my-exam-payments",
  authRole(ENUM_USER_ROLE.STUDENT),
  ExamPaymentController.getMyExamPayments
);

// get single Exam Payment
router.get(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamPaymentController.getSingleExamPayment
);

// update single Exam Payment
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamPaymentValidation.updateExamPaymentZodSchema),
  ExamPaymentController.updateExamPayment
);

// delete single Exam Payment
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamPaymentController.deleteExamPayment
);

export const ExamPaymentRoutes = router;
