// FilterTag.js
import React, { Fragment } from "react";
import { X } from "react-feather";

const FilterTag = ({ activeFilters = {}, onRemove }) => {
  const StringConvert = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="filter-tag-div">
      {Object.keys(activeFilters).map((key, i) => (
        <Fragment key={i}>
          {activeFilters[key] && activeFilters[key] !== "" && (
            <div className="filter-tag">
              {activeFilters[key]}{" "}
              <X
                onClick={() => {
                  if (typeof onRemove === "function") {
                    onRemove(key);
                  }
                }}
                className="cursor-pointer text-muted"
                size={14}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default FilterTag;
