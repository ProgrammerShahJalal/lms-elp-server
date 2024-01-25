import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import { OrderStatusValidation } from "./order-status.validation";
import authRole from "../../middlewares/authRole";
import { OrderStatusController } from "./order-status.controller";
import authPermission from "../../middlewares/authPermission";

const router = Router();

// create Order status
router.post(
  "/",
  validateRequest(OrderStatusValidation.createOrderStatusZodSchema),
  OrderStatusController.createOrderStatus
);

// get all Order statuses
router.get(
  "/",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  OrderStatusController.getAllOrderStatuss
);

// get single Order status
router.get("/:id", OrderStatusController.getSingleOrderStatus);

// update single Order status
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("order_status"),
  validateRequest(OrderStatusValidation.updateOrderStatusZodSchema),
  OrderStatusController.updateOrderStatus
);

// delete Order status
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  authPermission("order"),
  OrderStatusController.deleteOrderStatus
);

export const OrderStatusRoutes = router;
