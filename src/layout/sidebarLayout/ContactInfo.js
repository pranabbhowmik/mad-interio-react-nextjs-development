// ContactInfo.js
import React from "react";
import { MapPin, PhoneCall } from "react-feather";
import { handlePhoneClick, handleViewContactClick } from "@/utils/gaEvents";
import Link from "next/link";

const ContactInfo = ({
  contact,
  designerId,
  designerName,
  designerCatagory,
}) => {
  // Enhanced: Check for meaningful data (e.g., at least ownerName or phoneNumber)
  if (!contact || (!contact.ownerName && !contact.phoneNumber)) {
    return null;
  }

  const [showContact, setShowContact] = React.useState(false);

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
              <h6>{contact.ownerName || ""}</h6>
              <p>
                {showContact ? (
                  <Link
                    href={`tel:${contact.phoneNumber}`}
                    className="text-black hover:text-blue-500 hover:underline"
                    onClick={() =>
                      handlePhoneClick({
                        designerId,
                        designerName,
                        designerCatagory,
                      })
                    }
                  >
                    {contact.phoneNumber || ""}
                  </Link>
                ) : (
                  <span
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={handleViewClick}
                  >
                    View Contact Info
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
