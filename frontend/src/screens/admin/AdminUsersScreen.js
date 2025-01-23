import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser, updateUser } from '../../actions/userActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminUsersScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate, error: errorUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, navigate, userInfo, successDelete, successUpdate]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(selectedUser._id, editFormData));
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Container fluid className="py-4">
      <div className="admin-content-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">User Management</h1>
        </div>

        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : users?.length === 0 ? (
          <Message>No users found</Message>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <small className="text-muted">{user._id}</small>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <Badge bg="success">Admin</Badge>
                      ) : (
                        <Badge bg="primary">User</Badge>
                      )}
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="action-btn"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        {!user.isAdmin && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="action-btn"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="isAdmin"
                  label="Admin Privileges"
                  checked={editFormData.isAdmin}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <style>
        {`
          .admin-content-container {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .custom-table {
            margin-bottom: 0;
          }

          .custom-table th {
            background: #f8f9fa;
            color: #2193b0;
            font-weight: 600;
            border-bottom: 2px solid #e9ecef;
            white-space: nowrap;
          }

          .custom-table td {
            vertical-align: middle;
          }

          .action-btn {
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .action-btn:hover {
            transform: translateY(-2px);
          }

          .gap-2 {
            gap: 0.5rem;
          }

          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          @media (max-width: 768px) {
            .admin-content-container {
              padding: 1rem;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default AdminUsersScreen; 