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
exports.SubscriptionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const course_model_1 = require("../course/course.model");
const subscription_model_1 = require("./subscription.model");
const subscription_constants_1 = require("./subscription.constants");
// create Subscription
const createSubscription = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // to check if the course is present of the provided course-id
    const { course_id } = payload;
    const course = yield course_model_1.Course.findById(course_id);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    const result = yield subscription_model_1.Subscription.create(payload);
    return result;
});
// get all Subscriptions
const getAllSubscriptions = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: subscription_constants_1.subscriptionFilterableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
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
    const result = yield subscription_model_1.Subscription.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("course_id");
    const total = yield subscription_model_1.Subscription.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get Subscription
const getSingleSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.Subscription.findById(id).populate("course_id");
    // if the Subscription is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Subscription not found!");
    }
    return result;
});
// update Subscription
const updateSubscription = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating Subscription
    const result = yield subscription_model_1.Subscription.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the Subscription you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Subscription not found!");
    }
    return result;
});
// delete user
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete Subscription in one operation
    const result = yield subscription_model_1.Subscription.findOneAndDelete({ _id: id });
    // if the Subscription you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Subscription not found!");
    }
    return result;
});
exports.SubscriptionService = {
    createSubscription,
    getAllSubscriptions,
    getSingleSubscription,
    updateSubscription,
    deleteSubscription,
};
