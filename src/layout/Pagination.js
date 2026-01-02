"use client";
import React from "react";

const Pagination = ({ toPage, gridDispatch, totalPages }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    // Always include current page
    pages.push(toPage);

    // Include next page if it exists
    if (toPage < totalPages) {
      pages.push(toPage + 1);
    }

    // If on last page, include previous instead of next (to always have two if possible)
    if (pages.length < 2 && toPage > 1) {
      pages.unshift(toPage - 1);
    }

    return [...new Set(pages)]; // Remove duplicates if any
  };

  const pages = getVisiblePages();

  return (
    <nav className="theme-pagination">
      <ul className="pagination">
        {/* Previous button */}
        {toPage > 1 && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Previous Page"
              onClick={() =>
                gridDispatch({
                  type: "toPage",
                  payload: toPage - 1,
                })
              }
            >
              {"<"}
            </div>
          </li>
        )}

        {/* Two page numbers */}
        {pages.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${pageNum === toPage ? "active" : ""}`}
            onClick={() => gridDispatch({ type: "toPage", payload: pageNum })}
          >
            <div className="page-link" role="button" tabIndex={0}>
              {pageNum}
            </div>
          </li>
        ))}

        {/* Next button */}
        {toPage < totalPages && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Next Page"
              onClick={() =>
                gridDispatch({
                  type: "toPage",
                  payload: toPage + 1,
                })
              }
            >
              {">"}
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
