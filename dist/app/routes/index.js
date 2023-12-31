"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const shipping_address_route_1 = require("../modules/shipping-address/shipping-address.route");
const question_route_1 = require("../modules/question/question.route");
const exam_route_1 = require("../modules/exam/exam.route");
const category_route_1 = require("../modules/category/category.route");
const sub_category_route_1 = require("../modules/sub-category/sub-category.route");
const course_route_1 = require("../modules/course/course.route");
const course_playlist_route_1 = require("../modules/course-playlist/course-playlist.route");
const exam_payment_route_1 = require("../modules/exam-payment/exam-payment.route");
const book_route_1 = require("../modules/book/book.route");
const exam_result_route_1 = require("../modules/exam-result/exam-result.route");
const cart_route_1 = require("../modules/cart/cart.route");
const subscription_route_1 = require("../modules/subscription/subscription.route");
const order_route_1 = require("../modules/order/order.route");
const order_status_route_1 = require("../modules/order-status/order-status.route");
const subscription_history_route_1 = require("../modules/subscription-history/subscription-history.route");
const order_details_route_1 = require("../modules/order-details/order-details.route");
const bkash_route_1 = require("../modules/bkash/bkash.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/users", route: user_route_1.UserRoutes },
    { path: "/shipping-addresses", route: shipping_address_route_1.ShippingAddressRoutes },
    { path: "/categories", route: category_route_1.CategoryRoutes },
    { path: "/sub-categories", route: sub_category_route_1.SubCategoryRoutes },
    { path: "/courses", route: course_route_1.CourseRoutes },
    { path: "/course-playlists", route: course_playlist_route_1.CoursePlaylistRoutes },
    { path: "/exams", route: exam_route_1.ExamRoutes },
    { path: "/exam-payments", route: exam_payment_route_1.ExamPaymentRoutes },
    { path: "/questions", route: question_route_1.QuestionRoutes },
    { path: "/exam-results", route: exam_result_route_1.ExamResultRoutes },
    { path: "/books", route: book_route_1.BookRoutes },
    { path: "/carts", route: cart_route_1.CartRoutes },
    { path: "/subscriptions", route: subscription_route_1.SubscriptionRoutes },
    { path: "/subscription-histories", route: subscription_history_route_1.SubscriptionHistoryRoutes },
    { path: "/orders", route: order_route_1.OrderRoutes },
    { path: "/order-details", route: order_details_route_1.OrderDetailsStatusRoutes },
    { path: "/order-statuses", route: order_status_route_1.OrderStatusRoutes },
    { path: "/bkash", route: bkash_route_1.BkashRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
