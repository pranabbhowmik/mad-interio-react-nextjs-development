import React, { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Row } from "reactstrap";
import Img from "@/utils/BackgroundImageRatio";

const GalleryDeskBox = ({ gallery }) => {
  const galleryImages = gallery?.galleryImages || [];
  const id = gallery?.id;
  console.log("Gallery ID:", id);
  // Safety check
  if (!galleryImages.length) return null;

  const [isMobile, setIsMobile] = useState(false);
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobileBreakpoint = 768; // Bootstrap md breakpoint
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setDisplayedImages(
      isMobile ? galleryImages.slice(0, 4) : galleryImages.slice(0, 3)
    );
  }, [isMobile, galleryImages]);

  return (
    <div className="desc-box px-2" id="gallery">
      <Gallery>
        <Row className="portfolio-section zoom-gallery-multiple gy-3 px-2 px-md-3 py-2 py-md-3">
          <h4 className="content-title mb-1">Gallery</h4>
          {displayedImages.map((image, i) => (
            <Col lg="4" md="4" sm="6" xs="6" className="grid-item p-2" key={i}>
              <div className="grid-box">
                <div className="overlay">
                  <div className="portfolio-image">
                    <Item
                      original={image.imageVideoUrl}
                      width={1000}
                      height={800}
                    >
                      {({ ref, open }) => (
                        <a ref={ref} onClick={open}>
                          <Img
                            src={image.imageVideoUrl}
                            className="bg-img"
                            alt={`Gallery image ${i + 1}`}
                          />
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
      <Row className="gy-3 px-2 px-md-3 py-2 py-md-3">
        <Col xs="12" className="text-center">
          <a target="_blank" href={`/gallery/${id}`}>
            <button type="button" className="btn btn-solid">
              View More →
            </button>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default GalleryDeskBox;
