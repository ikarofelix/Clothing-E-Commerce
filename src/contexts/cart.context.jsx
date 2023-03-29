import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext({
//   currentCart: null,
//   setCurrentCart: () => null,
// });

// export const CartProvider = ({ children }) => {
//   const [currentCart, setCurrentCart] = useState([]);
//   const value = { currentCart, setCurrentCart };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

const addCartItem = (cartItems, producToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === producToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === producToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  return [...cartItems, { ...producToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (producToAdd) => {
    setCartItems(addCartItem(cartItems, producToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
