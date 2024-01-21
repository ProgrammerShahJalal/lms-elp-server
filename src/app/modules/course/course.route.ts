import { NextFunction, Request, Response, Router } from "express";
import { CourseController } from "./course.controller";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CourseValidation } from "./course.validation";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";
import validateRequest from "../../middlewares/validateRequest";
import { SubscriptionHistoryValidation } from "../subscription-history/subscription-history.validation";

const router = Router();

// create Course
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CourseValidation.createCourseSchema.parse(
      JSON.parse(req.body.data)
    );
    return CourseController.createCourse(req, res, next);
  }
);

router.post(
  "/buy-a-course",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(
    SubscriptionHistoryValidation.createSubscriptionHistorySchema
  ),
  CourseController.BuyACourse
);

// buy all courses of a sub category
router.post(
  "/buy-all-of-a-sub-category",
  authRole(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(CourseValidation.buyAllCoursesOfASubCategorySchema),
  CourseController.BuyAllCoursesOfASubCategory
);

// get all courses
router.get("/", CourseController.getAllCourses);

router.get(
  "/total-cost-of-all-courses-of-a-sub-cat",
  CourseController.GetTotalCostsOfSubCategory
);

// get all course routines
router.get("/routines", CourseController.getAllRoutines);

// get single Course
router.get("/:id", CourseController.getSingleCourse);

// update single Course
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = CourseValidation.updateCourseZodSchema.parse(
          JSON.parse(req.body.data)
        );
      } else {
        req.body = CourseValidation.updateCourseZodSchema.parse({});
      }
    } catch (error) {
      return next(error);
    }
    return CourseController.updateCourse(req, res, next);
  }
);

// delete Course
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.deleteCourse
);

export const CourseRoutes = router;
