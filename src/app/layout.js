import Script from "next/script";
import NoSsr from "@/utils/NoSsr";
import MainProvider from "./MainProvider";
import "../../public/assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { detectLanguage } from "./i18n/server";
import { I18nProvider } from "./i18n/i18n-context";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata = {
  title: "Find Top Interior Designers | Mad Interio Directory",
  description:
    "Discover verified interior designers near you. Mad Interio connects you with top-rated design experts for your dream home and decor projects.",
};

export default async function RootLayout({ children }) {
  const lng = await detectLanguage();

  return (
    <I18nProvider language={lng}>
      <html lang={lng}>
        <head>
          {/* Google Analytics */}
          {GA_ID && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          )}

          <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="/assets/images/favicon.png" />
        </head>

        <body>
          <NoSsr>
            <MainProvider>{children}</MainProvider>
          </NoSsr>
        </body>
      </html>
    </I18nProvider>
  );
}
