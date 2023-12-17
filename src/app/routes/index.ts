import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ShippingAddressRoutes } from "../modules/shipping-address/shipping-address.route";
import { QuestionRoutes } from "../modules/question/question.route";
import { ExamRoutes } from "../modules/exam/exam.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { SubCategoryRoutes } from "../modules/sub-category/sub-category.route";
import { CourseRoutes } from "../modules/course/course.route";
import { CoursePlaylistRoutes } from "../modules/course-playlist/course-playlist.route";
import { ExamPaymentRoutes } from "../modules/exam-payment/exam-payment.route";
import { BookRoutes } from "../modules/book/book.route";
import { ExamResultRoutes } from "../modules/exam-result/exam-result.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { SubscriptionRoutes } from "../modules/subscription/subscription.route";
import { OrderRoutes } from "../modules/order/order.route";
import { OrderStatusRoutes } from "../modules/order-status/order-status.route";

const router = Router();

const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/shipping-addresses", route: ShippingAddressRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/sub-categories", route: SubCategoryRoutes },
  { path: "/courses", route: CourseRoutes },
  { path: "/course-playlists", route: CoursePlaylistRoutes },
  { path: "/exams", route: ExamRoutes },
  { path: "/exam-payments", route: ExamPaymentRoutes },
  { path: "/questions", route: QuestionRoutes },
  { path: "/exam-results", route: ExamResultRoutes },
  { path: "/books", route: BookRoutes },
  { path: "/carts", route: CartRoutes },
  { path: "/subscriptions", route: SubscriptionRoutes },
  { path: "/orders", route: OrderRoutes },
  { path: "/order-statuses", route: OrderStatusRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
