import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { SubscriptionHistoryValidation } from "./subscription-history.validation";
import { SubscriptionHistoryController } from "./subscription-history.controller";

const router = Router();

// create Subscription History(buy a course)
router.post(
  "/",
  validateRequest(
    SubscriptionHistoryValidation.createSubscriptionHistorySchema
  ),
  SubscriptionHistoryController.createSubscriptionHistory
);

// // create Subscription History(buy all course of a sub-category)
// router.post(
//   "/",
//   validateRequest(
//     SubscriptionHistoryValidation.createSubscriptionHistorySchema
//   ),
//   SubscriptionHistoryController.createSubscriptionHistory
// );

// get all SubscriptionHistorys
router.get("/", SubscriptionHistoryController.getAllSubscriptionHistorys);

// get my subscription histories
router.get(
  "/my-subscription-histories",
  authRole(ENUM_USER_ROLE.STUDENT),
  SubscriptionHistoryController.getMySubscriptionHistories
);

// get single SubscriptionHistory
router.get("/:id", SubscriptionHistoryController.getSingleSubscriptionHistory);

// update single SubscriptionHistory
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    SubscriptionHistoryValidation.updateSubscriptionHistoryZodSchema
  ),
  SubscriptionHistoryController.updateSubscriptionHistory
);

// delete SubscriptionHistory
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SubscriptionHistoryController.deleteSubscriptionHistory
);

export const SubscriptionHistoryRoutes = router;
