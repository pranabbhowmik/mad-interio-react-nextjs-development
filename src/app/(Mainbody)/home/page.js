"use client";
import Navbar from "@/components/common/navbar";
import BodyContent from "@/components/home/search-tab";
import { ConfigDB } from "@/config/themeCustomizerConfig";
import FooterThree from "@/layout/footers/FooterThree";
import React, { Fragment, useEffect } from "react";

const Modern = () => {
  useEffect(() => {
    setTimeout(() => {
      !ConfigDB.PrimaryColor &&
        document.documentElement.style.setProperty(
          "--theme-default",
          "linear-gradient(125.34deg, rgba(255, 215, 174, 0.31) 0%, rgba(206, 136, 68, 0.31) 100%);"
        );
      !ConfigDB.SecondaryColor &&
        document.documentElement.style.setProperty(
          "--theme-default2",
          "#ff8c41"
        );
    }, 0.1);
  }, []);

  return (
    <Fragment>
      <Navbar />
      <BodyContent />
      <FooterThree />
    </Fragment>
  );
};

export default Modern;
