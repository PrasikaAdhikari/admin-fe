import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import styles from "./Product.module.css";
import { useState } from "react";
import ImageModal from "../../pages/products/ImageModal";
import { useDispatch } from "react-redux";
import { handleDeleteAction } from "../../features/products/productActions";

function ProductTable({ products }) {
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
          <th>Description</th>
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
                      setModalShow(true);
                      setActiveImage(url);
                    }}
                  />
                ))}
              </div>
            </td>
            <td>{product.averageRating}</td>
            <td>
              <div className="d-flex gap-2 justify-content-center">
                <Button className="btn-warning">Edit</Button>
                <Button
                  className="btn-danger"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
        <ImageModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          image={activeImage}
        />
      </tbody>
    </Table>
  );
}

export default ProductTable;
