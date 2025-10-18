import { useState } from "react";

const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);
  const resetForm = () => {
    setForm(initialState);
  };
  return {
    form,
    setForm,
    resetForm,
    handleOnChange: (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
  };
};

export default useForm;
