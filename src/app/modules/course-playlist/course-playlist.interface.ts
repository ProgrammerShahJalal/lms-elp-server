import { Types } from "mongoose";

export interface ICoursePlaylist {
  name: string;
  course_id: Types.ObjectId;
  playlist_link: string;
}
