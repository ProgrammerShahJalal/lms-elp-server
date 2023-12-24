"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursePlaylistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_playlist_model_1 = require("./course-playlist.model");
const course_model_1 = require("../course/course.model");
// create CoursePlaylist
const createCoursePlaylist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // to check if the sub-category is present of the provided sub-category-id
    const { course_id } = payload;
    const course = yield course_model_1.Course.findById(course_id);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    const result = yield course_playlist_model_1.CoursePlaylist.create(payload);
    return result;
});
// get all CoursePlaylists
const getAllCoursePlaylists = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_playlist_model_1.CoursePlaylist.find({}).populate("course_id");
    // if there is no CoursePlaylist, throw error
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No course playlist found!");
    }
    return result;
});
// get CoursePlaylist
const getSingleCoursePlaylist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_playlist_model_1.CoursePlaylist.findById(id).populate({
        path: "course_id",
        populate: {
            path: "sub_category_id",
            select: "title _id",
            populate: {
                path: "category_id",
                select: "title _id",
            },
        },
    });
    // if the Course Playlist is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course playlist not found!");
    }
    return result;
});
// update Course Playlist
const updateCoursePlaylist = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating CoursePlaylist
    const result = yield course_playlist_model_1.CoursePlaylist.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the CoursePlaylist you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. CoursePlaylist not found!");
    }
    return result;
});
// delete user
const deleteCoursePlaylist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete CoursePlaylist in one operation
    const result = yield course_playlist_model_1.CoursePlaylist.findOneAndDelete({ _id: id });
    // if the CoursePlaylist you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. CoursePlaylist not found!");
    }
    return result;
});
exports.CoursePlaylistService = {
    createCoursePlaylist,
    getAllCoursePlaylists,
    getSingleCoursePlaylist,
    updateCoursePlaylist,
    deleteCoursePlaylist,
};
