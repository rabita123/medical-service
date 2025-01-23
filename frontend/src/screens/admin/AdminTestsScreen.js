import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listTests, createTest, updateTest, deleteTest } from '../../actions/testActions';
import { listTestCategories } from '../../actions/testCategoryActions';
import { TEST_CREATE_RESET, TEST_UPDATE_RESET, TEST_DELETE_RESET } from '../../constants/testConstants';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminTestsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [reportTime, setReportTime] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [categoryId, setCategoryId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testList = useSelector((state) => state.testList);
  const { loading, error, tests } = testList;

  const testCreate = useSelector((state) => state.testCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = testCreate;

  const testUpdate = useSelector((state) => state.testUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = testUpdate;

  const testDelete = useSelector((state) => state.testDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = testDelete;

  const testCategories = useSelector((state) => state.testCategories);
  const { loading: loadingCategories, error: errorCategories, categories } = testCategories;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listTestCategories());
      
      if (successCreate || successUpdate || successDelete) {
        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
        dispatch({ type: TEST_CREATE_RESET });
        dispatch({ type: TEST_UPDATE_RESET });
        dispatch({ type: TEST_DELETE_RESET });
        dispatch(listTests());
      } else {
        dispatch(listTests());
      }
    }
  }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (showAddModal || showEditModal) {
      dispatch(listTestCategories());
    }
  }, [dispatch, showAddModal, showEditModal]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setDuration('');
    setReportTime('');
    setIsAvailable(true);
    setCategoryId('');
    setSelectedTest(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEdit = (test) => {
    setSelectedTest(test);
    setName(test.name);
    setDescription(test.description);
    setPrice(test.price);
    setDuration(test.duration);
    setReportTime(test.report_time);
    setIsAvailable(test.is_available);
    setCategoryId(test.category_id?._id || '');
    setShowEditModal(true);
  };

  const handleDelete = (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      dispatch(deleteTest(testId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    
    const testData = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      report_time: Number(reportTime),
      is_available: isAvailable,
      category_name: selectedCategory ? selectedCategory.category_name : undefined,
    };

    if (showEditModal && selectedTest) {
      dispatch(updateTest(selectedTest._id, testData));
    } else {
      dispatch(createTest(testData));
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Tests</h1>
        <Button className="add-btn" onClick={handleAdd}>
          Add New Test
        </Button>
      </div>

      {(loadingCreate || loadingUpdate || loadingDelete) && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests?.map((test) => (
                <tr key={test._id}>
                  <td>{test.name}</td>
                  <td>{test.category_id?.category_name || 'General'}</td>
                  <td>₹{test.price}</td>
                  <td>{test.duration} minutes</td>
                  <td>
                    <span className={`status-badge ${test.is_available ? 'available' : 'unavailable'}`}>
                      {test.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2 action-btn edit-btn"
                      onClick={() => handleEdit(test)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(test._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add/Edit Test Modal */}
      <Modal 
        show={showAddModal || showEditModal} 
        onHide={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          resetForm();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{showEditModal ? 'Edit Test' : 'Add New Test'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingCategories ? (
            <Loader />
          ) : errorCategories ? (
            <Message variant="danger">{errorCategories}</Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Test Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </Form.Control>
                {categories && categories.length === 0 && (
                  <Form.Text className="text-danger">
                    No categories available. Please add categories first.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Report Time (hours)</Form.Label>
                <Form.Control
                  type="number"
                  value={reportTime}
                  onChange={(e) => setReportTime(e.target.value)}
                  required
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="is-available"
                  label="Available"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" className="submit-btn">
                  {showEditModal ? 'Update Test' : 'Add Test'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <style>
        {`
          .add-btn, .submit-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
          }

          .add-btn:hover, .submit-btn:hover {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
          }

          .table {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .table th {
            background: #f8f9fa;
            color: #2193b0;
            font-weight: 600;
            border-bottom: 2px solid #e9ecef;
          }

          .action-btn {
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .edit-btn:hover {
            background-color: #2193b0;
            border-color: #2193b0;
            color: white;
          }

          .delete-btn:hover {
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
          }

          .status-badge {
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }

          .status-badge.available {
            background-color: rgba(40, 167, 69, 0.1);
            color: #28a745;
          }

          .status-badge.unavailable {
            background-color: rgba(220, 53, 69, 0.1);
            color: #dc3545;
          }

          .form-control {
            border-radius: 8px;
            padding: 0.75rem;
            border: 1px solid #ddd;
          }

          .form-control:focus {
            border-color: #2193b0;
            box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
          }
        `}
      </style>
    </Container>
  );
};

export default AdminTestsScreen; 