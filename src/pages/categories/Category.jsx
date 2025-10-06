import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryTable from "../../components/category/CategoryTable.jsx";

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="m-4 d-flex flex-column gap-4">
      <h1>Manage Categories</h1>
      <CategoryTable />
    </div>
  );
};

export default Category;
