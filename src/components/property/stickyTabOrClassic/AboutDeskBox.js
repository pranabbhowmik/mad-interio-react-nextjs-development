import React from "react";
import { Col, Row } from "reactstrap";

const AboutDeskBox = ({ about }) => {
  // Debugging line to check the content of 'about'
  return (
    <div className="about page-section" id="about">
      <Row>
        <Col sm="12">
          <p>{about}</p>
        </Col>
      </Row>
      <span id="service1"></span>
    </div>
  );
};

export default AboutDeskBox;
