import React from "react";
import { Col, Row } from "reactstrap";

const AboutDeskBox = ({ about }) => {
  // Debugging line to check the content of 'about'
  return (
    <div className="about page-section" id="services">
      <Row>
        <Col sm="12">
          <p>{about}</p>
        </Col>
      </Row>
    </div>
  );
};

export default AboutDeskBox;
