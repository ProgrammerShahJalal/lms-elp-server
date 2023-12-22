import { NextFunction, Request, Response, Router } from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CategoryValidation } from "./category.validation";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

const router = Router();

// create category
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategorySchema.parse(
      JSON.parse(req.body.data)
    );
    return CategoryController.createCategory(req, res, next);
  }
);

// get all categories
router.get("/", CategoryController.getAllCategories);

// get single category
router.get("/:id", CategoryController.getSingleCategory);

// update single category
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = CategoryValidation.updateCategoryZodSchema.parse(
          JSON.parse(req.body.data)
        );
      } else {
        req.body = CategoryValidation.updateCategoryZodSchema.parse({});
      }
    } catch (error) {
      return next(error);
    }
    return CategoryController.updateCategory(req, res, next);
  }
);

// delete category
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
