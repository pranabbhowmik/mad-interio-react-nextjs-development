// TopTitle.js
import React, { useState } from "react";
import { Container } from "reactstrap";
import ReviewStarr from "../../elements/ReviewStarr";
import { useSelector } from "react-redux";

const TopTitle = ({ details, singleData }) => {
  const [like, setLike] = useState(false);
  const { symbol, currencyValue } = useSelector(
    (state) => state.currencyReducer
  );
  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const formatPrice = (num) => {
    if (num >= 10000000)
      return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr"; // Crores
    if (num >= 100000)
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L"; // Lakhs
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands
    return num;
  };
  console.log("details in toptitle", details);
  const instagram = details?.socials;
  const whatsapp = details?.phoneNumber;
  const businessName = details?.businessName || " ";
  const city = details?.city || " ";
  const priceLimits = details?.priceLimits || [];
  const phone = details?.phoneNumber;
  const email = details?.email;
  const website = details?.website;

  // ⭐ Calculate average rating
  // const reviews = details?.reviews || [];
  // const avgRating =
  //   reviews.length > 0
  //     ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
  //     : 0;

  return (
    <div className="single-property-section">
      <Container>
        <div className="single-title">
          <div className="left-single">
            <div className="d-flex">
              <h2 className="mb-0">{toTitleCase(businessName)}</h2>
            </div>
            <p className="mt-1">{details?.address}</p>
            <ul>{/* your other list items remain unchanged */}</ul>
          </div>

          <div className="right-single">
            {/* Pass average rating here */}
            {/* <ReviewStarr rating={avgRating} /> */}

            <ReviewStarr
              socials={{ instagram, whatsapp, phone, email, website }}
              designerId={details?._id}
              designerName={businessName}
            />

            {priceLimits.length > 0 && (
              <h2 className="price">
                ₹{formatPrice(priceLimits[0].minPrice)} - ₹
                {formatPrice(priceLimits[0].maxPrice)}
                <span> / {priceLimits[0].propertyType}</span>
              </h2>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopTitle;
