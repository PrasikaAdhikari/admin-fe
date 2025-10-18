import React, { useEffect } from "react";
import { CustomInput } from "../custominput/CustomInput";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAction } from "../../features/category/categoryActions";

const EditCategoryForm = ({ id, type }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryStore);
  const { subCategories } = useSelector((state) => state.categoryStore);
  const initialState = { category: "" };
  const { form, handleOnChange, setForm } = useForm(initialState);

  useEffect(() => {
    const category =
      type === "category"
        ? categories.find((category) => category._id === id)
        : subCategories.find((category) => category._id === id);
    setForm({ category: category.name } || initialState);
  }, [id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = form.category;
    dispatch(updateCategoryAction(id, { name }));
    setForm(initialState);
  };

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
        Save {type === "category" ? "Category" : "Sub-Category"}
      </Button>
    </Form>
  );
};

export default EditCategoryForm;
