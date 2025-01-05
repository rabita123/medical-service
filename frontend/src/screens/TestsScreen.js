import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { listTests } from '../actions/testActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const TestsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const testList = useSelector((state) => state.testList);
  const { loading, error, tests } = testList;

  useEffect(() => {
    dispatch(listTests());
  }, [dispatch]);

  const filteredTests = tests?.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || test.category_id?._id === selectedCategory)
  ) || [];

  // Get unique categories
  const uniqueCategories = Array.from(new Set(
    tests?.filter(test => test.category_id)
      .map(test => ({
        id: test.category_id._id,
        name: test.category_id.category_name
      }))
      .filter(Boolean)
      .map(JSON.stringify)
  )).map(JSON.parse);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Health Tests</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredTests.length === 0 ? (
        <Message>No tests found</Message>
      ) : (
        <Row>
          {filteredTests.map((test) => (
            <Col key={test._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 test-card">
                {test.image && (
                  <Card.Img
                    variant="top"
                    src={test.image}
                    alt={test.name}
                    className="test-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-test.jpg';
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title className="test-title">{test.name}</Card.Title>
                  <Card.Text className="test-description">
                    {test.description}
                  </Card.Text>
                  <Card.Text className="test-category">
                    Category: {test.category_id?.category_name || 'General'}
                  </Card.Text>
                  <Card.Text className="test-price">
                    Price: ₹{test.price}
                  </Card.Text>
                  <Card.Text className="test-duration">
                    Duration: {test.duration} minutes
                  </Card.Text>
                  <Card.Text className="test-report">
                    Report Time: {test.report_time} hours
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100 book-btn"
                    onClick={() => history.push(`/test/${test._id}`)}
                    disabled={!test.is_available}
                  >
                    {test.is_available ? 'Book Now' : 'Currently Unavailable'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>
        {`
          .test-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .test-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }

          .test-image {
            height: 200px;
            object-fit: cover;
          }

          .test-title {
            color: #2193b0;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .test-description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .test-category {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          .test-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #28a745;
            margin-bottom: 0.5rem;
          }

          .test-duration, .test-report {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          .book-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            padding: 0.75rem;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
          }

          .book-btn:hover:not(:disabled) {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
          }

          .book-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          .search-input, .category-select {
            border-radius: 25px;
            padding: 0.75rem 1.5rem;
            border: 1px solid #ddd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            margin-bottom: 1rem;
          }

          .search-input:focus, .category-select:focus {
            box-shadow: 0 4px 6px rgba(33, 147, 176, 0.2);
            border-color: #2193b0;
          }
        `}
      </style>
    </Container>
  );
};

export default TestsScreen; 