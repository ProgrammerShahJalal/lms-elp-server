"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    this_site_url: process.env.THIS_SITE_URL,
    frontend_site_url: process.env.FRONTEND_SITE_URL,
    mongodb: {
        url: process.env.MONGODB_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    bkash: {
        user_name: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
        app_key: process.env.BKASH_APP_KEY,
        app_secret_key: process.env.BKASH_APP_SECRET_KEY,
        grand_token_url: process.env.BKASH_GRANT_TOKEN_URL,
        create_payment_url: process.env.BKASH_CREATE_PAYMENT_URL,
        execute_payment_url: process.env.BKASH_EXECUTE_PAYMENT_URL,
        refund_transaction_url: process.env.BKASH_REFUND_TRANSACTION_URL,
        search_transactioin_url: process.env.BKASH_SEARCH_TRAN_URL,
        query_payment_url: process.env.BKASH_QUERY_PAYMENT_URL,
    },
};
