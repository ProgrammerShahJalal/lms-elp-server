import { Router } from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { OrderValidation } from "./order.validation";
import authUserOrRole from "../../middlewares/authUserOrRole";

const router = Router();

// create Order
router.post(
  "/",
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder
);

// get all Orders
router.get("/", OrderController.getAllOrders);

// get single Order
router.get("/:id", OrderController.getSingleOrder);

// update single Order
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder
);

// delete Order
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrderController.deleteOrder
);

export const OrderRoutes = router;
