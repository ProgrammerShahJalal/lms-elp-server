import { z } from "zod";

const createCoursePlaylistSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "CoursePlaylist playlist name is required!",
    }),
    course_id: z.string({
      required_error: "Course id is required!",
    }),
    playlist_link: z.string({
      required_error: "Playlist link is required!",
    }),
  }),
});

const updateCoursePlaylistZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    course_id: z.string({}).optional(),
    playlist_link: z.string({}).optional(),
  }),
});

export const CoursePlaylistValidation = {
  createCoursePlaylistSchema,
  updateCoursePlaylistZodSchema,
};