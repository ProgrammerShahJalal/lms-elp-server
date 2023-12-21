import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { SubCategoryValidation } from "./sub-category.validation";
import { SubCategoryController } from "./sub-category.controller";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

const router = Router();

// create SubCategory
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SubCategoryValidation.createSubCategorySchema.parse(
      JSON.parse(req.body.data)
    );
    return SubCategoryController.createSubCategory(req, res, next);
  }
);

// get all sub-categories
router.get("/", SubCategoryController.getAllSubCategories);

// get single SubCategory
router.get("/:id", SubCategoryController.getSingleSubCategory);

// update single SubCategory
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SubCategoryValidation.updateSubCategoryZodSchema),
  SubCategoryController.updateSubCategory
);

// delete SubCategory
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SubCategoryController.deleteSubCategory
);

export const SubCategoryRoutes = router;
