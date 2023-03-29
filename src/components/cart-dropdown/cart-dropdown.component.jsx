import { Button } from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import ProductCard from "../product-card/product-card.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { currentCart } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {/* {currentCart.map((item) => (
          <div>
            <h1>{item.name}</h1>
          </div>
        ))} */}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
