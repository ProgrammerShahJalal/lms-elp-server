"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const book_validation_1 = require("./book.validation");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
const router = (0, express_1.Router)();
// create Book
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    req.body = book_validation_1.BookValidation.addBookZodSchema.parse(JSON.parse(req.body.data));
    return book_controller_1.BookController.addBook(req, res, next);
});
// get all Books
router.get("/", book_controller_1.BookController.getAllBooks);
// get books of a sub category
router.get("/sub-category/:sub_category_id", book_controller_1.BookController.getAllBooksOfASubCategory);
// get single Book
router.get("/:id", book_controller_1.BookController.getSingleBook);
// update single Book
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), fileUploadHelper_1.FileUploadHelper.upload.single("file"), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = book_validation_1.BookValidation.updateBookZodSchema.parse(JSON.parse(req.body.data));
        }
        else {
            req.body = book_validation_1.BookValidation.updateBookZodSchema.parse({});
        }
    }
    catch (error) {
        return next(error);
    }
    return book_controller_1.BookController.updateBook(req, res, next);
});
// delete single Book
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
