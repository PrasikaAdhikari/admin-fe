import React from "react";
import CategoryTable from "../../components/category/CategoryTable.jsx";

const CategoryLanding = () => {
  return (
    <div className="m-4 d-flex flex-column gap-4">
      <h1>Manage Categories</h1>
      <CategoryTable />
    </div>
  );
};

export default CategoryLanding;
