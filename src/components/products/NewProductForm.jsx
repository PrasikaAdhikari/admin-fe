import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../features/products/productActions";
import { CustomDropdown } from "../custominput/CustomDropdown";
import { getCategoryAction } from "../../features/category/categoryActions";

const NewProductForm = () => {
  const initialState = {};
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryStore);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);

  useEffect(() => {
    const tempCategories = categories.map((category) => {
      return { label: category.name, value: category.name };
    });
    setCategory(tempCategories);
  }, [categories]);

  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form[key].forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, form[key]);
      }
    });
    selected.forEach((cat) => formData.append("category", cat));
    const result = dispatch(addProductAction(formData));
    if (result.status === "success") {
      setForm(initialState);
    }
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const images = Array.from(fileList);
    console.log(images);
    setForm((prev) => ({ ...prev, images }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product Name</Form.Label>
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
      <Form.Group className="mb-3">
        <Form.Label>Select Category / Categories</Form.Label>
        <CustomDropdown
          options={category}
          label="Select categories"
          selected={selected}
          setSelected={setSelected}
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
