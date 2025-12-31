import React from "react";
import { Col, Row } from "reactstrap";

const FeatureDeskBox = ({ services }) => {
  // Add this: Hide entire component if no services data
  if (!services || !Array.isArray(services) || services.length === 0) {
    return null;
  }

  return (
    <div className="desc-box" id="services">
      <div className="page-section services-dec">
        <h4 className="content-title">Services</h4>
        <Row className="single-feature">
          <span></span>
          {services.map((service, index) => (
            <Col key={index} xxl="3" xl="4" sm="6">
              <ul>
                <li>
                  <i className="fas fa-square-check"></i>
                  <span className="servicetext">{service}</span>
                </li>
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeatureDeskBox;
