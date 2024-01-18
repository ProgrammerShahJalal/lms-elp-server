import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import authUserOrRole from "../../middlewares/authUserOrRole";
import { OrderDetailsValidation } from "./order-details.validation";
import { OrderDetailsController } from "./order-details.controller";
import authRole from "../../middlewares/authRole";

const router = Router();

// create OrderDetails
router.post(
  "/",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(OrderDetailsValidation.createOrderDetailsSchema),
  OrderDetailsController.createOrderDetails
);

// get all OrderDetails
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrderDetailsController.getAllOrderDetails
);

// get all Order Details of an user
router.get(
  "/my-order-details",
  authRole(ENUM_USER_ROLE.STUDENT),
  OrderDetailsController.getMyOrderDetails
);

// get single OrderDetails
router.get(
  "/:id",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  OrderDetailsController.getSingleOrderDetails
);

// update single OrderDetails
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderDetailsValidation.updateOrderDetailsZodSchema),
  OrderDetailsController.updateOrderDetails
);

// delete OrderDetails
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrderDetailsController.deleteOrderDetails
);

export const OrderDetailsStatusRoutes = router;
