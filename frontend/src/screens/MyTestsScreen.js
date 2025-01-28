import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyTestsScreen = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h1>My Tests</h1>
          {/* Add my tests listing functionality here */}
        </Col>
      </Row>
    </Container>
  );
};

export default MyTestsScreen; 