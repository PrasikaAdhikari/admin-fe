import React from "react";
import { CustomInput } from "../custominput/CustomInput";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../features/category/CategoryActions";

const NewCategoryForm = () => {
  const initialState = { category: "", options: "" };
  const dispatch = useDispatch();
  const categoryOptions = [
    { label: "electronic" },
    { label: "mobile" },
    { label: "camera" },
    { label: "other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = form.options;
    if (form.options === "other") {
      name = form.category;
    }
    dispatch(addCategoryAction({ name }));
    setForm(initialState);
  };

  const { form, handleOnChange, setForm } = useForm(initialState);

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Category"
        value={form.options}
        onChange={handleOnChange}
        type="select"
        options={categoryOptions}
        name="options"
      />
      {form.options === "other" && (
        <CustomInput
          label="Category"
          value={form.category}
          onChange={handleOnChange}
          name="category"
          placeholder="Specify category"
        />
      )}

      <Button className="btn-primary" type="submit">
        Add Category
      </Button>
    </Form>
  );
};

export default NewCategoryForm;
