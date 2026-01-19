"use client";
import React, { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import ContentLoader from "react-content-loader";
import Img from "@/utils/BackgroundImageRatio";

const ProjectDeskBox = ({ projects }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // simulate loading
    return () => clearTimeout(timer);
  }, []);
  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const projectData = projects || [];

  const descriptionStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  if (loading) {
    return (
      <div className="desc-box">
        <div className="page-section feature-dec">
          <h4 className="content-title">Projects</h4>
          <ContentLoader className="skeleton-svg">
            <rect x="0" y="0" width="100%" height="200" />
            <rect x="0" y="220" width="60%" height="20" />
            <rect x="0" y="250" width="90%" height="15" />
          </ContentLoader>
        </div>
      </div>
    );
  }

  if (projectData.length === 0) {
    return null;
  }

  return (
    <div className="desc-box" id="gallery">
      <div className="page-section feature-dec">
        <h4 className="content-title">Projects</h4>
        <Container className="portfolio-section portfolio-grid" id="project">
          <Row>
            <Col sm="12">
              <Row className="column-sm grid ratio2_3 zoom-gallery-multiple">
                <Gallery>
                  {projectData.map((project, index) => {
                    const imageUrl =
                      project.projectImages?.[0]?.imageVideoUrl?.trim() ||
                      "/assets/images/no-image/no-image-available.jpg"; //
                    const imageCount = project.projectImages?.length || 0;

                    return (
                      <Col
                        xs="12"
                        sm="6"
                        lg="4"
                        className="grid-item"
                        key={project.id || index}
                      >
                        <a
                          href={`/project/${project.id}`}
                          target="_blank"
                          legacyBehavior
                        >
                          <div className="grid-box">
                            <div className="overlay">
                              <div className="portfolio-image">
                                <Item
                                  original={imageUrl}
                                  width="1000"
                                  height="600"
                                >
                                  {({ ref, open }) => (
                                    <Img
                                      src={imageUrl}
                                      alt={project.projectName || "Project"}
                                      className="bg-img"
                                    />
                                  )}
                                </Item>
                              </div>
                            </div>

                            <div className="property-text">
                              <h3 className="singel-line">
                                <a>
                                  {toTitleCase(
                                    project.projectName || "Untitled Project",
                                  )}
                                </a>
                              </h3>
                            </div>
                          </div>
                        </a>
                      </Col>
                    );
                  })}
                </Gallery>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProjectDeskBox;
