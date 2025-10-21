import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../features/products/productActions";
import { CustomDropdown } from "../custominput/CustomDropdown";
import { getCategoryAction } from "../../features/category/categoryActions";

const NewProductForm = () => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  };
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, subCategories } = useSelector(
    (state) => state.categoryStore
  );
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "category",
    value: "Select category",
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    label: "Sub category",
    value: "Select SubCategory",
  });
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);

  useEffect(() => {
    let tempsubcat = subCategories.filter(
      (item) => item.parent == selectedCategory.id
    );

    tempsubcat = tempsubcat.map((item) => {
      return { label: item.name, value: item.name, id: item._id };
    });
    setFilteredSubCategory(tempsubcat);
  }, [selectedCategory]);

  useEffect(() => {
    const tempCategories = categories.map((category) => {
      return { label: category.name, value: category.name, id: category._id };
    });
    setCategory(tempCategories);
  }, [categories]);

  const { form, setForm, handleOnChange, resetForm } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form[key].forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, form[key]);
      }
    });

    formData.append("category", selectedCategory.value);

    formData.append("subCategory", selectedSubCategory.value);

    try {
      const result = await dispatch(addProductAction(formData));
      if (result.status === "success") {
        resetForm();
        setSelectedCategory({});
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    } finally {
      setLoading(false);
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
      <Form.Group className="mb-3">
        <Form.Label>Select Category / Categories</Form.Label>
        <CustomDropdown
          options={category}
          label="Select categories"
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </Form.Group>
      {filteredSubCategory.length > 0 && (
        <Form.Group className="mb-3">
          <Form.Label>Select Sub-Category / Sub-Categories</Form.Label>
          <CustomDropdown
            options={filteredSubCategory}
            label="Select sub categories"
            selected={selectedSubCategory}
            setSelected={setSelectedSubCategory}
          />
        </Form.Group>
      )}

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Select product images</Form.Label>
        <Form.Control
          type="file"
          multiple
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </Form.Group>
      <Button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Adding new product...." : "Add Product"}
      </Button>
    </Form>
  );
};

export default NewProductForm;
