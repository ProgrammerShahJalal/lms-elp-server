import { Router } from "express";
import { CartController } from "./cart.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CartValidation } from "./cart.validation";
import authUserOrRole from "../../middlewares/authUserOrRole";
import authRole from "../../middlewares/authRole";

const router = Router();

// create Cart
router.post(
  "/",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(CartValidation.createCartZodSchema),
  CartController.addCart
);

// get all Carts
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CartController.getAllCarts
);

// get cart of an user
router.get(
  "/my-cart",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  CartController.getCartsOfAnUser
);

// get single Cart
router.get(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CartController.getSingleCart
);

// update single Cart
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CartValidation.updateCartZodSchema),
  CartController.updateCart
);

// delete single Cart
router.delete(
  "/:id",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  CartController.deleteCart
);

export const CartRoutes = router;
