// gaEvents.js
import { Value } from "sass";

export const handlePhoneClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "view_designer_contact_number", {
    designer_category: designerCatagory || "unknown_category",
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
  });
};

export const handleViewContactClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "view_designer_contact_number", {
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
    designer_category: designerCatagory || "unknown_category",
  });
};
