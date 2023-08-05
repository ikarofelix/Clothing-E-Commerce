import { useSelector, useDispatch } from "react-redux";

import { CartIconContainer, ShoppingIconContainer, ItemCount } from "./cart-icon.styles";

import { selectCartCount, selectCartIsOpen } from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

import ShoppingBagIcon from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer>
        <img src={ShoppingBagIcon} height="25px" width="25px" alt="Shopping Bag" />
      </ShoppingIconContainer>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
