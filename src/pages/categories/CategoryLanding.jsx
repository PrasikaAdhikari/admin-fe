import React from "react";
import CategoryTable from "../../components/category/CategoryTable.jsx";
import { BsCollection } from "react-icons/bs";
import { Container } from "react-bootstrap";

const CategoryLanding = () => {
  return (
    <Container fluid className="p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <BsCollection size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Categories</h2>
            <small className="text-muted">
              Create, edit, and organise your catalogue
            </small>
          </div>
        </div>
        <CategoryTable />
      </div>
    </Container>
  );
};

export default CategoryLanding;
