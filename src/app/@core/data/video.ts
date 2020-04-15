export interface Video {
  title?: string;
  url?: string;
  thumbnail?: {
    name: string;
    blob: Blob;
  };
}
