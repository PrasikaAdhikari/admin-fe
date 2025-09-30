import { Col, Container, Row } from "react-bootstrap";
import CustomCard from "../../components/customCard/CustomCard";

//static value for products
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description:
      "High-quality sound with noise cancellation and long battery life.",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1518442535560-02e5d6e1f68d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 2,
    title: "Smartwatch",
    description: "Track fitness, monitor health, and stay connected on the go.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 3,
    title: "Gaming Mouse",
    description:
      "Ergonomic design with customizable RGB lighting and fast response.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1587202372775-98973e9d0d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    description: "Portable waterproof speaker with deep bass and clear sound.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1616627562206-6d02c020b5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 5,
    title: "Laptop Backpack",
    description:
      "Durable, stylish backpack with multiple compartments for laptops and accessories.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1600185365459-f2f4f2c1c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 6,
    title: "Wireless Headphones",
    description:
      "High-quality sound with noise cancellation and long battery life.",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1518442535560-02e5d6e1f68d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 7,
    title: "Smartwatch",
    description: "Track fitness, monitor health, and stay connected on the go.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 8,
    title: "Gaming Mouse",
    description:
      "Ergonomic design with customizable RGB lighting and fast response.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1587202372775-98973e9d0d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 9,
    title: "Bluetooth Speaker",
    description: "Portable waterproof speaker with deep bass and clear sound.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1616627562206-6d02c020b5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 10,
    title: "Laptop Backpack",
    description:
      "Durable, stylish backpack with multiple compartments for laptops and accessories.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1600185365459-f2f4f2c1c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
  },
];

const Category = () => {
  return (
    <Container className="py-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* products.map to be replaced after retrieving data from backend/ redux */}
        {products.map((product) => (
          <Col key={product.id}>
            <CustomCard {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
