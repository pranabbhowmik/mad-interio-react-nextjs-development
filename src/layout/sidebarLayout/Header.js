// Header.js
/**
 * It renders a header with a title, a dropdown, and a grid/list toggle
 */
import React, { useState, useEffect, useRef } from "react";
import { AlignCenter, Grid, List } from "react-feather";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import AdvancedSearch from "../advancedSearch/AdvancedSearch";
import useMobileSize from "@/utils/useMobileSize";

const Header = ({
  grid,
  mapView,
  mapModal,
  gridBar,
  tabHeader,
  title,
  AdvancedSearchShow,
  productCount,
  setMapModal,
  gridDispatch,
  onSortChange, // ✅ added from GridView
  filters,
  uniqueCities,
  uniquePropertyTypes,
  onFilterChange,
  clearFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort By"); // UPDATED: Default to "Select" placeholder
  const mobileSize = useMobileSize("AdvancedSearch");
  const titleRef = useRef(null);

  // Automatically scroll to the title on component mount and when pagination changes (toPage updates)
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [grid?.toPage]);

  const handleSortBy = (sortOption, label) => {
    if (typeof onSortChange === "function") {
      onSortChange(sortOption); // ✅ send to GridView
    }
    setSelectedSort(label); // ✅ update label in dropdown
    setIsOpen(false);
  };

  return (
    <div className="filter-panel">
      <div className="top-panel">
        {tabHeader ? (
          <div className="filters respon-filter-content filter-button-group">
            <ul>
              <li className="active">
                <span>All Property</span>
              </li>
              <li>
                <span>For Sale</span>
              </li>
              <li>
                <span>For Rent</span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 ref={titleRef}>{title}</h2>
            {/* <span className="show-result">
              Showing{" "}
              <span>
                {(title === "Agency Listing" ? 9 : 6) * (grid?.toPage || 1) -
                  (title === "Agency Listing" ? 9 : 6)}
                -
                {(title === "Agency Listing" ? 9 : 6) * (grid?.toPage || 1) >
                productCount
                  ? productCount
                  : (title === "Agency Listing" ? 9 : 6) *
                    (grid?.toPage || 1)}{" "}
                of {productCount}
              </span>{" "}
              Listings
            </span> */}
          </div>
        )}

        <ul className="grid-list-filter d-flex">
          {mapModal && (
            <li>
              <a
                onClick={() => {
                  setMapModal(!mapModalOpen);
                  setMapModalOpen(!mapModalOpen);
                }}
              >
                View on map
                <span className="arrow-define">Click to view</span>
              </a>
            </li>
          )}

          <li className="d-flex flex-wrap gap-2 align-items-center mobile-sort-wrapper">
            {(AdvancedSearchShow || mobileSize) && (
              <div className="dropdown">
                <button
                  className="mb-0 font-rubik btn btn-secondary"
                  onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
                >
                  <span> Advance search </span>{" "}
                  <AlignCenter className="float-end ms-2" />
                </button>
              </div>
            )}

            {/* ✅ Sorting Dropdown */}
            <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
              <DropdownToggle className="font-rubik sort-btn">
                <span>{selectedSort}</span>{" "}
                <i className="fas fa-angle-down ms-lg-3 ms-2"></i>
              </DropdownToggle>
              <DropdownMenu className="text-start">
                {/* UPDATED: Added "Select" as first/default option */}
                <DropdownItem onClick={() => handleSortBy("", "Sort By")}>
                  Sort By
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleSortBy("newest", "Newest First")}
                >
                  Newest First
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleSortBy("oldest", "Oldest First")}
                >
                  Oldest First
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSortBy("pricelowtohigh", "Low to High Price")
                  }
                >
                  Low to High Price
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSortBy("pricehightolow", "High to Low Price")
                  }
                >
                  High to Low Price
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSortBy("averagerating", " Highest Rating")
                  }
                >
                  Highest Rating
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch
        advancedSearchOpen={advancedSearchOpen}
        setAdvancedSearchOpen={setAdvancedSearchOpen}
        value={filters}
        uniqueCities={uniqueCities}
        uniquePropertyTypes={uniquePropertyTypes}
        onFilterChange={onFilterChange}
        clearFilter={clearFilter}
      />
    </div>
  );
};

export default Header;
