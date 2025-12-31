import { Fragment } from "react";
import BodyContent from "@/components/property/stickyTabOrClassic";
import FooterOne from "@/layout/footers/FooterOne";
import Navbar from "@/components/common/navbar";

// ✅ Fixed: make function async and await params
export default async function PropertyPage({ params }) {
  const { id } = await params; // ⬅️ required in Next.js 15+

  return (
    <Fragment>
      <Navbar />
      <BodyContent side="right" id={id} />
      <FooterOne />
    </Fragment>
  );
}
