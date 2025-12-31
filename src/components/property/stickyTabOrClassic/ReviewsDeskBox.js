import React from "react";
import ReviewStarr from "../../elements/ReviewStarr";
import { useRouter } from "next/navigation";

// Utility to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Utility to get first letter
const getInitial = (name = "") => {
  return name.charAt(0).toUpperCase();
};

const ReviewsDeskBox = ({ reviews = [] }) => {
  const router = useRouter();

  return (
    <div className="desc-box">
      <div className="page-section">
        <h4 className="content-title">Reviews</h4>
        <div className="review">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="review-box" key={review.id}>
                <div className="media">
                  {/* Avatar circle */}
                  <div className="avatar-circle">
                    {getInitial(review.userName)}
                  </div>

                  <div className="media-body">
                    <h6>{review.userName}</h6>
                    <p className="review-date">
                      {formatDate(review.createdOn)}
                    </p>
                    <p className="mb-0">{review.comment}</p>
                  </div>

                  <div className="rating">
                    <ReviewStarr rating={review.rating} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ReviewsDeskBox;
