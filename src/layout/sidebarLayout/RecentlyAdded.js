import React, { useEffect, useState } from "react";
import formatPrice from "@/utils/mad-interio/formatters";

const RecentlyAdded = ({ recentdata }) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (recentdata && Array.isArray(recentdata)) {
      const transformedData = recentdata.map((item) => {
        let firstImg = null;

        if (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
          firstImg = item.imageUrls[0];
        } else if (item.logoUrl?.startsWith("http")) {
          firstImg = item.logoUrl;
        }

        const firstPriceLimit = item.priceLimits?.[0] || {};

        const minPrice = firstPriceLimit.minPrice
          ? formatPrice(firstPriceLimit.minPrice)
          : null;

        const maxPrice = firstPriceLimit.maxPrice
          ? formatPrice(firstPriceLimit.maxPrice)
          : null;

        let finalPrice = " ";
        if (minPrice && maxPrice) finalPrice = `${minPrice} - ${maxPrice}`;
        else if (minPrice) finalPrice = minPrice;
        else if (maxPrice) finalPrice = maxPrice;

        return {
          id: item.id,
          img: firstImg,
          title: item.businessName || "Untitled Professional",
          price: finalPrice,
          propertyType: firstPriceLimit.propertyType || "",
        };
      });

      setValue(transformedData);
    } else {
      setValue([]);
    }
  }, [recentdata]);

  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const PLACEHOLDER_SVG = "/assets/images/no-image/no-image-available.jpg";

  // Only render if there is data
  if (value.length === 0) {
    return null;
  }

  return (
    <div className="advance-card">
      <h6>Recently Added</h6>
      <div className="recent-property">
        <ul>
          {value?.map((data) => (
            <li key={data.id}>
              <div className="media">
                <img
                  src={data.img || PLACEHOLDER_SVG}
                  className="img-fluid"
                  alt={data.title}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_SVG;
                    e.target.onerror = null;
                  }}
                  loading="lazy"
                />

                <div className="media-body">
                  <a href={`/designer/${data.id}`}>
                    <h5 style={{ marginBottom: "2px", lineHeight: "1.2" }}>
                      {toTitleCase(data.title)}
                    </h5>
                  </a>

                  {data.price && (
                    <span id="priceproperty">
                      {data.price}
                      {data.propertyType ? ` / ${data.propertyType}` : ""}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(RecentlyAdded);
