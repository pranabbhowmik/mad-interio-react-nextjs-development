import Details from "./Datails";

export const metadata = {
  title: "Interior Designer Project  | Mad Interio",
  description:
    "Explore detailed property portfolios from top interior designers on Mad Interio. View project styles, designs, and spaces crafted by verified experts.",
  keywords: [
    "interior design projects",
    "interior designer portfolio",
    "residential interior design",
    "commercial interior design",
    "home decor inspiration",
    "modern interiors",
    "Mad Interio",
    "top interior designers",
  ],
  openGraph: {
    title: "Interior Design Projects | Designer Property Details | Mad Interio",
    description:
      "Discover inspiring property designs from verified interior designers. View full project details, concepts, and images on Mad Interio — India’s trusted design directory.",
    url: "https://madinterio.in/designer/property-details",
    siteName: "Mad Interio",
    type: "website",
  },
  alternates: {
    canonical: "https://madinterio.in/designer/property-details",
  },
};

export default function DetailsPage() {
  return <Details />;
}
