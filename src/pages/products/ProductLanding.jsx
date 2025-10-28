import React, { useEffect, useState } from "react";
import { getProdcutsAction } from "../../features/products/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "../../components/products/ProductTable";
import { CgShoppingBag } from "react-icons/cg";
import { Container } from "react-bootstrap";
import HeaderSearch from "../../components/layout/HeaderSearch";

const ProductLanding = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(getProdcutsAction());
  }, []);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  // Callback for HeaderSearch
  const handleSearchChange = (filteredProducts) => {
    // If search input is empty, show all products
    setAllProducts(filteredProducts.length > 0 ? filteredProducts : products);
  };

  return (
    <Container fluid className="p-4 p-md-5">
      <HeaderSearch onSearchChange={handleSearchChange}></HeaderSearch>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <CgShoppingBag size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Products</h2>
            <small className="text-muted">Manage your product listings</small>
          </div>
        </div>
        <ProductTable products={allProducts} />
      </div>
    </Container>
  );
};

export default ProductLanding;
