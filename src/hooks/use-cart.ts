"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  removeAll: () => void;
  getCartCount: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item: CartItem) => item.id === data.id);

        if (existingItem) {
          return set({
            items: currentItems.map((item: CartItem) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }

        set({ items: [...get().items, { ...data, quantity: 1 }] });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item: CartItem) => item.id !== id)] });
      },
      removeAll: () => set({ items: [] }),
      getCartCount: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
