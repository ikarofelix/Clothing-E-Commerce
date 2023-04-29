import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryTitle, CategoryContainer } from "./category.styles.jsx";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState([categoriesMap[category]]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products[0]?.id &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
