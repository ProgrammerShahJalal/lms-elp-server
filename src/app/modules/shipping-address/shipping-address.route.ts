import { Router } from "express";
import { ShippingAddressController } from "./shipping-address.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ShippingAddressValidation } from "./shipping-address.validation";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import authUserOrRole from "../../middlewares/authUserOrRole";

const router = Router();

// create shipping address
router.post(
  "/",
  authUserOrRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(ShippingAddressValidation.createShippingAddressZodSchema),
  ShippingAddressController.createShippingAddress
);

// get all shipping addresses
router.get(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShippingAddressController.getAllShippingAddresss
);

// get single shipping address
router.get("/:id", ShippingAddressController.getSingleShippingAddress);

// update single shipping address
router.patch(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ShippingAddressValidation.updateShippingAddressZodSchema),
  ShippingAddressController.updateShippingAddress
);

// delete single shipping address
router.delete(
  "/:id",
  authUserOrRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShippingAddressController.deleteShippingAddress
);

export const ShippingAddressRoutes = router;
