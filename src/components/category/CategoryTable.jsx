import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../features/category/categoryActions";
import { handleDeleteAction } from "../../features/category/categoryActions";
import { CustomModal } from "../customModal/CustomModal";
import EditCategoryForm from "./EditCategoryForm";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import NewCategoryForm from "./NewCategoryForm";

const CategoryTable = () => {
  const { categories } = useSelector((state) => state.categoryStore);
  const { subCategories } = useSelector((state) => state.categoryStore);

  const [modalShow, setModalShow] = useState(false);
  const [subCategoryModalShow, setSubCategoryModalShow] = useState(false);
  const [selectedCategory, setselectedCategory] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch(handleDeleteAction(id));
    }
  };

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Sub-Categories</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
              {subCategories?.map((subCategory) =>
                subCategory.parent === item._id ? (
                  <div className="d-flex justify-content-between gap-3 mt-2 mb-2">
                    <span key={subCategory._id}>{subCategory.name}</span>
                    <div className="d-flex gap-1">
                      <Button
                        className="rounded-circle btn-warning"
                        onClick={() => {
                          setselectedCategory({
                            id: subCategory._id,
                            name: subCategory.name,
                            type: "subCategory",
                          });
                          setModalShow(!modalShow);
                        }}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        className="rounded-circle btn-danger"
                        onClick={() => handleDelete(subCategory._id)}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </td>
            <td>
              <div className="d-flex gap-1 justify-content-center align-items-center h-100">
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    setselectedCategory({
                      id: item._id,
                      name: item.name,
                      type: "category",
                    });
                    setSubCategoryModalShow(!subCategoryModalShow);
                  }}
                >
                  Add Sub-category
                </Button>
                <Button
                  className="btn-warning"
                  onClick={() => {
                    setModalShow(!modalShow);
                    setselectedCategory({
                      id: item._id,
                      name: item.name,
                      type: "category",
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="btn-danger"
                  onClick={() => {
                    handleDelete(item._id, item.name);
                  }}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
        <CustomModal
          show={modalShow}
          title={`Edit ${selectedCategory.type}`}
          onHide={() => setModalShow(!modalShow)}
        >
          <EditCategoryForm
            id={selectedCategory.id}
            type={selectedCategory.type}
          />
        </CustomModal>
        <CustomModal
          show={subCategoryModalShow}
          title={`Add Sub-Category to ${selectedCategory.name}`}
          onHide={() => setSubCategoryModalShow(!subCategoryModalShow)}
        >
          <NewCategoryForm id={selectedCategory.id} />
        </CustomModal>
      </tbody>
    </Table>
  );
};

export default CategoryTable;
