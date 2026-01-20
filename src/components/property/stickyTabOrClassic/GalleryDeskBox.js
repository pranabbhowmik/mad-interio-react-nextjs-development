import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Row } from "reactstrap";
import Img from "@/utils/BackgroundImageRatio";

const GalleryDeskBox = ({ gallery }) => {
  const galleryImages = gallery?.galleryImages || [];
  const id = gallery?.id;
  const galleryTitle = gallery?.businessName;
  // Safety check
  if (!galleryImages.length) return null;

  const displayedImages = galleryImages.slice(0, 3);

  return (
    <div className="desc-box px-2">
      <Gallery
        options={{
          bgOpacity: 0.9,
        }}
        uiElements={[
          {
            name: "custom-title",
            order: 9,
            isButton: false,
            appendTo: "wrapper",
            html: `<h2 class="pswp-custom-title">${galleryTitle}</h2>`,
          },
        ]}
      >
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
          <a
            href={`/gallery/${id}?title=${encodeURIComponent(galleryTitle)}`}
            target="_blank"
          >
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
