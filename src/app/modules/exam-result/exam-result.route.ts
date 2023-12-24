import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { ExamResultValidation } from "./exam-result.validation";
import { ExamResultController } from "./exam-result.controller";

const router = Router();

// create Exam Result
router.post(
  "/",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(ExamResultValidation.createExamResultZodSchema),
  ExamResultController.createExamResult
);

// get all Exam Results
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamResultController.getAllExamResults
);

// get single Exam Result
router.get(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamResultController.getSingleExamResult
);

// give question mark
router.patch(
  "/give-mark",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamResultValidation.giveQuestionMarkZodSchema),
  ExamResultController.giveQuestionMark
);

// update single Exam Result
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamResultValidation.updateExamResultZodSchema),
  ExamResultController.updateExamResult
);

// delete single Exam Result
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamResultController.deleteExamResult
);

export const ExamResultRoutes = router;
