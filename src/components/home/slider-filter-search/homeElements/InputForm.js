"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "reactstrap";
import Select from "react-select";
import styles from "./inputform.module.scss";

const InputForm = ({
  label,
  uniqueCities = [],
  uniquePropertyTypes = [],
  onFilterChange,
  value = {},
  clearFilter,
  onPanelClose,
}) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  /* ---------- Options ---------- */
  const cityOptions = useMemo(
    () => [
      { value: "", label: "All Cities" },
      ...uniqueCities.map((c) => ({
        value: c.trim(),
        label: c.trim(),
      })),
    ],
    [uniqueCities]
  );

  const propertyOptions = useMemo(
    () => [
      { value: "", label: "All Property Types" },
      ...uniquePropertyTypes.map((t) => ({
        value: t,
        label: t,
      })),
    ],
    [uniquePropertyTypes]
  );

  /* ---------- Sync from parent ---------- */
  useEffect(() => {
    setSelectedCity(
      cityOptions.find((c) => c.value === (value.city || "")) || cityOptions[0]
    );

    setSelectedProperty(
      propertyOptions.find((p) => p.value === (value.propertyType || "")) ||
        propertyOptions[0]
    );
  }, [value, cityOptions, propertyOptions]);

  /* ---------- Actions ---------- */
  const handleSearch = () => {
    const payload = {};
    if (selectedCity?.value) payload.city = selectedCity.value;
    if (selectedProperty?.value) payload.propertyType = selectedProperty.value;

    onFilterChange?.(payload);
    onPanelClose?.();
  };

  const handleReset = () => {
    setSelectedCity(cityOptions[0]);
    setSelectedProperty(propertyOptions[0]);
    clearFilter?.();
    onPanelClose?.();
  };

  const hasActiveFilters = selectedCity?.value || selectedProperty?.value;

  /* ---------- Guard ---------- */
  if (!uniqueCities.length || !uniquePropertyTypes.length) {
    return <div className="text-center p-3">Loading filter options...</div>;
  }

  /* ---------- react-select styles (updated to match Hero) ---------- */
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 44, // Slightly smaller for filter context
      borderRadius: 12,
      borderWidth: 2,
      borderColor: state.isFocused ? "#984b01" : "#e4e7ec",
      backgroundColor: "#ffffff",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(152, 75, 1, 0.18)" : "none",
      transition: "all 0.2s ease",
      "&:hover": { borderColor: "#984b01" },
      fontFamily: "Poppins",
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 16px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#667085",
      fontWeight: 500,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#984b01" : "#6f8493",
      "&:hover": {
        color: "#984b01",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: 12,

      overflowY: "auto",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#984b01"
        : state.isFocused
        ? "rgba(152, 75, 1, 0.12)"
        : "#fff",
      color: state.isSelected ? "#fff" : "#101828",
      cursor: "pointer",
      fontFamily: "Poppins",
    }),
  };

  return (
    <>
      {/* -------- City -------- */}
      <Row className="mb-3">
        <Col xs={12}>
          <label className="form-label">City</label>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            isSearchable
            styles={selectStyles}
            classNamePrefix="react-select"
          />
        </Col>
      </Row>

      {/* -------- Property Type -------- */}
      <Row className="mb-3">
        <Col xs={12}>
          <label className="form-label">Property Type</label>
          <Select
            options={propertyOptions}
            value={selectedProperty}
            onChange={setSelectedProperty}
            isSearchable
            styles={selectStyles}
            classNamePrefix="react-select"
          />
        </Col>
      </Row>

      {/* -------- Buttons -------- */}
      <Row>
        <Col xs={12} className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-gradient w-100"
            onClick={handleSearch}
          >
            Search
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default InputForm;

// InputForm.js (Fixed Reset Visibility + Panel Close on Search/Reset)
// import React, { useEffect, useState } from "react";
// import { Col, Row } from "reactstrap";

// const InputForm = ({
//   label, // Unused but kept for compatibility
//   lg = 12, // Full-width for stacking
//   sm = 12,
//   uniqueCities = [],
//   uniquePropertyTypes = [],
//   onFilterChange,
//   value = {}, // Destructure as 'value' (matches prop from GridView/AdvancedSearch)
//   clearFilter,
//   onPanelClose, // New prop: callback to close the parent panel (e.g., advanced search)
// }) => {
//   // Init local state from 'value' prop
//   const [filterValues, setFilterValues] = useState({
//     city: value.city || "",
//     propertyType: value.propertyType || "",
//   });

//   // Sync local state when 'value' prop changes (e.g., URL update, global clear)
//   useEffect(() => {
//     setFilterValues({
//       city: value.city || "",
//       propertyType: value.propertyType || "",
//     });
//   }, [value.city, value.propertyType]);

//   const handleChange = (field, newValue) => {
//     setFilterValues((prev) => ({ ...prev, [field]: newValue }));
//   };

//   const handleSearchClick = () => {
//     if (typeof onFilterChange === "function") {
//       // Build payload from local state, but only non-default values
//       const payload = {};
//       if (filterValues.city && filterValues.city !== "") {
//         payload.city = filterValues.city;
//       }
//       if (filterValues.propertyType && filterValues.propertyType !== "") {
//         payload.propertyType = filterValues.propertyType;
//       }
//       onFilterChange(payload); // Sends to GridView: updates filters, URL, re-fetch, page=1

//       // Close the panel after applying filters
//       if (typeof onPanelClose === "function") {
//         onPanelClose();
//       }
//     }
//   };

//   // Reset handler syncs local state immediately
//   const handleClear = () => {
//     // Close first
//     if (typeof onPanelClose === "function") {
//       onPanelClose();
//     }

//     // Then clear filters
//     setFilterValues({ city: "", propertyType: "" });
//     if (typeof clearFilter === "function") {
//       clearFilter();
//     }
//   };

//   // ✅ FIXED: Check LOCAL (pending) OR GLOBAL (applied) for instant UX
//   const hasActiveFilters = !!(
//     filterValues.city ||
//     filterValues.propertyType ||
//     value.city ||
//     value.propertyType
//   );

//   // Guard against empty uniques (e.g., slow MasterData load on mobile)
//   if (uniqueCities.length === 0 || uniquePropertyTypes.length === 0) {
//     return (
//       <Row>
//         <Col xs={12}>
//           <div className="text-center p-3">Loading filter options...</div>
//         </Col>
//       </Row>
//     );
//   }

//   return (
//     <Row className="gx-3">
//       {/* City Dropdown - Full Width */}
//       <Col xs={12} lg={12} sm={12}>
//         <label className="form-label">{label ? `${label} City` : "City"}</label>
//         <select
//           className="form-select"
//           value={filterValues.city}
//           onChange={(e) => handleChange("city", e.target.value)}
//         >
//           <option value="">All Cities</option>
//           {uniqueCities.map((city, idx) => (
//             <option key={`${city}-${idx}`} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </Col>

//       {/* Property Type Dropdown - Full Width */}
//       <Col xs={12} lg={12} sm={12}>
//         <label className="form-label" id="propertyTypeLabel">
//           {label ? `${label} Property Type` : "Property Type"}
//         </label>
//         <select
//           className="form-select"
//           value={filterValues.propertyType}
//           onChange={(e) => handleChange("propertyType", e.target.value)}
//         >
//           <option value="">All Property Types</option>
//           {uniquePropertyTypes.map((type, idx) => (
//             <option key={`${type}-${idx}`} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </Col>

//       {/* Buttons */}
//       <Col
//         xs={12}
//         lg={12}
//         sm={12}
//         style={{ display: "flex", gap: "10px", marginTop: "1rem" }}
//       >
//         <button
//           type="button"
//           className="btn btn-gradient"
//           onClick={handleSearchClick}
//         >
//           Search
//         </button>

//         {/* Reset only if filters active (now instant!) */}
//         {hasActiveFilters && (
//           <button
//             type="button"
//             className="btn btn-outline-dark"
//             onClick={handleClear}
//           >
//             Reset
//           </button>
//         )}
//       </Col>
//     </Row>
//   );
// };

// export default InputForm;
