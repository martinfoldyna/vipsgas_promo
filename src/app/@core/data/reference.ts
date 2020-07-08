import {Image} from "./image";

export interface Reference {
  id?: string;
  title?: string;
  content?: any;
  images?: Array<Image>;
}
