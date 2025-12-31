import React, { Fragment } from "react";
import { ChevronRight } from "react-feather";
import { Col } from "reactstrap";

const FooterLink = ({ value, isActive, setIsActive, liteFooter }) => {
  return (
    <Col
      xl={value.title === "Useful Links" ? "3" : "4"}
      md="3"
      className={value.title === "Tag" ? "order-lg" : ""}
      id="footer-heading"
    >
      <div className="footer-links footer-left-space">
        <h5
          className="footer-title"
          onClick={(e) => {
            e.preventDefault();
            setIsActive(value.title);
            isActive === value.title && setIsActive();
          }}
        >
          {value.title}
          <span className="according-menu">
            <i className="fas fa-chevron-down"></i>
          </span>
        </h5>
        <ul
          className={`footer-content ${
            isActive === value.title ? "d-block" : "d-none d-md-block"
          }`}
        >
          {value.children.map((value, i) => (
            <Fragment key={i}>
              {liteFooter === i ? (
                ""
              ) : (
                <li>
                  <a href={value.link}>
                    {liteFooter && <ChevronRight />}
                    {value.title}
                  </a>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </Col>
  );
};

export default FooterLink;
