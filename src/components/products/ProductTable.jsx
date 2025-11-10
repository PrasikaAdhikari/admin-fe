import { Button, Form, Pagination } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import styles from "./Product.module.css";
import { useState } from "react";
import ImageModal from "../../pages/products/ImageModal";
import { useDispatch } from "react-redux";
import {
  handleActiveStatusAction,
  handleDeleteAction,
} from "../../features/products/productActions";
import { CustomModal } from "../customModal/CustomModal";
import EditProductForm from "./EditProductForm";

function ProductTable({ products }) {
  const [imageModalShow, setImageModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState("");
  const [editProductId, setEditProductId] = useState("");

  // Pagination
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 7;
  const totalPage = Math.ceil(products.length / productsPerPage);
  //Core pagination logic
  const currentProducts = products.slice(
    (activePage - 1) * productsPerPage,
    activePage * productsPerPage
  );
  //For the pagination
  const paginationItems = [];
  for (let number = 1; number <= totalPage; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmed) {
      dispatch(handleDeleteAction(id));
    }
  };

  const handleSwitchChange = (id) => {
    dispatch(handleActiveStatusAction(id));
  };

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Description</th>
          <th>Status</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Images</th>
          <th>Average Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentProducts.map((product, index) => (
          <tr key={product._id}>
            <td>{(activePage - 1) * productsPerPage + index + 1}</td>
            <td>{product.name}</td>
            <td>
              {product.description.length > 40
                ? product.description.slice(0, 40) + "..."
                : product.description}
            </td>
            <td>
              <Form.Check
                type="switch"
                checked={product.status === "active"}
                onChange={() => handleSwitchChange(product._id)}
              />
            </td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <div className="d-flex gap-1">
                {product.images.map((url, i) => (
                  <img
                    key={i}
                    className={styles.imageThumbnail}
                    src={url}
                    width="80"
                    height="60"
                    alt="product"
                    onClick={() => {
                      setImageModalShow(true);
                      setActiveImage(url);
                    }}
                  />
                ))}
              </div>
            </td>
            <td>{(Math.round(product.averageRating * 10) / 10).toFixed(2)}</td>
            <td>
              <div className="d-flex gap-2 justify-content-center">
                <Button
                  variant="warning"
                  onClick={() => {
                    setModalShow(true);
                    setEditProductId(product._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}

        {/* Modals and pagination below table rows */}
        <CustomModal
          show={modalShow}
          title="Edit Product"
          onHide={() => setModalShow(false)}
        >
          <EditProductForm id={editProductId} />
        </CustomModal>

        <ImageModal
          show={imageModalShow}
          onHide={() => setImageModalShow(false)}
          image={activeImage}
        />

        <tr>
          <td colSpan="9" className="text-center">
            <Pagination className="justify-content-center mt-3">
              {paginationItems}
            </Pagination>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ProductTable;
