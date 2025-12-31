import React from "react";
import { Container, Row } from "reactstrap";

const AboutUsSection = () => {
  return (
    <section className="about-main">
      <Container>
        <Row>
          <div className="col">
            {/* <div className="title-2">
              <h2>About Us</h2>
             
            </div> */}
            <div className="user-about">
              <Row>
                <div className="col-xl-7 col-lg-5">
                  <div className="about-image">
                    <div className="img-box side-left">
                      <img
                        src="assets/images/about/aboutus1.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <div className="side-effect"></div>
                    </div>
                    <div className="img-box img-abs side-right">
                      <img
                        src="assets/images/about/aboutus2.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <div className="side-effect"></div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-7">
                  <div className="about-content">
                    <div className="title-2">
                      <h2>About Us</h2>
                      {/* <p className="font-roboto">
                Elegant retreat in Coral Gables setting. This home provides
                entertaining spaces with kitchen opening
              </p> */}
                    </div>
                    <p className="font-roboto">
                      MAD INTERIO is a premier platform connecting homeowners
                      and businesses with top interior designers and 3D artists.
                      We make it effortless to discover, explore portfolios, and
                      collaborate with trusted professionals, helping you create
                      beautiful, personalized, and inspiring spaces that reflect
                      your vision and lifestyle.
                    </p>
                    <br />
                    <p className="font-roboto">
                      Our platform ensures transparency, quality, and seamless
                      communication at every step. We carefully vet designers
                      and 3D artists so you can connect with experts who
                      understand your style and project needs.
                    </p>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUsSection;
