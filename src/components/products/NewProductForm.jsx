import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./Product.module.css";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { addProductAction } from "../../features/products/productActions";

const NewProductForm = () => {
  const initialState = {};
  const dispatch = useDispatch();

  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAction(form));
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const imageArray = Array.from(fileList);
    console.log(imageArray);
    setForm((prev) => ({ ...prev, imageArray }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Product Name"
          onChange={handleOnChange}
          name="name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleOnChange}
          name="description"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Select product images</Form.Label>
        <Form.Control
          type="file"
          multiple
          name="images"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Group>
      <Button className="btn-primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default NewProductForm;
