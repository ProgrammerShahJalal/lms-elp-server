import { Router } from "express";
import { ExamController } from "./exam.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { ExamValidation } from "./exam.validation";

const router = Router();

// create exam
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamValidation.createExamZodSchema),
  ExamController.createExam
);

// get all exams
router.get("/", ExamController.getAllExams);

// get all due exams
router.get(
  "/my-due-exams",
  authRole(ENUM_USER_ROLE.STUDENT),
  ExamController.getMyDueExams
);

// get single exam
router.get("/:id", ExamController.getSingleExam);

// update single exam
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamValidation.updateExamZodSchema),
  ExamController.updateExam
);

// delete single exam
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExamController.deleteExam
);

export const ExamRoutes = router;
