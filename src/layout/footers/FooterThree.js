"use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FooterData } from "../../data/footerData";
import FooterLink from "./elements/FooterLink";
import FooterContactUsDetails from "./footerThreeElements/FooterContactUsDetails";
import SubFooterTwo from "./elements/SubFooterTwo";
import CtaSection from "@/components/common/cta";
import { usePathname } from "next/navigation";

const FooterThree = () => {
  const [isActive, setIsActive] = useState();
  const pathname = usePathname();

  return (
    <footer>
      {/* ✅ Hide CTA only on contact page and mobile/tablet */}
      {pathname !== "/contact" && (
        <div id="footer-cta-section">
          <CtaSection />
        </div>
      )}

      <div className="footer footer-bg">
        <Container>
          <Row>
            <FooterContactUsDetails />
            <Col xl="9">
              <Row>
                <FooterLink
                  value={FooterData.usefulLinks}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
                <FooterLink
                  value={FooterData.feature}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />

                <Col lg="3" xl="4">
                  <div className="footer-links" id="footer-about">
                    <h5
                      className={`footer-title ${
                        isActive === "subscribe" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsActive("subscribe");
                        isActive === "subscribe" && setIsActive();
                      }}
                    >
                      About
                      <span className="according-menu">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </h5>
                    <div
                      className={`footer-content ${
                        isActive === "subscribe"
                          ? "d-block"
                          : "d-none d-md-block"
                      }`}
                    >
                      <p className="mb-3">
                        We connects homeowners and businesses with verified
                        interior designers, to transform spaces effortlessly
                      </p>

                      {/* Phone */}
                      <div className="footer-contact-item">
                        <i className="fa-solid fa-phone footer-icon"></i>
                        <a href="tel:+917588097600">
                          <span>+91 95897 72585</span>
                        </a>
                      </div>

                      {/* Email */}
                      <div className="footer-contact-item">
                        <i className="fas fa-envelope footer-icon"></i>
                        <a href="mailto:connect@madinterio.com">
                          <span>connect@madinterio.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <SubFooterTwo />
    </footer>
  );
};

export default FooterThree;
