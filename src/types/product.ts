export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  collection?: string;
  scent?: string;
  size?: string;
  inStock?: boolean;
  stock?: number;
  longDescription?: string;
  ingredients?: string[];
}
