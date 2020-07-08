export interface Image {
  url?: string;
  name?: string;
  blob?: Blob;
  index?: any;
  thumbnail?: boolean;
}

export interface Thumbnail {
  blob?: Blob;
  name?: string;
  url?: string;
}
