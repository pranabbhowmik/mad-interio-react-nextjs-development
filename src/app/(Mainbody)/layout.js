"use client";
import { ConfigDB } from "@/config/themeCustomizerConfig";
import Customizer from "@/layout/Customizer";
import TapToTop from "@/layout/TapToTop";
import GAPageView from "@/utils/ga-pageview";
import StoreOldData from "@/utils/StoreOldData";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  // Set default theme colors
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-default",
      ConfigDB.PrimaryColor ? ConfigDB.PrimaryColor : "#d18d4b"
    );
    document.documentElement.style.setProperty(
      "--theme-default2",
      ConfigDB.SecondaryColor ? ConfigDB.SecondaryColor : "#984b01"
    );
  }, [pathName]);

  return (
    <Fragment>
      <GAPageView />
      {children}
      <Customizer />
      <TapToTop />
      <StoreOldData />
      <ToastContainer
        className={"p-0"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
      />
    </Fragment>
  );
}
