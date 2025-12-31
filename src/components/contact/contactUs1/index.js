/**
 * It returns a fragment containing the GetInTouchSection and ContactDetailsSection components
 * @returns A React component
 */
import { Fragment } from "react";
import GetInTouchSection from "./GetInTouch";
import Hero from "@/components/hero/hero";

const BodyContent = () => {
  return (
    <Fragment>
      <Hero
        heading="Get In Touch With Us Today"
        subHeading="Reach out to our team to connect with top interior designers or get support for your interior projects today."
        image="/assets/images/about/abouthero.jpg"
      />

      <GetInTouchSection />
    </Fragment>
  );
};

export default BodyContent;
