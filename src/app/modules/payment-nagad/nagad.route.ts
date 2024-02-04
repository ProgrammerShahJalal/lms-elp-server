import { Router } from "express";
import { NagadController } from "./nagad.controller";

const router = Router();

router.post("/payment/create", NagadController.createPayment);
router.get("/payment/verify/:paymentRefId", NagadController.verifyPayment);

export const NagadPaymentRoutes = router;
