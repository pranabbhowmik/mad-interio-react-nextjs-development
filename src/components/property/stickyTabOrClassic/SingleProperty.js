// SinglePropertySection.js
import React from "react";
import { Col } from "reactstrap";
import useStickyBar from "../../../utils/useStickyBar";
import useActiveLinkInStickyBar from "../../../utils/useActiveLinkInStickyBar";
import DetailsDeskBox from "./DetailsDeskBox";
import FeatureDeskBox from "./FeatureDeskBox";
import SearchBarDeskBox from "./SearchBarDeskBox";
import ReviewsDeskBox from "./ReviewsDeskBox";
import ProjectDeskBox from "./ProjectDeskBox";
import ErrorPage from "@/app/(Mainbody)/pages/other-pages/ErrorPage/page";
import GalleryDeskBox from "./GalleryDeskBox";

const SinglePropertySection = ({ property }) => {
  const fix = useStickyBar();
  useActiveLinkInStickyBar();

  // FIRST: Check if property is still loading (null)
  if (property === null) {
    // Return loading skeleton/placeholder instead of ErrorPage
    return (
      <Col xl="9" lg="8">
        <div className="description-section">
          <div className="description-details">
            {/* Loading skeleton */}
            <div className="desc-box" style={{ minHeight: "200px" }}>
              <div className="page-section">
                <div
                  className="skeleton-box"
                  style={{
                    width: "100%",
                    height: "20px",
                    marginBottom: "20px",
                  }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "80%", height: "100px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  // SECOND: Check for valid property only after loading is done
  if (!property || !property.id || !property.businessName) {
    return <ErrorPage />;
  }

  return (
    <Col xl="9" lg="8">
      <div className="description-section">
        <div className="description-details">
          <SearchBarDeskBox fix={fix} about={property} />
          <FeatureDeskBox services={property?.services} />
          <ProjectDeskBox projects={property?.projects} />
          <DetailsDeskBox details={property} />
          {/* <GalleryDeskBox gallery={property} /> */}
          {/* <ReviewsDeskBox reviews={property?.reviews} /> */}
        </div>
      </div>
    </Col>
  );
};

export default SinglePropertySection;
