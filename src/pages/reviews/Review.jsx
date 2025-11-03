import React from "react";
import { Container, Row } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import ReviewTable from "../../components/reviews/ReviewTable";

const Review = () => {
  return (
    <Container fluid className="p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <BsStars size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Reviews</h2>
            <small className="text-muted">
              View and moderate customer reviews
            </small>
          </div>
        </div>
      </div>

      <Row className="g-5">
        <ReviewTable />
      </Row>
    </Container>
  );
};

export default Review;
