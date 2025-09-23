import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import styles from "./Product.module.css";

function ProductTable({ products }) {
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
          <tr>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <img src={product.images[0]} width="50px" />
            </td>
            <td>{product.averageRating}</td>
            <td>
              <div className="d-flex gap-2 justify-content-center">
                <Button className="btn-warning">Edit</Button>
                <Button className="btn-danger">Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;
