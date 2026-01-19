// SearchBarDeskBox.js
import React from "react";
import { Container } from "reactstrap";
import AboutDeskBox from "./AboutDeskBox";

const SearchBarDeskBox = ({ fix, about }) => {
  const aboutData = about?.aboutUs;
  const galleryImages = about?.galleryImages; // Renamed for clarity
  const hasProjects = about?.projects && about.projects.length > 0;
  const hasGallery = Array.isArray(galleryImages) && galleryImages.length > 0;

  const hasAbout = !!aboutData?.trim();
  const hasServices = about?.services && about.services.length > 0;
  const hasDetails =
    about &&
    (about.address?.trim() ||
      about.city?.trim() ||
      about.phoneNumber ||
      about.email ||
      about.website?.trim() ||
      about.areasServed?.trim() ||
      about.pinCode);

  return (
    <div className="desc-box" id="navigation">
      <div className={`menu-top ${fix ? "sticky" : ""}`}>
        <Container>
          <ul className="nav">
            {hasAbout && (
              <li className="active">
                <a href="#navigation">about</a>
              </li>
            )}

            {hasServices && (
              <li>
                <a href="#services">services</a>
              </li>
            )}

            {hasDetails && (
              <li>
                <a href="#details">details</a>
              </li>
            )}

            {hasProjects && (
              <li>
                <a href="#project">projects</a>
              </li>
            )}

            {hasGallery && (
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            )}
          </ul>
        </Container>
      </div>

      <AboutDeskBox about={aboutData} />
    </div>
  );
};

export default SearchBarDeskBox;
