import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import authUserOrRole from "../../middlewares/authUserOrRole";
import authUser from "../../middlewares/authUser";

const router = Router();

// register user
router.post(
  "/",
  validateRequest(UserValidation.registerUserZodSchema),
  UserController.registerUser
);

// create super admin
router.post(
  "/create-super-admin",
  validateRequest(UserValidation.registerUserZodSchema),
  UserController.createSuperAdmin
);

// create admin
router.post(
  "/create-admin",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.registerUserZodSchema),
  UserController.createAdmin
);

// login user
router.post(
  "/login",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.login
);

// get single user
router.get(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

// update user
router.patch(
  "/:id",
  authUser,
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// delete user
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
