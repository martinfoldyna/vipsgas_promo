import {Image} from "./image";

export interface ImageSection {
  id?: string;
  name?: string;
  sectionId?: string;
  section?: boolean;
  thumbnail?: {
    image?: any;
    name: string;
    blob: Blob;
  };
  thumbnailName?: string;
  description?: string;
  createdAt?: number;
  createdBy?: {
    email?: any;
    name?: string;
    photoURL?: string;
  };
  images?: Array<Image>;
  imageSrcs?: any;
}
