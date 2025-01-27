import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getTestDetails, bookTest } from '../actions/testActions';
import { TEST_BOOK_RESET } from '../constants/testConstants';

const TestBookingScreen = ({ match, history }) => {
  const testId = match.params.id;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dispatch = useDispatch();

  const testDetails = useSelector((state) => state.testDetails);
  const { loading, error, test } = testDetails;

  const testBook = useSelector((state) => state.testBook);
  const { success: successBook, error: errorBook } = testBook;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (successBook) {
      history.push('/my-test-bookings');
      dispatch({ type: TEST_BOOK_RESET });
    } else {
      if (!test._id || test._id !== testId) {
        dispatch(getTestDetails(testId));
      }
    }
  }, [dispatch, history, userInfo, test, testId, successBook]);

  const bookHandler = () => {
    dispatch(
      bookTest({
        testId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{test.name}</h2>
                  <p>{test.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${test.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {test.is_available ? 'Available' : 'Not Available'}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${test.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {test.is_available ? 'Available' : 'Not Available'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group controlId='date'>
                      <Form.Label>Select Date</Form.Label>
                      <Form.Control
                        type='date'
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group controlId='time'>
                      <Form.Label>Select Time</Form.Label>
                      <Form.Control
                        type='time'
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {errorBook && (
                      <Message variant='danger'>{errorBook}</Message>
                    )}
                    <Button
                      onClick={bookHandler}
                      className='btn-block'
                      type='button'
                      disabled={!test.is_available || !selectedDate || !selectedTime}
                    >
                      Book Appointment
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(TestBookingScreen); 