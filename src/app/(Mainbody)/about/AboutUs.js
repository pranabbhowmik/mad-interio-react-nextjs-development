"use client";
import React, { Fragment } from "react";

import BodyContent from "@/components/pages/other-pages/aboutUs1";
import FooterThree from "@/layout/footers/FooterThree";

import Navbar from "@/components/common/navbar";

const AboutUs = () => {
  return (
    <>
      <Fragment>
        <Navbar />
        <BodyContent />
        <FooterThree />
      </Fragment>
    </>
  );
};

export default AboutUs;
