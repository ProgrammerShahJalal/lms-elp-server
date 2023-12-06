import { Router } from "express";
import { UserController } from "./user.controllers";

const router = Router();

router.post("/", UserController.registerUser);

export const UserRoutes = router;
