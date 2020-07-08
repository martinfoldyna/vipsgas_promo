import {User} from "./user";

export interface Video {

  id?: string;
  title?: string;
  url?: string;
  thumbnail?: {
    name?: string;
    blob?: Blob;
    src?: string;
  };
  youtubeID?: string;
  createdBy?: any;
  createdAt?: number;
}
