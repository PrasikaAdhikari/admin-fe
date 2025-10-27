import React, { useRef } from "react";
import { CustomInput } from "../custominput/CustomInput";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../features/category/categoryActions";

const NewCategoryForm = ({ id }) => {
  const initialState = { name: "" };
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    if (id) formData.append("parent", id);
    dispatch(addCategoryAction(formData));
    setForm(initialState);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const images = Array.from(fileList);
    setForm((prev) => ({ ...prev, image: images[0] }));
  };

  const { form, handleOnChange, setForm } = useForm(initialState);

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Category"
        value={form.name}
        onChange={handleOnChange}
        name="name"
        placeholder="Specify category"
      />
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Select product images</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </Form.Group>

      <Button className="btn-primary" type="submit">
        Add Category
      </Button>
    </Form>
  );
};

export default NewCategoryForm;
