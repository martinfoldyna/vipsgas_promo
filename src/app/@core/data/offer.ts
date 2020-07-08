export interface Offer {
  id?: string;
  thumbnail?: {
    name?: string;
    blob?: Blob;
    url?: string;
  }
  content?: {
    file?: File;
    url?: string;
  }
}
