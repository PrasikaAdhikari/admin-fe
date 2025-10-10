import React from "react";
import { CustomInput } from "../custominput/CustomInput";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../features/category/categoryActions";

const SubCategoryForm = ({ id }) => {
  const initialState = { subCategory: "" };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = form.subCategory;
    dispatch(addCategoryAction({ name, parent: id }));
    setForm(initialState);
  };

  const { form, handleOnChange, setForm } = useForm(initialState);

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Sub-Category"
        value={form.subCategory}
        onChange={handleOnChange}
        name="subCategory"
        placeholder="Specify Sub-Category"
      />

      <Button className="btn-primary" type="submit">
        Add Category
      </Button>
    </Form>
  );
};

export default SubCategoryForm;
