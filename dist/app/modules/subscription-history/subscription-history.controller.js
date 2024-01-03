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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHistoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const subscription_history_service_1 = require("./subscription-history.service");
const subscription_history_constants_1 = require("./subscription-history.constants");
const createSubscriptionHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_history_service_1.SubscriptionHistoryService.createSubscriptionHistory(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription history added successfully!",
        data: result,
    });
}));
const getAllSubscriptionHistorys = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, subscription_history_constants_1.subscriptionHistoryFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield subscription_history_service_1.SubscriptionHistoryService.getAllSubscriptionHistorys(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All subscription historys fetched successfully!",
        data: result,
    });
}));
const getMySubscriptionHistories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield subscription_history_service_1.SubscriptionHistoryService.getMySubscriptionHistories(user_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription histories fetched successfully!",
        data: result,
    });
}));
const getSingleSubscriptionHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield subscription_history_service_1.SubscriptionHistoryService.getSingleSubscriptionHistory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription history fetched successfully!",
        data: result,
    });
}));
const updateSubscriptionHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield subscription_history_service_1.SubscriptionHistoryService.updateSubscriptionHistory(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription history updated in successfully!",
        data: result,
    });
}));
const deleteSubscriptionHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield subscription_history_service_1.SubscriptionHistoryService.deleteSubscriptionHistory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription history deleted in successfully!",
        data: result,
    });
}));
exports.SubscriptionHistoryController = {
    createSubscriptionHistory,
    getAllSubscriptionHistorys,
    getMySubscriptionHistories,
    getSingleSubscriptionHistory,
    updateSubscriptionHistory,
    deleteSubscriptionHistory,
};
