import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../features/products/productActions";
import { getCategoryAction } from "../../features/category/categoryActions";
import { CustomDropdown } from "../custominput/CustomDropdown";

const EditProductForm = ({ id }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  const { categories } = useSelector((state) => state.categoryStore);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { form, setForm, handleOnChange } = useForm({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: [],
    images: [],
  });

  // Load categories
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  // Prepare dropdown options: use both label and ID value
  useEffect(() => {
    if (categories.length) {
      const temp = categories.map((cat) => ({
        label: cat.name,
        value: cat._id, // Use ID for backend consistency
      }));
      setCategoryOptions(temp);
    }
  }, [categories]);

  // Prefill product data
  useEffect(() => {
    const foundProduct = products.find((product) => product._id === id);
    if (foundProduct) {
      setForm({
        name: foundProduct.name || "",
        description: foundProduct.description || "",
        price: foundProduct.price || "",
        stock: foundProduct.stock || "",
        category: foundProduct.category || [],
        images: [],
      });

      // Convert category IDs to readable names
      const selectedNames = categories
        .filter((cat) => foundProduct.category?.includes(cat._id))
        .map((cat) => cat._id); // still use ID as value

      setSelectedCategories(selectedNames);
    }
  }, [id, products, categories, setForm]);

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

    // Send category IDs
    selectedCategories.forEach((catId) => formData.append("category", catId));

    dispatch(updateProductAction(id, formData));
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Product Name"
          onChange={handleOnChange}
          name="name"
          value={form.name}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleOnChange}
          name="description"
          value={form.description}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleOnChange}
          value={form.price}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleOnChange}
          value={form.stock}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categories</Form.Label>
        <CustomDropdown
          options={categoryOptions}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
          label="Update categories"
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
        Save Changes
      </Button>
    </Form>
  );
};

export default EditProductForm;
