import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { NoticeValidation } from "./notice.validation";
import { NoticeController } from "./notice.controller";

const router = Router();

// create Notice
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(NoticeValidation.createNoticeSchema),
  NoticeController.createNotice
);

// get all Notices
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NoticeController.getAllNotice
);

// get single Notice
router.get(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NoticeController.getSingleNotice
);

// update single Notice
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(NoticeValidation.updateNoticeZodSchema),
  NoticeController.updateNotice
);

// delete Notice
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NoticeController.deleteNotice
);

export const NoticeRoutes = router;
