import React from "react";
import { Col, Container, Row } from "reactstrap";

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <Container>
        <Row>
          <Col>
            <div className="title-2 text-start">
              <h2>Why Choose Us</h2>
              <p>Authentic Connections. Exceptional Designs.</p>
              <a href="/designers">
                <button className="btn-solid">Start Your Search →</button>
              </a>
            </div>
            <Row className="feature-wrap gy-4">
              <Col lg="3" md="6" sm="12" className="mb-4 mb-lg-0">
                <div className="feature-box">
                  <div className="feature-image">
                    <img
                      src="assets/images/feature/verified-interior-designers-profiles.webp"
                      className="img-fluid"
                      alt="Verified interior designers with trusted client ratings"
                      Imagedescription="We feature verified interior designers with authentic client ratings and trusted reviews"
                      loading="lazy"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="feature-label">
                    Verified Profiles{" "}
                    <span className="line-break">
                      <br />
                    </span>{" "}
                    And Ratings
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6" sm="12" className="mb-4 mb-lg-0">
                <div className="feature-box" id="second">
                  <div className="feature-image">
                    <img
                      src="assets/images/feature/local-interior-designer-recommendations.webp"
                      className="img-fluid"
                      alt="Curated Portfolios & Real Client Reviews"
                      Imagedescription="We feature verified interior designers with authentic client ratings and trusted reviews"
                      loading="lazy"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="feature-label">
                    Location-specific{" "}
                    <span className="line-break">
                      <br />
                    </span>{" "}
                    recommendations
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6" sm="12" className="mb-4 mb-lg-0">
                <div className="feature-box">
                  <div className="feature-image">
                    <img
                      src="assets/images/feature/interior-designer-portfolios-reviews.webp"
                      className="img-fluid"
                      alt="Get personalized interior designer recommendations near you"
                      Imagedescription="Find interior designers near your location with our smart recommendation system."
                      loading="lazy"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="feature-label">
                    Curated portfolios &{" "}
                    <span className="line-break">
                      <br />
                    </span>{" "}
                    real client reviews
                  </div>
                </div>
              </Col>
              <Col lg="3" md="6" sm="12" className="mb-4 mb-lg-0">
                <div className="feature-box" id="fourth">
                  <div className="feature-image">
                    <img
                      src="assets/images/feature/interior-design-communication-tools.webp"
                      className="img-fluid"
                      alt="Explore curated portfolios with real client feedback"
                      Imagedescription="View real client reviews and curated design portfolios to make the right choice."
                      loading="lazy"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="feature-label">
                    Hassle-free{" "}
                    <span className="line-break">
                      <br />
                    </span>{" "}
                    communication tools
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeatureSection;
