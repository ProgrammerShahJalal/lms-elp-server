"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSearchableFields = exports.cartFilterableFields = void 0;
exports.cartFilterableFields = ["searchTerm", "user_id", "book_id"];
exports.cartSearchableFields = [
    "user_id.email",
    "user_id.contact_no",
    "user_id.name",
    "book_id.name",
];
