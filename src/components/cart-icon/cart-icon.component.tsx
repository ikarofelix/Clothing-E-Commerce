import { useSelector, useDispatch } from "react-redux";

import { CartIconContainer, ShoppingIconContainer, ItemCount } from "./cart-icon.styles";

import { selectCartCount, selectCartIsOpen } from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

import { ShoppingBagIcon } from "../../assets/shopping-bag";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer>
        <ShoppingBagIcon />
      </ShoppingIconContainer>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
