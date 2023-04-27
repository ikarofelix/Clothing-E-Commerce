import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles.jsx";

import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.util";

import { selectCurrentUser } from "../../store/user/user.selector.js";
import { selectCartIsOpen } from "../../store/cart/cart.selector.js";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img
            src="../../../src/assets/crown.svg"
            height="40px"
            width="40px"
            alt="Crown Clothing Logo"
          />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
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
