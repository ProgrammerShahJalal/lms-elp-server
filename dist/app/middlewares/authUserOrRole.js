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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const user_model_1 = require("../modules/user/user.model");
const authUserOrRole = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const isUserExist = yield user_model_1.User.findById(verifiedUser.userId);
        if (isUserExist) {
            req.user = verifiedUser; // role  , userId
        }
        else {
            req.user = null;
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User not found!");
        }
        if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId) === (((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.user_id) || ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.user_id))) {
            next();
        }
        else if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId) === ((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.user_id)) {
            next();
        }
        else if (requiredRoles.length &&
            requiredRoles.includes(verifiedUser.role)) {
            next();
        }
        else {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission denied!");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = authUserOrRole;
