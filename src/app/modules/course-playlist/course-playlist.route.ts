import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authRole from "../../middlewares/authRole";
import { ENUM_USER_ROLE } from "../../enums/user";
import { CoursePlaylistValidation } from "./course-playlist.validation";
import { CoursePlaylistController } from "./course-playlist.controller";

const router = Router();

// create Course  Playlist
router.post(
  "/",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CoursePlaylistValidation.createCoursePlaylistSchema),
  CoursePlaylistController.createCoursePlaylist
);

// get all CoursePlaylists
router.get("/", CoursePlaylistController.getAllCoursePlaylists);

// get single Course Playlist
router.get("/:id", CoursePlaylistController.getSingleCoursePlaylist);

// update single CoursePlaylist
router.patch(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CoursePlaylistValidation.updateCoursePlaylistZodSchema),
  CoursePlaylistController.updateCoursePlaylist
);

// delete CoursePlaylist
router.delete(
  "/:id",
  authRole(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CoursePlaylistController.deleteCoursePlaylist
);

export const CoursePlaylistRoutes = router;