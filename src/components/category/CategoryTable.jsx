import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../features/category/categoryActions";
import { handleDeleteAction } from "../../features/category/categoryActions";
import { CustomModal } from "../customModal/CustomModal";
import EditCategoryForm from "./EditCategoryForm";
import SubCategoryForm from "./SubCategoryForm";

const CategoryTable = () => {
  const { categories } = useSelector((state) => state.categoryStore);
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
    <Table hover className={styles.tableItem}>
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td className="d-flex justify-content-center">
              <div className="d-flex gap-1">
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    setselectedCategory({ id: item._id, name: item.name });
                    setSubCategoryModalShow(!subCategoryModalShow);
                  }}
                >
                  Add Sub-category
                </Button>
                <Button
                  className="btn-warning"
                  onClick={() => {
                    setModalShow(!modalShow);
                    setselectedCategory({ id: item._id, name: item.name });
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
          title="Edit Category"
          onHide={() => setModalShow(!modalShow)}
        >
          <EditCategoryForm id={selectedCategory.id} />
        </CustomModal>
        <CustomModal
          show={subCategoryModalShow}
          title={`Add Sub-Category to ${selectedCategory.name}`}
          onHide={() => setSubCategoryModalShow(!subCategoryModalShow)}
        >
          <SubCategoryForm id={selectedCategory.id} />
        </CustomModal>
      </tbody>
    </Table>
  );
};

export default CategoryTable;
