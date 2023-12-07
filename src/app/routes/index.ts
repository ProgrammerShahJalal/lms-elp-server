import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { QuizQuestionRoutes } from "../modules/quiz-question/quiz-question.route";
import { ShippingAddressRoutes } from "../modules/shipping-address/shipping-address.route";

const router = Router();

const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/quiz-questions", route: QuizQuestionRoutes },
  { path: "/shipping-addresses", route: ShippingAddressRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
