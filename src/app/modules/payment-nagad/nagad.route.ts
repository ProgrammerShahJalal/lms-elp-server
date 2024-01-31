import { Router } from "express";
import { NagadController } from "./nagad.controller";

const router = Router();

router.post("/payment/create", NagadController.createPayment);

export const NagadPaymentRoutes = router;
