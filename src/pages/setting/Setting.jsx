import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetail,
  updateUserDetailAction,
} from "../../features/users/userActions";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

const initialsFrom = (name) => {
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
};

const Setting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  const fullName = user.username || "User";
  const email = user.email || "";
  const role = (user.role || user.userType || "user").toString();
  const phone = user.phone || user.mobile || "";
  const memberSince = user.createdAt
    ? user.createdAt.split?.("T")?.[0] ||
      new Date(user.createdAt).toLocaleDateString()
    : "—";
  const updatedAt = user.updatedAt
    ? user.updatedAt.split?.("T")?.[0] ||
      new Date(user.updatedAt).toLocaleDateString()
    : "—";
  const verified =
    user.verified === true ? "Yes" : user.verified === false ? "No" : "—";

  const completion = (() => {
    let score = 0;
    if (fullName) score += 25;
    if (email) score += 25;
    if (role) score += 25;
    if (phone) score += 25;
    return score;
  })();

  const [form, setForm] = useState({
    fullNameInput: fullName !== "User" ? fullName : "",
    emailInput: email,
    phoneInput: phone,
    roleInput: role,
    imageInput: user.image || "",
  });

  useEffect(() => {
    setForm({
      fullNameInput: fullName !== "User" ? fullName : "",
      emailInput: email,
      phoneInput: phone,
      roleInput: role,
      imageInput: user.image || "",
    });
  }, [fullName, email, phone, role, user.image]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleOnSave = async () => {
    const body = {
      username: form.fullNameInput || user.username,
      email: form.emailInput || user.email,
      phone: form.phoneInput || user.phone,
      role: form.roleInput || user.role,
      image: form.imageInput || user.image,
    };

    try {
      const res = await dispatch(updateUserDetailAction(body));
      if (res?.status === "success") {
        await dispatch(getUserDetail());
        toast.success(res?.message || "Profile updated successfully");
        setShowEdit(false);
      } else {
        alert(res?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating your profile.");
    }
  };

  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <CgProfile size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Profile</h2>
            <small className="text-muted">Manage your account details</small>
          </div>
        </div>
      </div>

      <Row className="g-4">
        {/* Left column */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={fullName}
                    className="rounded-circle border"
                    style={{ width: 72, height: 72, objectFit: "cover" }}
                  />
                ) : (
                  <span
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                    style={{ width: 72, height: 72, fontSize: 20 }}
                    title={fullName}
                    aria-label="avatar"
                  >
                    {initialsFrom(fullName)}
                  </span>
                )}

                <div className="flex-grow-1">
                  <h4 className="mb-1 text-capitalize">{fullName}</h4>
                  <div className="text-muted small mb-1">{email || "—"}</div>
                  <Badge bg="light" text="dark" className="text-uppercase">
                    {role}
                  </Badge>
                </div>
              </div>

              <hr className="my-4" />

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Member since</span>
                  <span className="fw-semibold">{memberSince}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Verified</span>
                  <span
                    className={
                      verified === "Yes"
                        ? "badge bg-success"
                        : verified === "No"
                        ? "badge bg-secondary"
                        : "badge bg-light text-dark"
                    }
                  >
                    {verified}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted">Profile completeness</span>
                    <span className="fw-semibold">{completion}%</span>
                  </div>
                  <ProgressBar className="mt-2" now={completion} />
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Last updated</span>
                  <span className="fw-semibold">{updatedAt}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Right column */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>Account details</strong>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setShowEdit(true)}
              >
                Edit Profile
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Full name</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      value={fullName}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Email</Form.Label>
                    <Form.Control value={email} readOnly />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Role</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      value={role}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Phone</Form.Label>
                    <Form.Control value={phone} readOnly />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>Recent activity</strong>
              <Badge bg="light" text="dark">
                0
              </Badge>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-muted">
                No recent activity
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* ---------- Edit Profile Modal ---------- */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    name="fullNameInput"
                    placeholder="e.g. Subin Bajracharya"
                    value={form.fullNameInput}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="emailInput"
                    type="email"
                    placeholder="name@example.com"
                    value={form.emailInput}
                    readOnly
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phoneInput"
                    placeholder="+61 ..."
                    value={form.phoneInput}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="roleInput"
                    value={form.roleInput}
                    onChange={onChange}
                    disabled
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    name="imageInput"
                    placeholder="https://..."
                    value={form.imageInput}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={handleOnSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Setting;
