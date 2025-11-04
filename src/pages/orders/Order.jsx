import React, { useState, useEffect } from "react";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import { fetchOrdersAction } from "../../features/orders/orderActions";
import OrderStatusDropdown from "../../components/orders/OrderStatusDropdown";
import { BsReceipt } from "react-icons/bs";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const result = await fetchOrdersAction();
      if (result.status === "success") setOrders(result.orders);
    };
    getOrders();
  }, []);

  return (
    <Container fluid className="p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <BsReceipt size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Orders</h2>
            <small className="text-muted">
              Manage customer orders & statuses
            </small>
          </div>
        </div>
      </div>

      <Row className="g-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>All Orders</strong>
              <Badge bg="light" text="dark">
                {orders.length}
              </Badge>
            </Card.Header>
            <Card.Body className="pt-0">
              <div className="table-responsive">
                <Table hover bordered striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>OrderId</th>
                      <th>Order Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order, index) => (
                      <React.Fragment key={order._id}>
                        {order.items.map((item, itemIndex) => (
                          <tr key={`${order._id}-${item.productId}`}>
                            {itemIndex === 0 && (
                              <>
                                <td
                                  rowSpan={order.items.length}
                                  className="align-middle"
                                >
                                  {index + 1}
                                </td>
                                <td
                                  rowSpan={order.items.length}
                                  className="align-middle"
                                >
                                  {order._id}
                                </td>
                              </>
                            )}
                            <td>{item.productName}</td>
                            <td className="text-center">{item.quantity} x </td>
                            <td>${item.price}</td>
                            {itemIndex === 0 && (
                              <td
                                rowSpan={order.items.length + 1}
                                className="align-middle"
                              >
                                <OrderStatusDropdown
                                  orderStatus={order.status}
                                  orderId={order._id}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={4} className="text-end">
                            Total:
                          </td>
                          <td>${order.total.toFixed(2)}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
