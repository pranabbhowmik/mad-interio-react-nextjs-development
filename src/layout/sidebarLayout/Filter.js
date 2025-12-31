// Filter.js (Fixed for Consistent Prop Passing)
import React from "react";
import InputForm from "../../components/home/slider-filter-search/homeElements/InputForm";

const Filter = ({
  value, // current applied filters from GridView
  sm,
  lg,
  onFilterChange,
  uniqueCities,
  uniquePropertyTypes,
  clearFilter,
}) => {
  return (
    <>
      <div className="advance-card mt-0">
        <h5 className="mb-0 advance-title">Advance search</h5>
      </div>
      <div className="advance-card">
        <h6>Filter</h6>
        <InputForm
          label={false}
          sm={sm}
          lg={lg}
          value={value}
          uniqueCities={uniqueCities}
          uniquePropertyTypes={uniquePropertyTypes}
          onFilterChange={onFilterChange}
          clearFilter={clearFilter}
        />
      </div>
    </>
  );
};

export default Filter;
