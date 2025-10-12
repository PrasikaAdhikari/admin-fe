import React from "react";
import NewCategoryForm from "../../components/category/NewCategoryForm";
import { Container } from "react-bootstrap";

const NewCategory = () => {
  return (
    <Container className={`mt-4 mb-4`}>
      <h1>Add new Category</h1>
      <NewCategoryForm />
    </Container>
  );
};

export default NewCategory;
