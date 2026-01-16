// gaEvents.js
import { Value } from "sass";

export const handlePhoneClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "designer_phone_click", {
    designer_category: designerCatagory || "unknown_category",
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
    Value: 1,
  });
};

export const handleViewContactClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "designer_view_contact", {
    designer_category: designerCatagory || "unknown_category",
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
    Value: 1,
  });
};
