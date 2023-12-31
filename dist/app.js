"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// use middlewares
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://elp-client.vercel.app/"],
//     credentials: true,
//   })
// );
const allowedOrigins = [
    "http://localhost:3000",
    "https://elp-client.vercel.app",
    // Add other allowed origins as needed
];
app.use((0, cors_1.default)({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use router
app.use("/api/v1", routes_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API not found!",
            },
        ],
    });
    next();
});
exports.default = app;
