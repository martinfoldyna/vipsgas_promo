export interface News {
  id?: string;
  title?: string;
  body?: string;
  createdAt?: number;
  createdBy?: {
    name: string,
    photoURL: string
  };
}
