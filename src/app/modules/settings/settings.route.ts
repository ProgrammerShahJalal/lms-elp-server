import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { SettingsValidation } from "./settings.validation";
import { SettingsController } from "./settings.controller";

const router = Router();

// create Settings
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SettingsValidation.addSettingsZodSchema),
  SettingsController.addSettings
);

// get all Settings
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SettingsController.getAllSettings
);

// get single Settings
router.get(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SettingsController.getSingleSettings
);

// update single Settings
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SettingsValidation.updateSettingsZodSchema),
  SettingsController.updateSettings
);

// delete single Settings
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SettingsController.deleteSettings
);

export const SettingsRoutes = router;
