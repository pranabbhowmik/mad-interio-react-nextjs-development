// gaEvents.js
import { Value } from "sass";

export const handlePhoneClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "top_action_button_mobile_number_click", {
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

  window.gtag("event", "right_sidebar_mobile_number_click", {
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
    designer_category: designerCatagory || "unknown_category",
  });
};

export const handleViewbusinessdetailsClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "business_details_mobile_number_click", {
    designer_Name: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
    designer_category: designerCatagory || "unknown_category",
  });
};
