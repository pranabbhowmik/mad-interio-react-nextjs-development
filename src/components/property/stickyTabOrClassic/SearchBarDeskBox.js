// SearchBarDeskBox.js
import React from "react";
import { Container } from "reactstrap";
import AboutDeskBox from "./AboutDeskBox";

const SearchBarDeskBox = ({ fix, about }) => {
  const aboutData = about?.aboutUs;
  const property = about?.galleryImages; // gallery images

  // const hasGallery = Array.isArray(property) && property.length > 0;

  return (
    <div className="desc-box" id="navigation">
      <div className={`menu-top ${fix ? "sticky" : ""}`}>
        <Container>
          <ul className="nav">
            <li className="active">
              <a href="#navigation">about</a>
            </li>

            <li>
              <a href="#service1">services</a>
            </li>

            <li>
              <a href="#project">projects</a>
            </li>

            <li>
              <a href="#details">details</a>
            </li>

            {/* ✅ Show only if gallery exists
            {hasGallery && (
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            )} */}
          </ul>
        </Container>
      </div>

      <AboutDeskBox about={aboutData} />
    </div>
  );
};

export default SearchBarDeskBox;
