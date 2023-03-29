import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  // const { cartItems } = useContext(CartContext);
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

  // const cartCount = () => {
  //   let count = 0;
  //   if (!cartItems) {
  //     return count;
  //   }
  //   cartItems.map(({ quantity }) => {
  //     count += quantity;
  //   });
  //   return count;
  // };

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
