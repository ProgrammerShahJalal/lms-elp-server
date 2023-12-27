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
exports.CoursePlaylistController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const course_playlist_service_1 = require("./course-playlist.service");
const createCoursePlaylist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_playlist_service_1.CoursePlaylistService.createCoursePlaylist(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Course playlist added successfully!",
        data: result,
    });
}));
const getAllCoursePlaylists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_playlist_service_1.CoursePlaylistService.getAllCoursePlaylists();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All course playlists fetched successfully!",
        data: result,
    });
}));
const getSingleCoursePlaylist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_playlist_service_1.CoursePlaylistService.getSingleCoursePlaylist(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Course playlist fetched successfully!",
        data: result,
    });
}));
const updateCoursePlaylist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield course_playlist_service_1.CoursePlaylistService.updateCoursePlaylist(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Course playlist updated in successfully!",
        data: result,
    });
}));
const deleteCoursePlaylist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_playlist_service_1.CoursePlaylistService.deleteCoursePlaylist(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Course playlist deleted in successfully!",
        data: result,
    });
}));
exports.CoursePlaylistController = {
    createCoursePlaylist,
    getAllCoursePlaylists,
    getSingleCoursePlaylist,
    updateCoursePlaylist,
    deleteCoursePlaylist,
};
