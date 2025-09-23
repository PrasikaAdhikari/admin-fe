import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./Product.module.css";
import { Button } from "react-bootstrap";

const NewProductForm = () => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product</Form.Label>
        <Form.Control type="text" placeholder="Product Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Stock" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Image</Form.Label>
        <Form.Control type="email" placeholder="Image" />
      </Form.Group>
      <Button className="btn-primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default NewProductForm;
