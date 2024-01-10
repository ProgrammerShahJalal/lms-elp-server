"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHistoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const subscription_history_model_1 = require("./subscription-history.model");
const user_model_1 = require("../user/user.model");
const subscription_model_1 = require("../subscription/subscription.model");
// create Subscription history
const createSubscriptionHistory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // to check if the course is present of the provided course-id
    const { user_id, subscription_id } = payload;
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const subscription = yield subscription_model_1.Subscription.findById(subscription_id).populate("course_id");
    if (!subscription) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Subscription not found!");
    }
    // check if your subscription day left
    const today = new Date().getTime();
    const alreadyHaveSubscription = yield subscription_history_model_1.SubscriptionHistory.find({
        user_id,
        course_id: (_a = subscription === null || subscription === void 0 ? void 0 : subscription.course_id) === null || _a === void 0 ? void 0 : _a.id,
        expire_date: { $gt: today },
    });
    if (alreadyHaveSubscription === null || alreadyHaveSubscription === void 0 ? void 0 : alreadyHaveSubscription.length) {
        // Calculate the number of days left for the subscription
        const daysLeft = Math.ceil((alreadyHaveSubscription[0].expire_date.getTime() - today) /
            (1000 * 60 * 60 * 24));
        throw new ApiError_1.default(http_status_1.default.OK, `You have an active subscription. It will expire in ${daysLeft} days.`);
    }
    payload.course_id = subscription.course_id;
    payload.amount = subscription.cost;
    let expire_date = new Date();
    expire_date.setMonth(expire_date.getMonth() + subscription.subscription_duration_in_months);
    payload.expire_date = expire_date;
    payload.is_active = (payload === null || payload === void 0 ? void 0 : payload.is_active) || true;
    const result = yield subscription_history_model_1.SubscriptionHistory.create(payload);
    return result;
});
// get all SubscriptionHistorys
const getAllSubscriptionHistorys = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield subscription_history_model_1.SubscriptionHistory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield subscription_history_model_1.SubscriptionHistory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get my subscription-histories
const getMySubscriptionHistories = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_history_model_1.SubscriptionHistory.find({ user_id }).populate("course_id");
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.OK, "No subscription found!");
    }
    return result;
});
// get SubscriptionHistory
const getSingleSubscriptionHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_history_model_1.SubscriptionHistory.findById(id).populate("user_id course_id subscription_id");
    // if the SubscriptionHistory is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Subscription history not found!");
    }
    return result;
});
// update SubscriptionHistory
const updateSubscriptionHistory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating SubscriptionHistory
    const result = yield subscription_history_model_1.SubscriptionHistory.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the SubscriptionHistory you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Subscription history not found!");
    }
    return result;
});
// delete user
const deleteSubscriptionHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete SubscriptionHistory in one operation
    const result = yield subscription_history_model_1.SubscriptionHistory.findOneAndDelete({ _id: id });
    // if the SubscriptionHistory you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Subscription history not found!");
    }
    return result;
});
exports.SubscriptionHistoryService = {
    createSubscriptionHistory,
    getAllSubscriptionHistorys,
    getMySubscriptionHistories,
    getSingleSubscriptionHistory,
    updateSubscriptionHistory,
    deleteSubscriptionHistory,
};
