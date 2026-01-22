import React from "react";
import { handleViewContactClick } from "@/utils/gaEvents";
import Link from "next/link";

const ContactInfo = ({
  contact,
  designerId,
  designerName,
  designerCatagory,
}) => {
  // Hide whole card if no usable data
  if (!contact || (!contact.ownerName && !contact.phoneNumber)) {
    return null;
  }

  const [showContact, setShowContact] = React.useState(false);
  const hasPhone = Boolean(contact.phoneNumber);

  const handleViewClick = () => {
    handleViewContactClick({
      designerId,
      designerName,
      designerCatagory,
    });
    setShowContact(true);
  };

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
              {contact.ownerName && <h6>{contact.ownerName}</h6>}

              {/* Render only if phone exists */}
              {hasPhone && (
                <p>
                  {showContact ? (
                    <Link
                      href={`tel:${contact.phoneNumber}`}
                      // Removed onClick here to avoid triggering the top event
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {contact.phoneNumber}
                    </Link>
                  ) : (
                    <span
                      onClick={handleViewClick}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      View Contact Info
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
