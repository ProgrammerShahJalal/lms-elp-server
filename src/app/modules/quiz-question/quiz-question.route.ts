import { Router } from "express";
import { QuizQuestionController } from "./quiz-question.controller";
import validateRequest from "../../middlewares/validateRequest";
import { QuizQuestionValidation } from "./quiz-question.validation";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

// create quiz question
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizQuestionValidation.createQuizQuestionZodSchema),
  QuizQuestionController.createQuizQuestion
);

// get all quiz questions
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizQuestionController.getAllQuizQuestions
);

// get single quiz question
router.get("/:id", QuizQuestionController.getSingleQuizQuestion);

// update single quiz question
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizQuestionValidation.updateQuizQuestionZodSchema),
  QuizQuestionController.updateQuizQuestion
);

// delete single quiz question
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizQuestionController.deleteQuizQuestion
);

export const QuizQuestionRoutes = router;
