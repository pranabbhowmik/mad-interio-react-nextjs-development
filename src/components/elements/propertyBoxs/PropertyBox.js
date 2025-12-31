import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Camera } from "react-feather";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";
import ImageSlider from "../ImageSlider";
import ThumbnailSlider from "../ThumbnailSlider";

const PropertyBox = ({ data, relativeSlider, video }) => {
  const [load, setLoad] = useState(true);
  const { symbol, currencyValue } = useSelector(
    (state) => state.currencyReducer
  );
  const formatPrice = (num) => {
    if (num >= 10000000)
      return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr"; // Crores
    if (num >= 100000)
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L"; // Lakhs
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands
    return num;
  };
  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (load) {
    return (
      <ContentLoader className="skeleton-svg">
        <rect className="skeleton-img" />
        <rect className="skeleton-c1" />
        <rect className="skeleton-c2" />
        <rect className="skeleton-c3" />
      </ContentLoader>
    );
  }

  const images = data.imageUrls || [];

  return (
    <div className="property-box">
      <div className="property-image">
        {relativeSlider ? (
          <ThumbnailSlider
            images={images}
            videoData={data.video || []}
            video={video}
          />
        ) : (
          <ImageSlider images={images} />
        )}
        {!relativeSlider && (
          <div className="seen-data">
            <Camera />
            <span>{images.length || 0}</span>
          </div>
        )}
      </div>

      <div className="property-details">
        {/* ✅ Link directly to /property/[id] */}
        <a href={`/designer/${data.id}`}>
          <h3 className="singel-line">
            {toTitleCase(
              (data.businessName || "Unnamed Business").length > 33
                ? (data.businessName || "Unnamed Business").slice(0, 33) + "..."
                : data.businessName || "Unnamed Business"
            )}
          </h3>
        </a>
        <span className="font-roboto">{data.city || "Unknown City"}</span>
        {/* PRICE BLOCK — SHOW ONLY IF PRICE EXISTS */}
        {((data.priceLimits && data.priceLimits.length > 0) || data.price) && (
          <h6>
            {data.priceLimits && data.priceLimits.length > 0 ? (
              <>
                ₹{formatPrice(data.priceLimits[0].minPrice * currencyValue)} - ₹
                {formatPrice(data.priceLimits[0].maxPrice * currencyValue)}
                <span> / {data.priceLimits[0].propertyType}</span>
              </>
            ) : (
              <>
                {symbol}
                {(data.price * currencyValue).toFixed(2)}
              </>
            )}
          </h6>
        )}

        <p className="font-roboto text-first-letter-capital text-lowercase ">
          {(
            data.sortDiscription ||
            "No description available for this professional."
          ).length > 120
            ? (
                data.sortDiscription ||
                "No description available for this professional."
              ).slice(0, 120) + "..."
            : data.sortDiscription ||
              "No description available for this professional."}
        </p>
        <ul>
          <li>Profession: {data.professionType || " "}</li>
          <li>Owner: {data.ownerName || " "}</li>
          {data.pinCode && <li>Pincode: {data.pinCode}</li>}
        </ul>

        <div className="property-btn d-flex">
          {/* <span>{data.createdAt}</span> */}
          {/* ✅ Link button also to /property/[id] */}
          <a href={`/designer/${data.id}`} target="_blank">
            <button type="button" className="btn btn-dashed btn-pill">
              Details
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyBox;
