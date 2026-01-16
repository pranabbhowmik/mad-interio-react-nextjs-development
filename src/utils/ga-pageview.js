"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GAPageView() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  useEffect(() => {
    if (!window.gtag) return;

    const key = `ga_view_${pathname}`;

    // Stop refresh abuse
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "true");

    window.gtag("event", "page_view", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
