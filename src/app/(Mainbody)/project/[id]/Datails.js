"use client";
import { Fragment } from "react";
import BodyContent from "@/components/pages/portfolio/details";
import FooterOne from "@/layout/footers/FooterOne";
import Navbar from "@/components/common/navbar";
import Hero from "@/components/hero/hero";

const Details = () => {
  return (
    <Fragment>
      <Navbar />
      <Hero
        heading="Discover This Designer’s Signature Work "
        subHeading="View this interior designer’s completed projects, portfolio highlights, and design expertise to inspire your own space. "
        image="/assets/images/about/abouthero.jpg"
      />
      <BodyContent />
      <FooterOne />
    </Fragment>
  );
};

export default Details;
