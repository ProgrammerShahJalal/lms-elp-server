import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { UserExamQuestionMarkValidation } from "./user-exam-question-mark.validation";
import { UserExamQuestionMarkController } from "./user-exam-question-mark.controller";
import authUserOrRole from "../../middlewares/authUserOrRole";

const router = Router();

// create UserExamQuestionMark
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    UserExamQuestionMarkValidation.createUserExamQuestionMarkZodSchema
  ),
  UserExamQuestionMarkController.createUserExamQuestionMark
);

// get all UserExamQuestionMarks
router.get(
  "/",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserExamQuestionMarkController.getAllUserExamQuestionMarks
);

// get single UserExamQuestionMark
router.get(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserExamQuestionMarkController.getSingleUserExamQuestionMark
);

// update single UserExamQuestionMark
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    UserExamQuestionMarkValidation.updateUserExamQuestionMarkZodSchema
  ),
  UserExamQuestionMarkController.updateUserExamQuestionMark
);

// delete single UserExamQuestionMark
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserExamQuestionMarkController.deleteUserExamQuestionMark
);

export const UserExamQuestionMarkRoutes = router;
