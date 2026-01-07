import React, { useEffect, useState } from "react";
import { AppPropertyData } from "@/data/appPropertyData";
import { getData } from "@/utils/getData";
import HomeBannerSection from "./HomeBanner";
import FeaturePropertySection from "../corporate/FeatureProperty";
import FeatureSection from "../enterprise/Feature";
import TestimonialSection from "../enterprise/Testimonial";
import HowItWorks from "../howitwork/howitworks";
import ParallaxCards from "@/components/paralexcard/ParallaxCards";
import CtaSection from "@/components/common/cta";
import Hero from "../hero/hero";

const BodyContent = () => {
  const [marginBottom, setMarginBottom] = useState("0px");

  // Handle responsive margin
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
    <>
      <Hero />
      <div>
        <HowItWorks />
        <ParallaxCards />
        <FeatureSection />
        <FeaturePropertySection />
      </div>

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
    </>
  );
};

export default BodyContent;
