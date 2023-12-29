import { Router } from "express";
import { BkashController } from "./bkash.controller";
import { BkashMiddlewares } from "./bkash.middlewares";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

// create payment
router.post(
  "/payment/create",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  BkashMiddlewares.bkashAuth,
  BkashController.createPayment
);

// callback
router.get(
  "/payment/callback",
  BkashMiddlewares.bkashAuth,
  BkashController.callBack
);

// callback
router.get(
  "/payment/refund/:trx_id",
  BkashMiddlewares.bkashAuth,
  BkashController.refund
);

export const BkashRoutes = router;
