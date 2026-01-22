// gaEvents.js
import { Value } from "sass";

export const handlePhoneClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag(
    "event",
    "designer_profile_view_mobile_number_click_of_top_action_button",
    {
      designer_category: designerCatagory || "unknown_category",
      designer_Name: designerName || "unknown_designer",
      designer_id: designerId || "unknown",
      page_path: window.location.pathname,
    },
  );
};

export const handleViewContactClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag(
    "event",
    "designer_profile_view_mobile_number_click_of_right_sidebar",
    {
      designer_Name: designerName || "unknown_designer",
      designer_id: designerId || "unknown",
      page_path: window.location.pathname,
      designer_category: designerCatagory || "unknown_category",
    },
  );
};

export const handleViewbusinessdetailsClick = ({
  designerId,
  designerName,
  designerCatagory,
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag(
    "event",
    "designer_profile_view_mobile_number_click_of_business_details_section",
    {
      designer_Name: designerName || "unknown_designer",
      designer_id: designerId || "unknown",
      page_path: window.location.pathname,
      designer_category: designerCatagory || "unknown_category",
    },
  );
};
