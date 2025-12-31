// DetailsDeskBox.js
import React from "react";
import { Col, Row } from "reactstrap";
import formatPrice from "@/utils/mad-interio/formatters";

const DetailsDeskBox = ({ details }) => {
  // Add this: Hide entire component if no meaningful details
  const hasDetails =
    details?.businessName ||
    details?.city ||
    details?.phoneNumber ||
    details?.professionType ||
    details?.address ||
    details?.email ||
    (details?.priceLimits && details.priceLimits.length > 0);
  if (!details || !hasDetails) {
    return null;
  }

  const businessName = details?.businessName;
  const city = details?.city;
  const phone = details?.phoneNumber;
  const email = details?.email;
  const professionType = details?.professionType;
  const address = details?.address;
  const priceLimits = details?.priceLimits || [];

  return (
    <div className="desc-box" id="details">
      <div className="page-section">
        <h4 className="content-title">Business Details</h4>

        <Row>
          <Col md="6" xl="6">
            <ul className="property-list-details">
              {businessName && (
                <li>
                  <span>Business Name:</span> {businessName}
                </li>
              )}

              {city && (
                <li>
                  <span>City:</span> {city}
                </li>
              )}

              {phone && (
                <li>
                  <span>Phone:</span> {phone}
                </li>
              )}
            </ul>
          </Col>

          <Col md="6" xl="6">
            <ul className="property-list-details">
              {professionType && (
                <li>
                  <span>Profession Type:</span> {professionType}
                </li>
              )}

              {address && (
                <li>
                  <span>Location:</span> {address}
                </li>
              )}

              {email && (
                <li>
                  <span>Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </Col>
        </Row>

        {Array.isArray(priceLimits) && priceLimits.length > 0 && (
          <>
            <h4 className="content-title mt-4">Price Range</h4>
            <Row>
              {priceLimits.map((price, index) => {
                if (!price?.propertyType) return null;

                return (
                  <Col md="6" xl="6" key={index}>
                    <ul className="property-list-details margin-bottom-0">
                      <li>
                        <span>{price.propertyType}:</span>
                        {price.minPrice && price.maxPrice && (
                          <>
                            {" "}
                            ₹{formatPrice(price.minPrice)} - ₹
                            {formatPrice(price.maxPrice)}
                          </>
                        )}
                      </li>
                    </ul>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsDeskBox;
