import { AnyAction } from "@reduxjs/toolkit";

import { CartItem } from "./cart.type";

import { setIsCartOpen, setCartItems } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
};

const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  return state;
};
