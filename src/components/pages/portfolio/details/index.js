"use client";
import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import Img from "../../../../utils/BackgroundImageRatio";
import { useParams } from "next/navigation";
import Loader from "@/components/common/loader";
import ErrorComponent from "../../other-pages/404Error/error";
import Link from "next/link";

const BodyContent = () => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const detailsRightRef = useRef(null);
  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    // console.log("Params received in BodyContent component:", params);
    if (!params?.id) {
      console.error("No project ID found in URL parameters");
      setLoading(false);
      return;
    }
    fetch(`${SITE_URL}/projects/${params.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (
          result.status &&
          result.data &&
          Object.keys(result.data).length > 0
        ) {
          setProjectData(result.data);
        } else {
          console.error(
            "API returned unsuccessful status or empty data:",
            result.message || "No data"
          );
          setProjectData(null); // Explicitly set to null for invalid/empty responses
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project data:", err);
        setProjectData(null); // Explicitly set to null on error
        setLoading(false);
      });
  }, [params?.id]);

  useEffect(() => {
    if (!loading && projectData && detailsRightRef.current) {
      detailsRightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loading, projectData]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!projectData || Object.keys(projectData).length === 0)
    return (
      <div>
        <ErrorComponent />
      </div>
    );

  return (
    <section className="portfolio-details" ref={detailsRightRef}>
      <Container>
        <Row className="details-row">
          <Col lg="6" className="ratio_70">
            <div className="details-image grid-box">
              <div className="overlay">
                <div className="portfolio-image">
                  <div>
                    <Img
                      src={
                        projectData.projectImages[0]?.imageVideoUrl ||
                        "https://sheltos-react-sooty.vercel.app/assets/images/parallax/4.jpg"
                      }
                      className="bg-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="details-right">
              <div className="project-details">
                {projectData.businessName ? (
                  <a
                    target="_blank"
                    href={`/designer/${projectData.businessId}`}
                  >
                    <h3 style={{ color: "#d18d4b" }}>
                      {toTitleCase(projectData.businessName)}
                    </h3>
                  </a>
                ) : null}

                {projectData.projectName ? (
                  <div className="detail-container d-flex pt-0">
                    <div className="portfolio-left">
                      <h6 className="text-start">client :</h6>
                    </div>
                    <div className="portfolio-right">
                      <h6>{toTitleCase(projectData.projectName)}</h6>
                    </div>
                  </div>
                ) : null}
                {projectData.description ? (
                  <div className="detail-container d-flex">
                    <div className="portfolio-left">
                      <h6 className="text-start">about :</h6>
                    </div>
                    <div className="portfolio-right">
                      <h6>{projectData.description}</h6>
                    </div>
                  </div>
                ) : null}
                {projectData.data ? (
                  <div className="detail-container d-flex">
                    <div className="portfolio-left">
                      <h6 className="text-start">date :</h6>
                    </div>
                    <div className="portfolio-right">
                      <h6>{projectData.data}</h6>
                    </div>
                  </div>
                ) : null}
                {projectData.link ? (
                  <div className="detail-container d-flex">
                    <div className="portfolio-left">
                      <h6 className="text-start">City :</h6>
                    </div>
                    <div className="portfolio-right">
                      <h6>{projectData.link}</h6>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
        <Gallery>
          <Row className="portfolio-section zoom-gallery-multiple gy-md-4 gy-3 ratio_square">
            {projectData.projectImages.map((image, i) => (
              <Col lg="3" sm="6" className="grid-item" key={i}>
                <div className="grid-box">
                  <div className="overlay">
                    <div className="portfolio-image">
                      <Item
                        original={image.imageVideoUrl}
                        width="1200"
                        height="800"
                      >
                        {({ ref, open }) => (
                          <a ref={ref} onClick={open}>
                            <Img src={image.imageVideoUrl} className="bg-img" />
                          </a>
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Gallery>
      </Container>
    </section>
  );
};

export default BodyContent;
