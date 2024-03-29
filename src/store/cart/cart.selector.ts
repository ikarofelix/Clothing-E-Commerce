import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.type";
import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartIsOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: CartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
