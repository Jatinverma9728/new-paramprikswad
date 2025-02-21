import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, WishlistItem } from '../types';

interface User {
  name: string;
  email: string;
}

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  login: (user: User) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  toggleWishlist: (item: WishlistItem) => void;
}

const getInitialCart = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const getInitialWishlist = (): WishlistItem[] => {
  const storedWishlist = localStorage.getItem('wishlist');
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      cart: getInitialCart(),
      wishlist: getInitialWishlist(),

      login: (user) => set({ user }),
      
      logout: () => set({ user: null }),
      
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      updateCartQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.id !== itemId),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        }),

      toggleWishlist: (item) =>
        set((state) => {
          const exists = state.wishlist.some((i) => i.id === item.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((i) => i.id !== item.id)
              : [...state.wishlist, item],
          };
        }),
    }),
    {
      name: 'store',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);