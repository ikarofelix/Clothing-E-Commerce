// import { useState } from "react";
// import SHOP_DATA from "../../shop-data.json";
// import { ShopData } from "../../utils/firebase/firebase.util";

import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

// const response = await ShopData();

// console.log(response);

// const test = async () => {
//   console.log(response);
// };

// test();

const Shop = () => {
  //   const [ShopData, setShopData] = useState(SHOP_DATA);
  //   console.log(ShopData());
  //   const [shopData, setShopData] = useState(response);
  //   const test = () => {
  //     shopData.map((item) => item.price > 20);
  //   };

  //   shopData.map(({ id, name }) => {
  //     console.log(id.integerValue, name.stringValue);
  //   });

  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;

// Consegui fazer usando o arquivo e setando no useState
// Consegui fazer usando o banco de dados Firebase, setando os valores padroes no useState e dai utilizando eles
