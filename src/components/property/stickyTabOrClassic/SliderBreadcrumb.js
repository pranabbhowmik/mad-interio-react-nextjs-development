/**
 * It renders a slider with a background image and a title
 * @returns The return statement is used to return a value from a function.
 */
import React from "react";
import Slider from "react-slick";
import { mainPropertySlider } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import NoSsr from "@/utils/NoSsr";
import TopTitle from "./TopTitle";

const SliderBreadcrumbSection = ({ property }) => {
  // Early return if no property or no valid images to prevent empty/misrendered slider
  if (
    !property ||
    !property.imageUrls ||
    !Array.isArray(property.imageUrls) ||
    property.imageUrls.length === 0
  ) {
    return null; // Or return a simple placeholder section if preferred, e.g., <section><TopTitle details={property} /></section>
  }

  const breadcrumbBg = property.imageUrls; // Use directly, no fallback to string (avoids invalid src)

  return (
    <section className="ratio_40 breadcrumb-section p-0 single-property-images">
      <NoSsr>
        <Slider
          className="main-property-slider arrow-image"
          {...mainPropertySlider}
        >
          {breadcrumbBg.map((item, index) => (
            <div key={index}>
              <div>
                <Img
                  src={item}
                  className="bg-img"
                  alt={`${property.businessName || "Property"} - Image ${
                    index + 1
                  }`} // Improved alt text for accessibility
                />
              </div>
            </div>
          ))}
        </Slider>
      </NoSsr>
      <TopTitle details={property} />
    </section>
  );
};

export default SliderBreadcrumbSection;
