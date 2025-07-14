export interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}
