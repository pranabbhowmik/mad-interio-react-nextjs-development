import LeftSidebar from "./LeftSidebar";

export const metadata = {
  title: "Top Interior Designers | Verified Experts Near You | Mad Interio",
  description:
    "Explore verified and top-rated interior designers on Mad Interio. Find the best professionals for your home, office, or commercial space — all in one trusted directory.",
  keywords: [
    "interior designers",
    "best interior designers",
    "top interior designers",
    "interior design directory",
    "home decor experts",
    "interior design services",
    "interior designers India",
    "hire interior designer",
    "Mad Interio",
  ],
  openGraph: {
    title: "Top Interior Designers | Verified Experts Near You | Mad Interio",
    description:
      "Browse verified and trusted interior designers on Mad Interio — India’s most reliable interior design directory for homeowners, architects, and developers.",
    url: "https://madinterio.in/interior-designers",
    siteName: "Mad Interio",
    type: "website",
    images: [
      {
        url: "/assets/images/banner/designers-banner.webp",
        width: 1200,
        height: 630,
        alt: "Mad Interio Designers Page - Verified Interior Designers in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Interior Designers | Verified Experts Near You | Mad Interio",
    description:
      "Find the best interior designers and home decor professionals on Mad Interio. Verified experts for every project — from modern homes to commercial interiors.",
    images: ["/assets/images/banner/designers-banner.webp"],
  },
  authors: [{ name: "Mad Interio Team" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://madinterio.in/interior-designers",
  },
};

export default function ListingPage() {
  return <LeftSidebar />;
}
