"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/navbar";
import FooterOne from "@/layout/footers/FooterOne";
import Hero from "@/components/hero/hero";
import { Col, Container, Row } from "reactstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import Img from "../../../../utils/BackgroundImageRatio";
import Head from "next/head";

const GalleryPage = () => {
  const { id } = useParams(); // 👈 get id from URL
  const [projectImages, setProjectImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `https://api.madservices.co.in/api/professionals/gallery/${id}`
        );

        const data = await res.json();

        // API may return galleryImages OR projectImages
        const images = data;

        setProjectImages(images);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [id]);

  return (
    <Fragment>
      <Head>
        <title>MAD INTERIO | Gallery</title>
        <meta
          name="description"
          content="Explore interior design gallery images"
        />
      </Head>

      <Navbar />

      <Hero
        heading="Gallery"
        subHeading="Explore beautiful interior design works"
        image="/assets/images/listing/listing-hero.webp"
      />

      <Container className="mt-5 mb-5">
        {loading ? (
          <p className="text-center">Loading gallery...</p>
        ) : projectImages.length === 0 ? (
          <p className="text-center">No images found</p>
        ) : (
          <Gallery>
            <Row className="portfolio-section zoom-gallery-multiple gy-md-4 gy-3 ratio_square">
              {projectImages.map((image, i) => (
                <Col lg="3" sm="6" className="grid-item" key={i}>
                  <div className="grid-box">
                    <div className="overlay">
                      <div className="portfolio-image">
                        <Item
                          original={image.imageVideoUrl}
                          thumbnail={image.imageVideoUrl}
                          width="1200"
                          height="800"
                        >
                          {({ ref, open }) => (
                            <a ref={ref} onClick={open}>
                              <Img
                                src={image.imageVideoUrl}
                                className="bg-img"
                                alt={`Gallery ${i + 1}`}
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
        )}
      </Container>

      <FooterOne />
    </Fragment>
  );
};

export default GalleryPage;
