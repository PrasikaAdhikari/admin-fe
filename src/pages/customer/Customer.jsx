import { useEffect, useState } from "react";
import { fetchAllCustomersAction } from "../../features/customer/customerAction";
import {
  Badge,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaUsers } from "react-icons/fa";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetchAllCustomersAction();
        if (res?.customers) {
          setCustomers(res.customers);
        }
      } catch (error) {
        console.error("❌ Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const total = Array.isArray(customers) ? customers.length : 0;
  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
            <FaUsers size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="mb-0">Customers</h2>
            <small className="text-muted">View all registered customers</small>
          </div>
        </div>
      </div>

      {/* Content */}
      <Row className="g-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>All Customers</strong>
              <Badge bg="light" text="dark">
                {total}
              </Badge>
            </Card.Header>
            <Card.Body className="pt-0">
              <div className="table-responsive">
                <Table hover bordered className="align-middle mb-0">
                  <thead className="table-light">
                    <tr className="text-nowrap text-center">
                      <th style={{ width: 56 }}>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <Spinner animation="border" variant="primary" />
                          <div className="mt-2 text-muted">Loading...</div>
                        </td>
                      </tr>
                    ) : customers && customers.length > 0 ? (
                      customers.map((c, i) => (
                        <tr key={c._id}>
                          <td className="text-center">{i + 1}</td>
                          <td className="text-capitalize">{c?.fname}</td>
                          <td className="text-capitalize">{c?.lname}</td>
                          <td>{c?.email}</td>
                          <td>{c?.phone || "-"}</td>
                          <td>{new Date(c?.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No customers found
                        </td>
                      </tr>
                    )}
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

export default Customer;
