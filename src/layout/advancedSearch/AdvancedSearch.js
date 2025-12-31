// AdvancedSearch.js
/**
 * It's a function that returns a div with a className that is a string that is a concatenation of a
 * few strings.
 * @returns A React component.
 */
import React from "react";
import InputForm from "../../components/home/slider-filter-search/homeElements/InputForm";
import useMobileSize from "../../utils/useMobileSize";

const AdvancedSearch = ({
  advancedSearchOpen,
  setAdvancedSearchOpen,
  value,
  uniqueCities,
  uniquePropertyTypes,
  onFilterChange,
  clearFilter,
}) => {
  const mobile = useMobileSize();

  // Callback to close the panel
  const handlePanelClose = () => {
    setAdvancedSearchOpen(false);
  };

  return (
    <div
      className={`left-sidebar filter-bottom-content ${
        advancedSearchOpen ? "d-block open" : "d-none"
      } ${!mobile ? "position-absolute" : ""}`}
      style={{ zIndex: 1001, marginTop: 0 }}
    >
      <h6 className="d-lg-none d-block text-end">
        <a
          className="close-filter-bottom"
          onClick={() => setAdvancedSearchOpen(false)}
        >
          Close filter
        </a>
      </h6>
      <InputForm
        value={value}
        lg={4}
        sm={12}
        uniqueCities={uniqueCities}
        uniquePropertyTypes={uniquePropertyTypes}
        onFilterChange={onFilterChange}
        clearFilter={clearFilter}
        onPanelClose={handlePanelClose}
      />
    </div>
  );
};

export default AdvancedSearch;
