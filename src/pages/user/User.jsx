import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import AddNewUserForm from "../components/forms/AddNewUserForm";
import { CustomModal } from "../../components/customModal/CustomModal";
import { getAllUserAction } from "../../features/users/userActions";

const User = () => {
  const { users } = useSelector((store) => store.userStore);
  const dispatch = useDispatch();

  // const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);
  return (
    <Container>
      <h4 className="mt-2 text-center">User Dashboard</h4>

      <div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New User
        </Button>

        {showModal && (
          <CustomModal
            title="Add New User"
            show={showModal}
            onHide={() => setShowModal(false)}
          >
            {/*modal to add new user to be done completed by deep  */}
          </CustomModal>
        )}
      </div>
      <Row className=" m-2">
        <Table className="text-center m-3 pe-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>

                  <td>{u?.username}</td>
                  <td>{u?.email}</td>
                  <td>{u?.role}</td>

                  {/* <td>
                    <Form.Check
                      type="switch"
                      id={`status-switch-${u._id}`}
                      checked={u.role === "admin"}
                      onChange={(e) => {
                        const updatedRole = e.target.checked
                          ? "admin"
                          : "student";

                        let confirmMessage = "";
                        if (updatedRole === "admin") {
                          confirmMessage = `Do you want to provide admin access to "${u.fullName}"?`;
                        } else {
                          confirmMessage = `Do you want to revoke the admin access from "${u.fullName}"?`;
                        }

                        if (window.confirm(confirmMessage)) {
                          dispatch(
                            updateUserRoleAction({
                              _id: u._id,
                              // role: e.target.checked ? "admin" : "student",
                              role: updatedRole,
                            })
                          );
                        }
                      }}
                    />
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Delete this user? This action is irreversible!!!"
                          )
                        ) {
                          dispatch(removeUserAction(u._id));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default User;
