import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomCard = ({ id, image, title, description, price }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent card navigation
    alert("cart button here");
    console.log("Added to cart:", { id, title, price });
  };

  return (
    <Card
      className="h-100 shadow-sm border rounded product-card"
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
      onClick={handleOnClick}
    >
      {/* Product Image */}
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ objectFit: "cover", height: "200px" }}
      />

      {/* Body: Title + Description */}
      <Card.Body className="flex-grow-1">
        <Card.Title className="text-truncate">{title}</Card.Title>
        <Card.Text
          className="text-muted"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Card.Text>
      </Card.Body>

      {/* Fixed Bottom Section */}
      <Card.Footer
        className="d-flex justify-content-between align-items-center bg-white"
        style={{
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <span
          className="px-3 py-1 border rounded fw-bold bg-success"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          ${price}
        </span>
        <Button size="sm" variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CustomCard;
