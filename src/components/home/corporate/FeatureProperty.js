"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { feature3 } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import NoSsr from "@/utils/NoSsr";
import formatPrice from "@/utils/mad-interio/formatters"; // ✅ Ensure path is correct

const FeaturePropertySection = () => {
  const [properties, setProperties] = useState([]);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SITE_URL}/HomePageContent`);
        const result = await res.json();
        const pageData = result?.data?.pageData || [];

        const formattedData = pageData.map((item) => {
          const priceRange = item.priceLimits?.[0] || {};
          const minPrice = priceRange.minPrice || 0;
          const maxPrice = priceRange.maxPrice || 0;

          const lastType =
            item.priceLimits?.[item.priceLimits.length - 1]?.propertyType ||
            "Property";

          return {
            id: item.id || "",
            img: item.imageUrls?.[0] || "",
            title: item.businessName,
            details: item.professionType,
            moreDetails: item.sortDiscription,
            services: item.services?.length || 0,
            city: item.city || "",
            minPrice,
            maxPrice,
            propertyType: lastType,
          };
        });

        setProperties(formattedData);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="feature-section ratio_landscape pt-0">
      <Container>
        <Row>
          <Col>
            <div className="title-2 text-start">
              <h2>Popular Searches</h2>
              <p>Discover trending interior design searches</p>
            </div>
            <Gallery>
              <NoSsr>
                <Slider
                  className="feature-3 classic-feature arrow-image zoom-gallery"
                  {...feature3}
                >
                  {properties.length > 0 ? (
                    properties.map((data, i) => (
                      <div
                        data-title="classic-image1"
                        className="feature-style"
                        key={i}
                      >
                        <div className="feature-wrap">
                          <Row>
                            <Col xl="6" lg="5">
                              <div className="feature-image">
                                <div className="zoom">
                                  <Item
                                    original={data.img}
                                    width="1000"
                                    height="600"
                                    key={i}
                                  >
                                    {({ ref, open }) => <span>+</span>}
                                  </Item>
                                  <Img
                                    src={data.img}
                                    className="bg-img"
                                    style={{ borderRadius: "30px" }}
                                  />
                                </div>

                                <span className="label label-solid label-lg label-flat">
                                  Featured
                                </span>
                              </div>
                            </Col>
                            <Col xl="6" lg="7">
                              <div className="feature-content">
                                <div className="details">
                                  <h3
                                    style={{
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    <Link href={`/designer/${data.id}`}>
                                      {data.title}
                                    </Link>
                                  </h3>

                                  <span>{data.details}</span>
                                  <p
                                    className="font-roboto"
                                    style={{
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {data.moreDetails}
                                  </p>
                                </div>
                                <ul className="detail-list">
                                  <li>
                                    <div className="d-flex">
                                      <span className="label label-light label-flat label-lg">
                                        {data.services}
                                      </span>
                                      <h6>Services</h6>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="d-flex">
                                      <span className="label label-light label-flat label-lg">
                                        5*
                                      </span>
                                      <h6>Ratings</h6>
                                    </div>
                                  </li>
                                  <li>
                                    <span className="label label-light label-flat label-lg">
                                      {data.city}
                                    </span>
                                  </li>
                                </ul>
                                <ul className="feature-price">
                                  {/* PRICE — only if exists */}
                                  {(data.minPrice > 0 || data.maxPrice > 0) && (
                                    <li>
                                      <h3>
                                        ₹{formatPrice(data.minPrice)} -{" "}
                                        {formatPrice(data.maxPrice)}
                                      </h3>
                                      <h6>{data.propertyType}</h6>
                                    </li>
                                  )}

                                  {/* BUTTON — always visible */}
                                  <li>
                                    <Link href={`/designer/${data.id}`}>
                                      <button
                                        type="button"
                                        className="btn btn-solid"
                                      >
                                        View Details →
                                      </button>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ padding: "20px" }}>Loading...</p>
                  )}
                </Slider>
              </NoSsr>
            </Gallery>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturePropertySection;
