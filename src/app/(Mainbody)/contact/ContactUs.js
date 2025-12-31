"use client";
import React, { Fragment } from "react";

import BodyContent from "@/components/contact/contactUs1";
import Navbar from "@/components/common/navbar";
import FooterOne from "@/layout/footers/FooterOne";

const ContactUs = () => {
  return (
    <Fragment>
      <Navbar />
      <BodyContent />
      <FooterOne />
    </Fragment>
  );
};

export default ContactUs;
