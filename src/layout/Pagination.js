"use client";
import React from "react";

const Pagination = ({ toPage, gridDispatch, totalPages }) => {
  const generatePages = (current, total) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [1];
    if (current > 3) {
      pages.push("...");
    }
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < total - 2) {
      pages.push("...");
    }
    if (pages[pages.length - 1] !== total) {
      pages.push(total);
    }

    // Remove any potential duplicates (though unlikely in this logic)
    return pages.filter(
      (page, index, self) => index === self.findIndex((p) => p === page)
    );
  };

  const pages = generatePages(toPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav className="theme-pagination">
      <ul className="pagination">
        {/* Hide these two when on FIRST page */}
        {toPage > 1 && (
          <>
            <li className="page-item">
              <div
                className="page-link"
                aria-label="Previous"
                onClick={() => gridDispatch({ type: "toPage", payload: 1 })}
              >
                «
              </div>
            </li>

            <li className="page-item">
              <div
                className="page-link"
                aria-label="Previous"
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
          </>
        )}

        {/* Number buttons */}
        {pages.map((data, i) => {
          if (data === "...") {
            return (
              <li key={i} className="page-item disabled">
                <div className="page-link">...</div>
              </li>
            );
          }
          return (
            <li
              className={`page-item ${data === toPage ? "active" : ""}`}
              key={data} // Use data as key for better stability (avoid index)
              onClick={() => gridDispatch({ type: "toPage", payload: data })}
            >
              <div className="page-link" role="button" tabIndex={0}>
                {data}
              </div>
            </li>
          );
        })}

        {/* Hide these two when on LAST page */}
        {toPage < totalPages && (
          <>
            <li className="page-item">
              <div
                className="page-link"
                aria-label="Next"
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

            <li className="page-item">
              <div
                className="page-link"
                aria-label="Next"
                onClick={() =>
                  gridDispatch({ type: "toPage", payload: totalPages })
                }
              >
                »
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
