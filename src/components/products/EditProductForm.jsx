import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../features/products/productActions";
import { ImCross } from "react-icons/im";
import styles from "./Product.module.css";
import { getCategoryAction } from "../../features/category/categoryActions";

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
  const [imagesToDelete, setImagesToDelete] = useState([]);

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
        images: foundProduct.images || [],
        category: foundProduct.category || [],
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
        form.images.forEach((item) => {
          if (typeof item !== "string") {
            item.forEach((image) => formData.append("images", image));
          }
        });
      } else {
        formData.append(key, form[key]);
      }
    });
    imagesToDelete.forEach((image) => formData.append("imagesToDelete", image));

    // Send category IDs
    selectedCategories.forEach((catId) => formData.append("category", catId));

    dispatch(updateProductAction(id, formData));
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const images = Array.from(fileList);
    setForm((prev) => ({ ...prev, images: [...prev.images, images] }));
  };

  const handleImageDelete = (imageToDelete) => {
    const newImageArray = form.images.filter(
      (image) => image !== imageToDelete
    );
    setForm((prev) => ({ ...prev, images: newImageArray }));
    setImagesToDelete((prev) => [...prev, imageToDelete]);
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
      <Form.Group
        controlId="formFileMultiple"
        className="mb-3 d-flex flex-column"
      >
        <div className="d-flex gap-3">
          {form.images.map((image) => (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img width="80px" src={image} />
              <ImCross
                className={styles.imageDeleteIcon}
                onClick={() => {
                  handleImageDelete(image);
                }}
                size={15}
              />
            </div>
          ))}
        </div>
        {form.images.length < 3 && (
          <>
            <Form.Label>Select product image/images</Form.Label>
            <Form.Control
              type="file"
              multiple
              name="images"
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        )}
      </Form.Group>

      <Button className="btn-primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditProductForm;
