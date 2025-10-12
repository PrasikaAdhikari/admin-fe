import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import AddNewUserForm from "../components/forms/AddNewUserForm";
import { CustomModal } from "../../components/customModal/CustomModal";
import { getAllUserAction } from "../../features/users/userActions";
import RegisterUserForm from "../../components/auth/RegisterForm";
import { isSuperAdmin } from "../../hooks/isSuperAdmin";
import { FaUsers, FaUserPlus } from "react-icons/fa";

const User = () => {
  const { users } = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const superAdmin = isSuperAdmin();

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  const total = Array.isArray(users) ? users.length : 0;

  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
            <FaUsers size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="mb-0">Users</h2>
            <small className="text-muted">Manage application users</small>
          </div>
        </div>

        {superAdmin && (
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="primary"
              className="d-flex align-items-center"
              onClick={() => setShowModal(true)}
            >
              <FaUserPlus size={16} className="me-2" />
              Add New User
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <Row className="g-4">
        <Col xs={12}>
          <Card className="border-0">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>All users</strong>
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
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      users.map((u, i) => (
                        <tr key={u._id}>
                          <td className="text-center">{i + 1}</td>
                          <td className="text-capitalize">{u?.username}</td>
                          <td>{u?.email}</td>
                          <td className="text-capitalize">
                            <span className="badge bg-light text-dark">
                              {u?.role}
                            </span>
                          </td>
                          {/**
                           * Admin controls (kept for future use; design-ready, logic unchanged)
                           *
                           * <td>
                           *   <Form.Check ... />
                           * </td>
                           * <td>
                           *   <Button variant="danger" size="sm" ...>Delete</Button>
                           * </td>
                           */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">
                          No users found
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

      {/* Modal */}
      {superAdmin && (
        <CustomModal
          title="Add New User"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <RegisterUserForm onHide={() => setShowModal(false)} />
        </CustomModal>
      )}
    </Container>
  );
};

export default User;
