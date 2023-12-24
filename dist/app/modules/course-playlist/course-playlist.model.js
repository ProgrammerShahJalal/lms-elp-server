"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursePlaylist = void 0;
const mongoose_1 = require("mongoose");
const coursePlaylistSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    course_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    playlist_link: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });
coursePlaylistSchema.index({ course_id: 1, playlist_link: 1 }, { unique: true });
exports.CoursePlaylist = (0, mongoose_1.model)("CoursePlaylist", coursePlaylistSchema);
