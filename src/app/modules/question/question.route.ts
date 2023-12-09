import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { QuestionController } from "./question.controller";
import { QuestionValidation } from "./question.validation";

const router = Router();

// create question
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuestionValidation.createQuestionZodSchema),
  QuestionController.createQuestion
);

// get all questions
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.getAllQuestions
);

// get single question
router.get("/:id", QuestionController.getSingleQuestion);

// update single question
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(QuestionValidation.updateQuestionZodSchema),
  QuestionController.updateQuestion
);

// delete single question
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.deleteQuestion
);

export const QuestionRoutes = router;
