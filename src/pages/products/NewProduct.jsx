import React from "react";
import NewProductForm from "../../components/products/NewProductForm";
import { Container } from "react-bootstrap";
import styles from "../../components/products/Product.module.css";

const NewProduct = () => {
  return (
    <Container className={`mt-4 mb-4 ${styles.formContainer}`}>
      <h1>Add New Product</h1>
      <NewProductForm />
    </Container>
  );
};

export default NewProduct;
