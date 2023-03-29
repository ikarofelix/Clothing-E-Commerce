import "./product-card.styles.scss";
import { Button } from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  // const { currentCart, setCurrentCart } = useContext(CartContext);
  // console.log(currentCart);

  const addToCart = () => {
    //   if (
    //     currentCart.filter((product) => {
    //       product = { ...product, amount: 0 };
    //       // product.amount++;
    //       console.log(product.amount);
    //     })
    //   )
    //     setCurrentCart([...currentCart, product]);
    // };
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name + "image"} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" type="button">
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
