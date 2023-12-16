import { Router } from "express";
import { CartController } from "./cart.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CartValidation } from "./cart.validation";
import authUserOrRole from "../../middlewares/authUserOrRole";

const router = Router();

// create Cart
router.post(
  "/",
  validateRequest(CartValidation.createCartZodSchema),
  CartController.createCart
);

// get all Carts
router.get("/", CartController.getAllCarts);

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
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CartController.deleteCart
);

export const CartRoutes = router;
