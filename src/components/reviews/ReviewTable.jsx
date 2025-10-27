import { useState, useEffect } from "react";
import { Table, Form, Spinner } from "react-bootstrap";

import { FaStar } from "react-icons/fa";
import moment from "moment";
import styles from "../products/Product.module.css"; // reuse same CSS
import {
  fetchReviewsAction,
  handleReviewStatusAction,
} from "../../features/reviews/reviewAction.js";
import { useDispatch } from "react-redux";

function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchReviewsAction();
    if (data?.status === "success") {
      setReviews(data.reviews);
      setProducts(data.products);
    }
    setLoading(false);
  };

  const handleStatusToggle = (id) => {
    dispatch(handleReviewStatusAction(id));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (!reviews.length)
    return <div className="text-center py-5">No reviews to display yet.</div>;

  return (
    <Table hover className={styles.tableItem}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Image</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Status</th>
          <th>Review Date</th>
        </tr>
      </thead>
      <tbody>
        {[...reviews].map((review, index) => {
          const product = products.find(
            (p) =>
              p._id === review.productId ||
              p._id?.toString() === review.productId?.toString()
          );
          return (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{product?.name || "—"}</td>
              <td>
                {product?.images?.length ? (
                  <img
                    src={product.images[0]}
                    alt="Product"
                    className={styles.imageThumbnail}
                    width="80px"
                    height="60px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className="text-muted">No Image</span>
                )}
              </td>
              <td>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
              </td>
              <td>
                <strong>{review.title}</strong>
                <div className="text-muted small">{review.comment}</div>
              </td>
              <td>
                <Form.Check
                  type="switch"
                  checked={review.status === "active"}
                  onChange={() => handleStatusToggle(review._id, review.status)}
                />
              </td>
              <td>{moment(review.createdAt).format("DD MMM YYYY")}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ReviewTable;
