import {User} from "./user";

export interface Video {
  id?: string;
  platform?: any;
  title?: string;
  url?: string;
  thumbnail?: {
    name?: string;
    blob?: Blob;
    src?: string;
  };
  createdBy?: any;
  createdAt?: number;
}
