export interface Product {
  id?: string;
  name?: string;
  thumbnail?: {
    name?: string;
    blob?: Blob;
  };
  thumbnailURL?: string;
  productCategory?: string;
}
