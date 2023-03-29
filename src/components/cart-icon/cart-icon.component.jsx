import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { currentCart } = useContext(CartContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const cartCount = () => {
    if (!currentCart) {
      return 0;
    }
    return currentCart.length;
  };

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount()}</span>
    </div>
  );
};

export default CartIcon;
