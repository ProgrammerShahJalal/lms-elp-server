import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { QuestionController } from "./question.controller";
import { QuestionValidation } from "./question.validation";
import authPermission from "../../middlewares/authPermission";

const router = Router();

// create question
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("exam"),
  validateRequest(QuestionValidation.createQuestionZodSchema),
  QuestionController.createQuestion
);

// get all questions with filter
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("exam"),
  QuestionController.getAllQuestions
);

// get questions of an exam
router.get(
  "/exam/:exam_id",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  QuestionController.getQuestionsOfAnExam
);

// get single question
router.get(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("exam"),
  QuestionController.getSingleQuestion
);

// update single question
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("exam"),
  validateRequest(QuestionValidation.updateQuestionZodSchema),
  QuestionController.updateQuestion
);

// delete single question
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("exam"),
  QuestionController.deleteQuestion
);

export const QuestionRoutes = router;
