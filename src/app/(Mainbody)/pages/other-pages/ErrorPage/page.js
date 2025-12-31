"use client";
import React, { Fragment, use } from "react";
import { Container, Row } from "reactstrap";
import Link from "next/link";
import Navbar from "@/components/common/navbar";
import FooterOne from "@/layout/footers/FooterOne";

const ErrorPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Fragment>
        <Navbar />
        <section className="error-section small-section">
          <Container>
            <Row>
              <div className="col text-center not-found">
                <img
                  src="/assets/images/inner-pages/2.svg"
                  className="img-fluid"
                  alt=""
                />
                <h2>Whoops! something went wrong ?</h2>
                <p className="font-roboto">
                  we are sorry but the page you are looking for doesn&apos;t
                  exist or has been removed. please check or search again.
                </p>
                <div className="btns">
                  <button onClick={handleGoBack} className="btn btn-gradient">
                    go back
                  </button>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <FooterOne />
      </Fragment>
    </>
  );
};

export default ErrorPage;
