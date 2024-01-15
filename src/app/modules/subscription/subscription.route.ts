import { Router } from "express";
import { SubscriptionController } from "./subscription.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { SubscriptionValidation } from "./subscription.validation";

const router = Router();

// create Subscription
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SubscriptionValidation.createSubscriptionSchema),
  SubscriptionController.createSubscription
);

// get all Subscriptions
router.get("/", SubscriptionController.getAllSubscriptions);

// get single Subscription
router.get("/:id", SubscriptionController.getSingleSubscription);

// update single Subscription
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SubscriptionValidation.updateSubscriptionZodSchema),
  SubscriptionController.updateSubscription
);

// delete Subscription
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SubscriptionController.deleteSubscription
);

export const SubscriptionRoutes = router;
