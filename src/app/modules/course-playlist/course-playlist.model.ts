import { Schema, model } from "mongoose";
import { ICoursePlaylist } from "./course-playlist.interface";

const coursePlaylistSchema = new Schema<ICoursePlaylist>(
  {
    title: { type: String, required: true },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    playlist_link: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

coursePlaylistSchema.index(
  { course_id: 1, playlist_link: 1 },
  { unique: true }
);

export const CoursePlaylist = model<ICoursePlaylist>(
  "CoursePlaylist",
  coursePlaylistSchema
);
