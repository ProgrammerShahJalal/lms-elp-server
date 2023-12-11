import { Router } from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { BookValidation } from "./book.validation";

const router = Router();

// create Book
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

// get all Books
router.get("/", BookController.getAllBooks);

// get single Book
router.get("/:id", BookController.getSingleBook);

// update single Book
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

// delete single Book
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookController.deleteBook
);

export const BookRoutes = router;
