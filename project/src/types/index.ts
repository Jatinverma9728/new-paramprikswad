export interface ProductSize {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  type: 'liquid' | 'solid';
  sizes: ProductSize[];
  selectedSize?: ProductSize;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WishlistItem extends Product {}