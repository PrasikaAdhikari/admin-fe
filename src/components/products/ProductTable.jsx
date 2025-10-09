import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import styles from "./Product.module.css";
import { useState } from "react";
import ImageModal from "../../pages/products/ImageModal";
import { useDispatch } from "react-redux";
import { handleDeleteAction } from "../../features/products/productActions";
import { CustomModal } from "../customModal/CustomModal";
import EditProductForm from "./EditProductForm";

function ProductTable({ products }) {
  const [imageModalShow, setImageModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState("");

  const handleDelete = (id) => {
    dispatch(handleDeleteAction(id));
  };

  return (
    <Table hover className={styles.tableItem}>
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
        {products.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>
              {product.description.length > 40
                ? product.description.slice(0, 40) + "..."
                : product.description}
            </td>
            <td>
              <Form.Check
                type="switch"
                checked={product.status === "active" ? true : false}
              />
            </td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <div className="d-flex gap-1">
                {product?.images.map((url) => (
                  <img
                    className={styles.imageThumbnail}
                    src={url}
                    width="80px"
                    height="60px"
                    onClick={() => {
                      setImageModalShow(true);
                      setActiveImage(url);
                    }}
                  />
                ))}
              </div>
            </td>
            <td>{product.averageRating}</td>
            <td>
              <div className="d-flex gap-2 justify-content-center">
                <Button
                  className="btn-warning"
                  onClick={() => setModalShow(true)}
                >
                  Edit
                </Button>
                <Button
                  className="btn-danger"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  Delete
                </Button>
                <CustomModal
                  show={modalShow}
                  title="Edit Product"
                  onHide={() => setModalShow(false)}
                >
                  <EditProductForm id={product._id} />
                </CustomModal>
              </div>
            </td>
          </tr>
        ))}
        <ImageModal
          show={imageModalShow}
          onHide={() => setImageModalShow(false)}
          image={activeImage}
        />
      </tbody>
    </Table>
  );
}

export default ProductTable;
