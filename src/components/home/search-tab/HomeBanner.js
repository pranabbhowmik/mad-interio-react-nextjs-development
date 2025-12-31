import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container } from "reactstrap";
import { DropdownInputFields } from "../../elements/DropdownInputFields";
import Dots from "./Dots";
import LandingSection from "../landing-section/leading";

const HomeBannerSection = () => {
  const [filterValues, setFilterValues] = useState({});
  const dispatch = useDispatch();
  const { propertyStatus } = useSelector((state) => state.inputsReducer);
  useEffect(() => {
    dispatch({ type: "propertyStatus", payload: "For Sell" });
  }, []);

  return (
    <section className="layout-home8 bg-img-2 ratio_landscape">
      <Container className="p-0">
        <div className="row m-0">
          <Col xl="7" lg="8">
            <div className="home-left-content">
              <div className="home-content">
                <h1 className="mt-0">
                  You&apos;re local Real estate
                  <br />
                  professionals
                </h1>
                <h6 className="font-roboto mb-0">
                  Residences can be classified by and connected to residences.
                  Different types of housing can be use same physical type.
                </h6>
              </div>
              <div className="search-with-tab">
                <div className="tab-content" id="home-tabContent">
                  <div className="tab-pane fade show active active" id="sell">
                    <div className="row review-form gx-3">
                      <DropdownInputFields
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        lg={4}
                        sm={6}
                        start={0}
                        end={6}
                      />
                      <Col lg="4" md="6">
                        <Link href="/designers/" className="btn btn-gradient">
                          Search
                        </Link>
                      </Col>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xl="5" lg="4">
            <div className="home-right-image">
              <video
                autoPlay
                muted
                loop
                className="bg-img"
                src="/assets/video/backgroundvideo.mp4"
              ></video>
            </div>
          </Col>
        </div>
      </Container>
    </section>
  );
};

export default HomeBannerSection;
