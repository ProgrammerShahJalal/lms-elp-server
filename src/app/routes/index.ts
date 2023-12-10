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
import { ExamSubmissionRoutes } from "../modules/exam-submission/exam-submission.route";

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
  { path: "/exam-submissions", route: ExamSubmissionRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
