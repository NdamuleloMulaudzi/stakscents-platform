"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      // Alias for compatibility if needed, but we'll use items in usage
      cart: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item: CartItem) => item.id === data.id
        );

        if (existingItem) {
          return set({
            items: currentItems.map((item: CartItem) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + (data.quantity || 1) }
                : item
            ),
          });
        }

        set({
          items: [...get().items, { ...data, quantity: data.quantity || 1 }],
        });
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item: CartItem) => item.id !== id)],
        });
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      removeAll: () => set({ items: [] }),
      clearCart: () => set({ items: [] }),
      getCartCount: () => {
        return get().items.reduce(
          (total: number, item: CartItem) => total + item.quantity,
          0
        );
      },
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
