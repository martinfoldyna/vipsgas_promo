import {ProductPosition, ProductType} from "./product";
import {Thumbnail} from "./image";

export interface Category {
  url: string;
  name: string;
  image?: string;
  thumbnail?: string;
}

export interface DynamicCategory {
  id?: string
  name: string;
  thumbnail?: Thumbnail;
  newThumbnail?: Thumbnail;
  categoryPositions: Array<ProductPosition>;
  categoryTypes: Array<ProductType>
}
