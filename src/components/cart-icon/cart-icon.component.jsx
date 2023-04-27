// import * as ShoppingIcon from "../../assets/shopping-bag.svg";

import { useSelector, useDispatch } from "react-redux";

import { CartIconContainer, ShoppingIconContainer, ItemCount } from "./cart-icon.styles.jsx";

// import { CART_ACTION_TYPES } from "../../store/cart/cart.type";
import { selectCartCount, selectCartIsOpen } from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer>
        <img src="../../src/assets/shopping-bag.svg" height="25px" width="25px" alt="Oi" />
      </ShoppingIconContainer>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
