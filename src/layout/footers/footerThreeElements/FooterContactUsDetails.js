import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";
import { Logo } from "../../../components/elements/Logo";

const FooterContactUsDetails = () => {
  return (
    <Col xl="3">
      <div className="footer-details text-center">
        <Logo />

        <ul className="icon-list">
          <li>
            <Link href="#">
              <i className="fa-brands fa-facebook fa-lg"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-linkedin fa-lg"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fa-brands fa-x-twitter fa-lg"></i>
            </Link>
          </li>
        </ul>
      </div>
    </Col>
  );
};

export default FooterContactUsDetails;
