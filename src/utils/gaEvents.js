export const handlePhoneClick = ({ designerId, designerName }) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "designer_phone_click", {
    event_category: "engagement",
    event_label: designerName || "unknown_designer",
    designer_id: designerId || "unknown",
    page_path: window.location.pathname,
  });
};
