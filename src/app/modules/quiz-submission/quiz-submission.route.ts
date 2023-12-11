import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import authUserOrRole from "../../middlewares/authUserOrRole";
import { QuizSubmissionValidation } from "./quiz-submission.validation";
import { QuizSubmissionController } from "./quiz-submission.controller";

const router = Router();

// create Quiz Submission
router.post(
  "/",
  authUserOrRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(QuizSubmissionValidation.createQuizSubmissionZodSchema),
  QuizSubmissionController.createQuizSubmission
);

// get all Quiz Submission
router.get(
  "/",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizSubmissionController.getAllQuizSubmissions
);

// get single Quiz Submission
router.get(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizSubmissionController.getSingleQuizSubmission
);

// update single Exam Submission
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizSubmissionValidation.updateQuizSubmissionZodSchema),
  QuizSubmissionController.updateQuizSubmission
);

// delete single Exam Submission
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizSubmissionController.deleteQuizSubmission
);

export const QuizSubmissionRoutes = router;
