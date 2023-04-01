// import { useState } from "react";
// import SHOP_DATA from "../../shop-data.json";
// import { ShopData } from "../../utils/firebase/firebase.util";

import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

// const response = await ShopData();

// console.log(response);

// const test = async () => {
//   console.log(response);
// };

// test();

const CategoriesPreview = () => {
  //   const [ShopData, setShopData] = useState(SHOP_DATA);
  //   console.log(ShopData());
  //   const [shopData, setShopData] = useState(response);
  //   const test = () => {
  //     shopData.map((item) => item.price > 20);
  //   };

  //   shopData.map(({ id, name }) => {
  //     console.log(id.integerValue, name.stringValue);
  //   });

  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;

// Consegui fazer usando o arquivo e setando no useState
// Consegui fazer usando o banco de dados Firebase, setando os valores padroes no useState e dai utilizando eles
