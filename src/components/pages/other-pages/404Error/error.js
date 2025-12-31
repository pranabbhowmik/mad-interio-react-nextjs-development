"use client";
import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { useRouter } from "next/navigation";

const ErrorComponent = () => {
  const router = useRouter();

  return (
    <Fragment>
      <section className="error-section ">
        <Container>
          <Row>
            <div className="col text-center not-found">
              <img
                src="/assets/images/inner-pages/5.png"
                className="img-fluid"
                alt="No records illustration"
              />
              <h2>Oops! No Records Found</h2>
              <p className="font-roboto">
                It looks like there’s nothing to show here right now. Try
                adjusting your filters or add a new record.
              </p>
              <div className="btns">
                <button
                  onClick={() => router.back()}
                  className="btn btn-gradient"
                >
                  Go Back
                </button>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default ErrorComponent;
