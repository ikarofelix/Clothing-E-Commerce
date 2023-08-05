import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartIsOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import Logo from "../../assets/crown.svg";

import { signOutStart } from "../../store/user/user.action";

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);

  const dispatch = useDispatch();

  const logUserOut = () => {
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={Logo} height="40px" width="40px" alt="Crown Clothing Logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={logUserOut}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <NavLink as={CartIcon} />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
