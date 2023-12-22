import { NextFunction, Request, Response, Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CourseValidation } from "./course.validation";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

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

// get all courses
router.get("/", CourseController.getAllCourses);

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
