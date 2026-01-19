import { Fragment } from "react";
import BodyContent from "@/components/property/stickyTabOrClassic";
import FooterOne from "@/layout/footers/FooterOne";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "Interior Designer Profile | Mad Interio",
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
};

//  Fixed: make function async and await params
export default async function PropertyPage({ params }) {
  const { id } = await params; //  required in Next.js 15+

  return (
    <Fragment>
      <Navbar />
      <BodyContent side="right" id={id} />
      <FooterOne />
    </Fragment>
  );
}
