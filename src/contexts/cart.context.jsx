import { createContext, useState } from "react";

// export const CartContext = createContext({
//   currentCart: null,
//   setCurrentCart: () => null,
// });

// export const CartProvider = ({ children }) => {
//   const [currentCart, setCurrentCart] = useState([]);
//   const value = { currentCart, setCurrentCart };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
