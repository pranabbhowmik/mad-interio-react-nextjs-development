// import React from "react";

// const ReviewStarr = ({ rating }) => {
//   var rows = [];
//   for (var i = 0; i < 5; i++) {
//     rows.push(<Stars key={i} rating={rating && rating} i={i} />);
//   }
//   return <ul>{rows}</ul>;
// };

// export default ReviewStarr;

// const Stars = ({ i, rating }) => {
//   return (
//     <li className="fas">
//       <i
//         className="fas fa-star"
//         style={{ color: `${rating && (i >= rating ? "#83888c" : "#ffcc33")}` }}
//       ></i>
//     </li>
//   );
// };

import { handlePhoneClick } from "@/utils/gaEvents";
import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";

function ReviewStarr({ socials, designerId, designerName }) {
  return (
    <Col xl="3">
      <div className="review-social-icons text-center">
        <ul className="icon-list">
          {socials?.phone && (
            <li>
              <Link
                href={`tel:${socials.phone}`}
                onClick={() =>
                  handlePhoneClick({
                    designerId,
                    designerName,
                  })
                }
              >
                <i className="fa-solid fa-phone fa-lg"></i>
              </Link>
            </li>
          )}

          {socials?.instagram && socials.instagram !== "#" && (
            <li>
              <Link target="_blank" href={socials.instagram}>
                <i className="fa-brands fa-instagram fa-lg"></i>
              </Link>
            </li>
          )}

          {socials?.website && socials.website !== "#" && (
            <li>
              <Link target="_blank" href={socials.website}>
                <i className="fa-solid fa-globe fa-lg"></i>
              </Link>
            </li>
          )}

          {socials?.email && socials.email !== "#" && (
            <li>
              <Link target="_blank" href={`mailto:${socials.email}`}>
                <i className="fa-solid fa-envelope fa-lg"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </Col>
  );
}

export default ReviewStarr;
