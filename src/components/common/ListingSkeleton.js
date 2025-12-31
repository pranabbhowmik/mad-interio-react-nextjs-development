import { Fragment } from "react";
import { Container, Row } from "reactstrap";

const FilterBroke = () => {
  return (
    <Fragment>
      <section className="error-section">
        <Container>
          <Row>
            <div className="col text-center not-found">
              <img
                src="/assets/images/inner-pages/5.png"
                className="img-fluid"
                id="error-img"
                alt=""
              />
              <h2>Oops! No Records Found</h2>
              <p className="font-roboto">
                We couldn’t find any listings that match your filters. Try
                adjusting your search or add a new property.
              </p>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default FilterBroke;
