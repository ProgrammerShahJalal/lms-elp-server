import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import authUserOrRole from "../../middlewares/authUserOrRole";
import { OrderDetailsValidation } from "./order-details.validation";
import { OrderDetailsController } from "./order-details.controller";

const router = Router();

// create OrderDetails
router.post(
  "/",
  validateRequest(OrderDetailsValidation.createOrderDetailsSchema),
  OrderDetailsController.createOrderDetails
);

// get all OrderDetails
router.get("/", OrderDetailsController.getAllOrderDetails);

// get single OrderDetails
router.get("/:id", OrderDetailsController.getSingleOrderDetails);

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
