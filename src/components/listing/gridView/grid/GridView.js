import React, { useEffect, useReducer, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "../../../../layout/Pagination";
import Filter from "../../../../layout/sidebarLayout/Filter";
import Header from "../../../../layout/sidebarLayout/Header";
import Sidebar from "../../../../layout/sidebarLayout/Sidebar";
import GridLayout from "../../elements/GridLayout";
import FilterTag from "../../elements/FilterTag";
import { gridReducer, initialGrid } from "./gridReducer";
import FilterBroke from "@/components/common/ListingSkeleton";
import ContentLoader from "react-content-loader";

const GridView = ({
  side,
  size,
  gridType,
  listSize,
  mapModal,
  mapView,
  relativeSlider,
  gridBar,
  video,
  tabHeader,
  setMapModal,
  children,
  AdvancedSearchShow,
  infiniteScroll,
  myList,
}) => {
  const [filteredValue, setFilteredValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);
  const [filters, setFilters] = useState({});
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniquePropertyTypes, setUniquePropertyTypes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [allData, setAllData] = useState([]); // NEW: For local filtering fallback (if API ignores params)
  // NEW: Desktop detection for sidebar visibility
  const [isDesktop, setIsDesktop] = useState(false);

  // NEW: Ref for the Header section to scroll to
  const headerRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const lastParamsRef = useRef("");

  const PageSize = 6;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  // NEW: Detect desktop (lg+ breakpoint) for sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992); // Bootstrap lg breakpoint
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // set grid defaults
  useEffect(() => {
    gridDispatch({ type: "gridSize", payload: size });
    gridDispatch({ type: "gridStyle", payload: gridType });
  }, [size, gridType]);

  // Initialize filters from URL params
  // Initialize filters from URL params (only if changed to avoid double-fetch)
  useEffect(() => {
    const initialCity = searchParams.get("city");
    const initialPropertyType = searchParams.get("propertyType");

    const cleanFilters = {};
    if (initialCity && initialCity !== "All Cities") {
      cleanFilters.city = initialCity;
    }
    if (initialPropertyType && initialPropertyType !== "All Property Types") {
      cleanFilters.propertyType = initialPropertyType;
    }

    // Only update if filters actually differ (prevents redundant setState + double-fetch)
    const shouldUpdateFilters =
      JSON.stringify(cleanFilters) !== JSON.stringify(filters);

    if (shouldUpdateFilters) {
      setFilters(cleanFilters);
      gridDispatch({ type: "toPage", payload: 1 });
    }

    // Set initialized only once (initial load)
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [searchParams]); // Keep deps as [searchParams]—avoids loops

  // fetch unique dropdown values ONCE
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(`${SITE_URL}/MasterData`);
        const result = await res.json();
        const data = result?.data || {};

        const apiCities = data.cities || [];
        const apiPropertyTypes = data.propertyTypes || [];

        const cities = [...apiCities.map((c) => c.trim()).sort()];
        const propertyTypes = [...apiPropertyTypes.sort()];

        setUniqueCities(cities);
        setUniquePropertyTypes(propertyTypes);
      } catch (err) {
        console.error("Error fetching initial data for dropdowns:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch data (API driven)
  useEffect(() => {
    if (!isInitialized) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          PageNo: grid.toPage,
          PageSize: PageSize,
        });

        if (sortBy && sortBy !== "") {
          params.append("SortBy", sortBy);
        }

        // Append filters
        if (filters.city && filters.city !== "All Cities") {
          params.append("city", filters.city);
        }
        if (
          filters.propertyType &&
          filters.propertyType !== "All Property Types"
        ) {
          params.append("propertyType", filters.propertyType);
        }

        // NEW: Debug logging
        // console.log("Fetching with params:", params.toString());

        const res = await fetch(
          `${SITE_URL}/Professionals?${params.toString()}`
        );
        const result = await res.json();

        const professionals = result?.data?.pageData || [];
        setFilteredValue(professionals); // Direct from API (dynamic if backend filters)

        // OPTIONAL FALLBACK: If backend ignores filters, fetch ALL data once and filter locally
        // Uncomment below if needed (but disable pagination or adjust for full dataset)
        /*
        if (grid.toPage === 1) { // Fetch all only on page 1
          const allParams = new URLSearchParams({ PageSize: 999 }); // Large to get all
          const allRes = await fetch(`${SITE_URL}/Professionals?${allParams.toString()}`);
          const allResult = await allRes.json();
          setAllData(allResult?.data?.pageData || []);
        }
        let localFiltered = allData;
        if (filters.city) localFiltered = localFiltered.filter(p => p.city === filters.city);
        if (filters.propertyType) localFiltered = localFiltered.filter(p => p.propertyType === filters.propertyType);
        const paginated = localFiltered.slice((grid.toPage - 1) * PageSize, grid.toPage * PageSize);
        setFilteredValue(paginated);
        gridDispatch({ type: "totalPages", payload: Math.ceil(localFiltered.length / PageSize) });
        gridDispatch({ type: "productCount", payload: localFiltered.length });
        */

        const totalCount = result?.data?.totalCount || 0;
        const totalPages = Math.max(1, Math.ceil(totalCount / PageSize));

        gridDispatch({ type: "totalPages", payload: totalPages });
        gridDispatch({ type: "productCount", payload: totalCount });
      } catch (err) {
        console.error("Error fetching sorted data:", err);
        setFilteredValue([]);
        gridDispatch({ type: "totalPages", payload: 1 });
        gridDispatch({ type: "productCount", payload: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [grid.toPage, sortBy, filters, isInitialized]);

  // UPDATED: Auto-scroll to Header on component mount (triggers on navbar click/navigation to /designers)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 500); // Delay for full render/load (adjust if needed)

    return () => clearTimeout(timer);
  }, []); // Run once on mount (every navigation to this page)

  // Handle individual filter removal (for tags)
  const handleRemoveFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    gridDispatch({ type: "toPage", payload: 1 });

    // UPDATED: Manual history update (no refetch)
    const params = new URLSearchParams(newFilters);
    const newUrl = `/designers?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  // UPDATED: In handleFilterChange (same pattern)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    gridDispatch({ type: "toPage", payload: 1 });

    // UPDATED: Manual history update (no refetch)
    const params = new URLSearchParams(newFilters);
    const newUrl = `/designers?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  // UPDATED: In handleClearFilters
  const handleClearFilters = () => {
    setFilters({});
    setSortBy("");
    gridDispatch({ type: "toPage", payload: 1 });

    // UPDATED: Manual history update (no refetch)
    window.history.replaceState(null, "", "/designers");
  };
  const handleSortChange = (option) => {
    setSortBy(option);
    gridDispatch({ type: "toPage", payload: 1 });
  };

  // UPDATED: Show sidebar if 'side' is true OR on desktop
  const showSidebar = side || isDesktop;

  return (
    <section
      className={`property-section ${
        mapView && mapModal === "view" ? "section-sm" : ""
      } ${relativeSlider ? "property-list-thumbnail" : ""}`}
    >
      <Container>
        <Row className="ratio_63">
          {showSidebar && (
            <Sidebar side={side || "left"}>
              {" "}
              {/* Default to 'left' if not provided */}
              <Filter
                value={filters}
                sm={6}
                lg={6}
                onFilterChange={handleFilterChange}
                clearFilter={handleClearFilters}
                uniqueCities={uniqueCities}
                uniquePropertyTypes={uniquePropertyTypes}
              />
            </Sidebar>
          )}

          <Col
            xl={showSidebar ? "9" : "12"}
            lg={showSidebar ? "8" : "12"}
            className={`${
              relativeSlider ? "property-grid-3" : "property-grid-2"
            } property-grid-slider`}
          >
            {/* UPDATED: Attach ref to Header for auto-scroll */}
            <Header
              ref={headerRef}
              grid={grid}
              gridDispatch={gridDispatch}
              title={"Professionals Listing"}
              mapModal={mapModal}
              gridBar={gridBar}
              tabHeader={tabHeader}
              AdvancedSearchShow={AdvancedSearchShow}
              value={filteredValue}
              setMapModal={setMapModal}
              onSortChange={handleSortChange}
              productCount={grid.productCount}
              filters={filters}
              uniqueCities={uniqueCities}
              uniquePropertyTypes={uniquePropertyTypes}
              onFilterChange={handleFilterChange}
              clearFilter={handleClearFilters}
            />

            {/* Render Filter Tags (only if active) */}
            {Object.keys(filters).length > 0 && (
              <FilterTag
                activeFilters={filters}
                onRemove={handleRemoveFilter}
              />
            )}

            {children}
            <div
              className={`property-wrapper-grid ${
                grid.gridStyle ? "list-view" : ""
              }`}
            >
              {loading ? (
                <ContentLoader className="skeleton-svg">
                  <rect className="skeleton-img" />
                  <rect className="skeleton-c1" />
                  <rect className="skeleton-c2" />
                  <rect className="skeleton-c3" />
                </ContentLoader>
              ) : filteredValue.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <FilterBroke />
                  <button
                    onClick={handleClearFilters}
                    className="btn btn-gradient mt-3"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <GridLayout
                  grid={grid}
                  myList={myList}
                  value={filteredValue}
                  listSize={listSize}
                  relativeSlider={relativeSlider}
                  video={video}
                  gridDispatch={gridDispatch}
                  infiniteScroll={infiniteScroll}
                />
              )}
            </div>

            {!infiniteScroll && grid.totalPages > 1 && (
              <Pagination
                toPage={grid.toPage}
                gridDispatch={gridDispatch}
                totalPages={grid.totalPages}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
