"use client";
import React from "react";

const Pagination = ({ toPage, gridDispatch, totalPages }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const delta = 1; // Show up to 3 pages: current-1, current, current+1 (adjusted for edges)

    let startPage = Math.max(1, toPage - delta);
    let endPage = Math.min(totalPages, toPage + delta);

    // Ensure at least 3 pages if possible, but adjust for total
    if (endPage - startPage + 1 < 3 && totalPages >= 3) {
      if (toPage === 1) {
        endPage = Math.min(3, totalPages);
      } else if (toPage === totalPages) {
        startPage = Math.max(totalPages - 2, 1);
      } else {
        // Center around current
        startPage = toPage - 1;
        endPage = toPage + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getVisiblePages();

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      gridDispatch({ type: "toPage", payload: page });
    }
  };

  const isActive = (pageNum) => pageNum === toPage;

  const showPrevChunk = toPage > 1 && Math.max(1, toPage - 9) < toPage - 1;
  const showNextChunk =
    toPage < totalPages && Math.min(totalPages, toPage + 9) > toPage + 1;

  return (
    <nav className="theme-pagination">
      <ul className="pagination">
        {/* Previous chunk button (<<) */}
        {showPrevChunk && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Previous 10 Pages"
              onClick={() => goToPage(Math.max(1, toPage - 9))}
            >
              {"<<"}
            </div>
          </li>
        )}

        {/* Previous button (<) */}
        {toPage > 1 && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Previous Page"
              onClick={() => goToPage(toPage - 1)}
            >
              {"<"}
            </div>
          </li>
        )}

        {/* Visible page numbers (up to 3 centered around current) */}
        {pages.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${isActive(pageNum) ? "active" : ""}`}
          >
            <div
              className="page-link"
              role="button"
              tabIndex={0}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </div>
          </li>
        ))}

        {/* Next button (>) */}
        {toPage < totalPages && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Next Page"
              onClick={() => goToPage(toPage + 1)}
            >
              {">"}
            </div>
          </li>
        )}

        {/* Next chunk button (>>) */}
        {showNextChunk && (
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Next 10 Pages"
              onClick={() => goToPage(Math.min(totalPages, toPage + 9))}
            >
              {">>"}
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
