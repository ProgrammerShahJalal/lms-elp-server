import { Types } from "mongoose";

export interface ICoursePlaylist {
  title: string;
  course_id: Types.ObjectId;
  playlist_link: string;
}
