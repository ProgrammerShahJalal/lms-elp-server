import { NextFunction, Request, Response, Router } from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { BookValidation } from "./book.validation";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

const router = Router();

// create Book
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = BookValidation.addBookZodSchema.parse(JSON.parse(req.body.data));
    return BookController.addBook(req, res, next);
  }
);

// get all Books
router.get("/", BookController.getAllBooks);

// get books of a sub category
router.get(
  "/sub-category/:sub_category_id",
  BookController.getAllBooksOfASubCategory
);

// get books of a course
router.get("/course/:course_id", BookController.getAllBooksOfACourse);

// get single Book
router.get("/:id", BookController.getSingleBook);

// update single Book
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = BookValidation.updateBookZodSchema.parse(
          JSON.parse(req.body.data)
        );
      } else {
        req.body = BookValidation.updateBookZodSchema.parse({});
      }
    } catch (error) {
      return next(error);
    }
    return BookController.updateBook(req, res, next);
  }
);

// delete single Book
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookController.deleteBook
);

export const BookRoutes = router;
