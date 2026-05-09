"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  dealerPrice: number;
  image?: string;
  quantity: number;
  taxRate: number;
  isDealer?: boolean;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.productId === action.item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  taxTotal: number;
  shippingAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "pb_cart";

export function CartProvider({ children, isDealer = false }: { children: ReactNode; isDealer?: boolean }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        dispatch({ type: "HYDRATE", items: parsed });
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  const subtotal = state.items.reduce((s, i) => {
    const unitPrice = isDealer ? i.dealerPrice : i.price;
    return s + unitPrice * i.quantity;
  }, 0);

  const taxTotal = state.items.reduce((s, i) => {
    const unitPrice = isDealer ? i.dealerPrice : i.price;
    return s + (unitPrice * i.taxRate / 100) * i.quantity;
  }, 0);

  const shippingAmount = subtotal + taxTotal >= 5000 ? 0 : 150;
  const grandTotal = subtotal + taxTotal + shippingAmount;

  const value: CartContextValue = {
    items: state.items,
    addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    updateQty: (productId, quantity) => dispatch({ type: "UPDATE_QTY", productId, quantity }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    totalItems,
    subtotal,
    taxTotal,
    shippingAmount,
    grandTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
