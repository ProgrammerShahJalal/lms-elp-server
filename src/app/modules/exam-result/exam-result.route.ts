import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { ExamResultValidation } from "./exam-result.validation";
import { ExamResultController } from "./exam-result.controller";

const router = Router();

// create ExamResult
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamResultValidation.createExamResultZodSchema),
  ExamResultController.createExamResult
);

// get all ExamResults
router.get("/", ExamResultController.getAllExamResults);

// get single ExamResult
router.get("/:id", ExamResultController.getSingleExamResult);

// get exam result of an user
router.get(
  "/user/:user_id/exam/:exam_id/",
  ExamResultController.getExamResultOfAUser
);

// update single ExamResult
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamResultValidation.updateExamResultZodSchema),
  ExamResultController.updateExamResult
);

// delete single ExamResult
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamResultController.deleteExamResult
);

export const ExamResultRoutes = router;
