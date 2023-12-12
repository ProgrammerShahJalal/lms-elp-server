import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { QuizQuestionValidation } from "./quiz-question.validation";
import { QuizQuestionController } from "./quiz-question.controller";

const router = Router();

// create Quiz Question
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizQuestionValidation.createQuizQuestionZodSchema),
  QuizQuestionController.createQuizQuestion
);

// get all Quiz Questions
router.get("/", QuizQuestionController.getAllQuizQuestions);

// get single Quiz Question
router.get("/:id", QuizQuestionController.getSingleQuizQuestion);

// update single Quiz Question
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuizQuestionValidation.updateQuizQuestionZodSchema),
  QuizQuestionController.updateQuizQuestion
);

// delete single Quiz Question
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuizQuestionController.deleteQuizQuestion
);

export const QuizQuestionRoutes = router;
