import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { ExamSubmissionController } from "./exam-submission.controller";
import authUserOrRole from "../../middlewares/authUserOrRole";
import { ExamSubmissionValidation } from "./exam-submission.validation";

const router = Router();

// create Exam Submission
router.post(
  "/",
  authUserOrRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(ExamSubmissionValidation.createExamSubmissionZodSchema),
  ExamSubmissionController.createExamSubmission
);

// get all Exam Submission
router.get(
  "/",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamSubmissionController.getAllExamSubmissions
);

// get single Exam Submission
router.get(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamSubmissionController.getSingleExamSubmission
);

// update single Exam Submission
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamSubmissionValidation.updateExamSubmissionZodSchema),
  ExamSubmissionController.updateExamSubmission
);

// delete single Exam Submission
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamSubmissionController.deleteExamSubmission
);

export const ExamSubmissionRoutes = router;
