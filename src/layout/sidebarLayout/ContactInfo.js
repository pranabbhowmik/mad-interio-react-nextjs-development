// ContactInfo.js
import React from "react";
import { MapPin, PhoneCall } from "react-feather";

const ContactInfo = ({ contact }) => {
  // Enhanced: Check for meaningful data (e.g., at least ownerName or phoneNumber)
  if (!contact || (!contact.ownerName && !contact.phoneNumber)) {
    return null;
  }

  return (
    <div className="advance-card">
      <h6>Contact Info</h6>
      <div className="category-property">
        <div className="agent-info">
          <div className="media">
            <img
              src={
                contact.logoUrl ||
                "/assets/images/no-image/no-image-available.jpg"
              }
              className="img-50"
              alt={contact.businessName || contact.ownerName || "Contact"}
            />
            <div className="media-body ms-2">
              <h6>{contact.ownerName || ""}</h6>
              <p>
                <a
                  href={`tel:${contact.phoneNumber}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {contact.phoneNumber || ""}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
