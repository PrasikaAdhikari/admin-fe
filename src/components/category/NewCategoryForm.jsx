import React from "react";
import { CustomInput } from "../custominput/CustomInput";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../features/category/categoryActions";

const NewCategoryForm = () => {
  const initialState = { category: "" };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = form.category;
    dispatch(addCategoryAction({ name, parent: null }));
    setForm(initialState);
  };

  const { form, handleOnChange, setForm } = useForm(initialState);

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Category"
        value={form.category}
        onChange={handleOnChange}
        name="category"
        placeholder="Specify category"
      />

      <Button className="btn-primary" type="submit">
        Add Category
      </Button>
    </Form>
  );
};

export default NewCategoryForm;
