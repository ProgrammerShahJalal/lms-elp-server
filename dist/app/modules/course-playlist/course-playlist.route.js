"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursePlaylistRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRole_1 = __importDefault(require("../../middlewares/authRole"));
const course_playlist_validation_1 = require("./course-playlist.validation");
const course_playlist_controller_1 = require("./course-playlist.controller");
const router = (0, express_1.Router)();
// create Course  Playlist
router.post("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(course_playlist_validation_1.CoursePlaylistValidation.createCoursePlaylistSchema), course_playlist_controller_1.CoursePlaylistController.createCoursePlaylist);
// get all CoursePlaylists
router.get("/", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), course_playlist_controller_1.CoursePlaylistController.getAllCoursePlaylists);
// Get All Course Playlists of a Course
router.get("/course/:course_id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */, "student" /* ENUM_USER_ROLE.STUDENT */), course_playlist_controller_1.CoursePlaylistController.getPlaylistsOfACourse);
// get single Course Playlist
router.get("/:id", course_playlist_controller_1.CoursePlaylistController.getSingleCoursePlaylist);
// update single CoursePlaylist
router.patch("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(course_playlist_validation_1.CoursePlaylistValidation.updateCoursePlaylistZodSchema), course_playlist_controller_1.CoursePlaylistController.updateCoursePlaylist);
// delete CoursePlaylist
router.delete("/:id", (0, authRole_1.default)("super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */, "admin" /* ENUM_USER_ROLE.ADMIN */), course_playlist_controller_1.CoursePlaylistController.deleteCoursePlaylist);
exports.CoursePlaylistRoutes = router;
