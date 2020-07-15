import {Image, Thumbnail} from "./image";

export interface Product {
  images?: Array<Image>;
  id?: string;
  name?: string;
  thumbnail?: Thumbnail;
  newThumbnail?: Thumbnail;
  description?: any;
  thumbnailURL?: string;
  productCategory?: ProductCategoryInfo;
  position?: string;
  type?: string;
  checkedThumbnail?: any;
  positionDetailed?: {
    name?: string,
    code?: string
  }
}

export interface ProductPosition {
  name: string;
  value: string;
}

export interface ProductType {
  name: string;
  value: string;
  condition?: string;
}

export interface ProductCategoryInfo {
  name: string;
  id: string;
}

export interface ProductTypeOptions {
  productPosition: Array<ProductPosition>;
  productType: Array<ProductType>;
}
