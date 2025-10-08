import React, { useEffect, useState } from "react";
import { getProdcutsAction } from "../../features/products/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "../../components/products/ProductTable";

const ProductLanding = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  const { categories } = useSelector((state) => state.productStore);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(getProdcutsAction());
  }, []);

  useEffect(() => {
    setAllProducts(products);
    setCategory(categories);
  }, [products, categories]);

  return (
    <div className="m-4 d-flex flex-column gap-4">
      <h1>Manage Products</h1>
      <ProductTable products={allProducts} />
    </div>
  );
};

export default ProductLanding;
