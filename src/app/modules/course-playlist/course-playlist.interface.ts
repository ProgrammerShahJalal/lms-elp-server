import { Types } from "mongoose";

export interface ICoursePlaylist {
  title: string;
  course_id: Types.ObjectId;
  playlist_link: string;
}

export interface ICoursePlaylistFilters {
  searchTerm?: string;
  course_id?: string;
  title?: string;
  playlist_link?: string;
}
