import { create } from 'zustand';
import { CartItem, Product, WishlistItem } from '../types';

interface Store {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: { isAuthenticated: boolean; data: null | { name: string; email: string } };
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  setUser: (userData: { name: string; email: string } | null) => void;
}

const getInitialCart = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const getInitialWishlist = (): WishlistItem[] => {
  const storedWishlist = localStorage.getItem('wishlist');
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const useStore = create<Store>((set) => ({
  cart: getInitialCart(),
  wishlist: getInitialWishlist(),
  user: { isAuthenticated: false, data: null },
  
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.some((item) => item.id === product.id);
      const updatedWishlist = exists
        ? state.wishlist.filter((item) => item.id !== product.id)
        : [...state.wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    }),

  setUser: (userData) =>
    set({
      user: {
        isAuthenticated: !!userData,
        data: userData,
      },
    }),
}));