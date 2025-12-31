import React, { Fragment, useEffect, useState } from "react";
import Hero from "@/components/hero/hero";
import TestimonialSection from "@/components/home/enterprise/Testimonial";
import AboutParallaxCards from "@/components/about/about-parallex";
import AboutUsSection from "../aboutUs2/AboutUs";
import WhatWeProvide from "../../about/whatweprovide";

const BodyContent = () => {
  const [marginBottom, setMarginBottom] = useState("0px");
  useEffect(() => {
    const updateMargin = () => {
      if (window.innerWidth <= 1024) {
        setMarginBottom("40px");
      } else {
        setMarginBottom("0px");
      }
    };

    updateMargin(); // Set on mount
    window.addEventListener("resize", updateMargin); // Update on resize

    return () => window.removeEventListener("resize", updateMargin); // Cleanup
  }, []);
  return (
    <Fragment>
      <Hero
        heading="Transform Your Space with Expert Designers"
        subHeading="Connecting you with top interior designers and 3D artists, making it effortless to create beautiful, inspiring spaces"
        image="/assets/images/about/about-us banner.webp"
      />
      <AboutUsSection />
      {/* <OurStory /> */}
      <AboutParallaxCards />
      <WhatWeProvide />
      <div
        style={{
          backgroundImage:
            "linear-gradient(125.34deg, rgba(255, 215, 174, 0.31) 0%, rgba(206, 136, 68, 0.31) 100%)",
          // Responsive marginBottom
        }}
        id="testimonial-shadow"
      >
        <TestimonialSection />
      </div>
    </Fragment>
  );
};

export default BodyContent;
