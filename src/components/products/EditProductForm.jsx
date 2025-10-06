import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../features/products/productActions";

const EditProductForm = ({ id }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  const { form, setForm, handleOnChange } = useForm({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  useEffect(() => {
    const foundProduct = products.find((product) => product._id === id);
    if (foundProduct) {
      setForm({
        name: foundProduct.name || "",
        description: foundProduct.description || "",
        price: foundProduct.price || "",
        stock: foundProduct.stock || "",
        images: [],
      });
    }
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form[key].forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, form[key]);
      }
    });
    dispatch(updateProductAction(id, formData));
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const images = Array.from(fileList);
    setForm((prev) => ({ ...prev, images }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Product Name"
          onChange={handleOnChange}
          name="name"
          value={form.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleOnChange}
          name="description"
          value={form.description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleOnChange}
          value={form.price}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleOnChange}
          value={form.stock}
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
        Edit Product
      </Button>
    </Form>
  );
};

export default EditProductForm;
