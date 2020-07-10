export interface Offer {
  id?: string;
  name?: string;
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
