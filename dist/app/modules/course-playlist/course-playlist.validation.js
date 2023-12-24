"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursePlaylistValidation = void 0;
const zod_1 = require("zod");
const createCoursePlaylistSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Course playlist title is required!",
        }),
        course_id: zod_1.z.string({
            required_error: "Course id is required!",
        }),
        playlist_link: zod_1.z.string({
            required_error: "Playlist link is required!",
        }),
    }),
});
const updateCoursePlaylistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({}).optional(),
        course_id: zod_1.z.string({}).optional(),
        playlist_link: zod_1.z.string({}).optional(),
    }),
});
exports.CoursePlaylistValidation = {
    createCoursePlaylistSchema,
    updateCoursePlaylistZodSchema,
};
