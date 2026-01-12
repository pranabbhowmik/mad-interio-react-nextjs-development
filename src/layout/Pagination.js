"use client";
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ toPage, gridDispatch, totalPages }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = ({ selected }) => {
    gridDispatch({ type: "toPage", payload: selected + 1 });
  };

  // Custom chunk navigation (<< and >> for jumping ~10 pages)
  const handlePrevChunk = () => {
    const newPage = Math.max(1, toPage - 10);
    gridDispatch({ type: "toPage", payload: newPage });
  };

  const handleNextChunk = () => {
    const newPage = Math.min(totalPages, toPage + 10);
    gridDispatch({ type: "toPage", payload: newPage });
  };

  const showPrevChunk = toPage > 10; // Show if more than 10 pages before
  const showNextChunk = toPage < totalPages - 9; // Show if more than 10 pages after

  const previousLabel =
    toPage > 1 ? (
      <span aria-label="Previous Page" className="page-link">
        {"<"}
      </span>
    ) : null;

  const nextLabel =
    toPage < totalPages ? (
      <span aria-label="Next Page" className="page-link">
        {">"}
      </span>
    ) : null;

  return (
    <>
      <style>{`
        .theme-pagination .page-link:hover {
          background-color: #d18d4b !important;
          color: white !important;
        }
        .theme-pagination .active .page-link {
          background-color: #d18d4b !important;
          color: white !important;
        }
      `}</style>
      <nav className="theme-pagination">
        <div className="d-flex align-items-center justify-content-end">
          {/* ReactPaginate Core */}
          <ReactPaginate
            pageCount={totalPages}
            forcePage={toPage - 1}
            onPageChange={handlePageClick}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            breakLabel={<span className="page-link">...</span>}
            pageRangeDisplayed={3} // Show up to 3 pages around current
            marginPagesDisplayed={1} // Always show first/last
            containerClassName="pagination mb-0"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            disabledClassName="disabled"
            previousClassName="page-item"
            nextClassName="page-item"
            breakClassName="page-item"
          />
        </div>
      </nav>
    </>
  );
};

export default Pagination;
