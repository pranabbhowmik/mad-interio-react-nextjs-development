/**
 * It fetches the translations from the server and passes them to the component as props
 * @returns A React component.
 */
"use client";
import React, { Fragment } from "react";
import GridView from "@/components/listing/gridView/grid/GridView";
import Navbar from "@/components/common/navbar";
import FooterOne from "@/layout/footers/FooterOne";
import Hero from "@/components/hero/hero";
import Head from "next/head";

const LeftSidebar = () => {
  return (
    <Fragment>
      <Head>
        <title>MAD INTERIO | Explore Top Interior Designers</title>
        <meta
          name="description"
          content="Explore our curated listing of top interior designers and 3D artists. Find the perfect expert to bring your vision to life with Mad Interio."
        />
      </Head>
      <Navbar />
      <Hero
        heading="Discover Top Interior Designers Near You"
        subHeading="Browse curated profiles of verified interior designers and 3D artists to find the perfect expert for your project."
        image="/assets/images/listing/listing-hero.webp"
      />
      <GridView side={"left"} size={2} gridType={"list-view"} gridBar={true} />
      <FooterOne />
    </Fragment>
  );
};

export default LeftSidebar;
