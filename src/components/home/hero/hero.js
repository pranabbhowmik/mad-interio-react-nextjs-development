// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./hero.module.scss";

// export default function Hero() {
//   const [isCityOpen, setIsCityOpen] = useState(false);
//   const [isRoomsOpen, setIsRoomsOpen] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("All Cities");
//   const [selectedRooms, setSelectedRooms] = useState("All Property Types");
//   const [cities, setCities] = useState([]);
//   const [roomsTypes, setRoomsTypes] = useState([]);
//   const [citySearch, setCitySearch] = useState("");
//   const [roomsSearch, setRoomsSearch] = useState("");
//   const [highlightedCityIndex, setHighlightedCityIndex] = useState(-1);
//   const [highlightedRoomsIndex, setHighlightedRoomsIndex] = useState(-1);
//   const router = useRouter();

//   const cityMenuRef = useRef(null);
//   const roomsMenuRef = useRef(null);
//   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

//   const toggleCityDropdown = () => setIsCityOpen(!isCityOpen);
//   const toggleRoomsDropdown = () => setIsRoomsOpen(!isRoomsOpen);

//   const selectCity = (city) => {
//     setSelectedCity(city);
//     setHighlightedCityIndex(-1);
//     setIsCityOpen(false);
//   };

//   const selectRooms = (type) => {
//     setSelectedRooms(type);
//     setHighlightedRoomsIndex(-1);
//     setIsRoomsOpen(false);
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (selectedCity !== "All Cities") params.append("city", selectedCity);
//     if (selectedRooms !== "All Property Types")
//       params.append("propertyType", selectedRooms);

//     const queryString = params.toString();
//     router.push(queryString ? `/designers?${queryString}` : "/designers");
//   };

//   useEffect(() => {
//     const fetchMasterData = async () => {
//       try {
//         const res = await fetch(`${SITE_URL}/MasterData`);
//         const result = await res.json();
//         const data = result?.data || {};

//         // Directly use cities and propertyTypes from API
//         const apiCities = data.cities || [];
//         const apiPropertyTypes = data.propertyTypes || [];

//         setCities(["All Cities", ...apiCities.map((c) => c.trim())]);
//         setRoomsTypes(["All Property Types", ...apiPropertyTypes]);
//       } catch (err) {
//         console.error("Error fetching master data:", err);
//       }
//     };

//     fetchMasterData();
//   }, []);

//   useEffect(() => {
//     if (!isCityOpen) {
//       setCitySearch("");
//       setHighlightedCityIndex(-1);
//     }
//   }, [isCityOpen]);

//   useEffect(() => {
//     if (!isRoomsOpen) {
//       setRoomsSearch("");
//       setHighlightedRoomsIndex(-1);
//     }
//   }, [isRoomsOpen]);

//   // Reset highlighted index when search changes
//   useEffect(() => {
//     setHighlightedCityIndex(-1);
//   }, [citySearch]);

//   useEffect(() => {
//     setHighlightedRoomsIndex(-1);
//   }, [roomsSearch]);

//   // Focus and scroll to highlighted option
//   useEffect(() => {
//     if (highlightedCityIndex >= 0 && cityMenuRef.current) {
//       const options = cityMenuRef.current.querySelectorAll(".dropdownOption");
//       const btn = options[highlightedCityIndex];
//       btn?.focus();
//       btn?.scrollIntoView({ block: "nearest" });
//     }
//   }, [highlightedCityIndex]);

//   useEffect(() => {
//     if (highlightedRoomsIndex >= 0 && roomsMenuRef.current) {
//       const options = roomsMenuRef.current.querySelectorAll(".dropdownOption");
//       const btn = options[highlightedRoomsIndex];
//       btn?.focus();
//       btn?.scrollIntoView({ block: "nearest" });
//     }
//   }, [highlightedRoomsIndex]);

//   useEffect(() => {
//     const addSmoothScroll = (ref) => {
//       if (!ref?.current) return;
//       const el = ref.current;

//       const handleWheel = (e) => {
//         const { scrollTop, scrollHeight, clientHeight } = el;
//         const atTop = scrollTop === 0;
//         const atBottom = scrollTop + clientHeight >= scrollHeight;

//         // if the user tries to scroll beyond bounds, allow normal page scroll
//         if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
//           return; // don't block scroll bubbling
//         }

//         // otherwise prevent page scroll
//         e.preventDefault();
//         e.stopPropagation();

//         // smooth scrolling inside dropdown
//         el.scrollBy({
//           top: e.deltaY,
//           behavior: "smooth",
//         });
//       };

//       el.addEventListener("wheel", handleWheel, { passive: false });
//       return () => el.removeEventListener("wheel", handleWheel);
//     };

//     if (isCityOpen) addSmoothScroll(cityMenuRef);
//     if (isRoomsOpen) addSmoothScroll(roomsMenuRef);
//   }, [isCityOpen, isRoomsOpen]);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cityMenuRef.current && !cityMenuRef.current.contains(event.target)) {
//         setIsCityOpen(false);
//         setHighlightedCityIndex(-1);
//       }

//       if (
//         roomsMenuRef.current &&
//         !roomsMenuRef.current.contains(event.target)
//       ) {
//         setIsRoomsOpen(false);
//         setHighlightedRoomsIndex(-1);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const filteredCities = cities.filter((city) =>
//     city.toLowerCase().includes(citySearch.toLowerCase())
//   );

//   const filteredRoomsTypes = roomsTypes.filter((type) =>
//     type.toLowerCase().includes(roomsSearch.toLowerCase())
//   );

//   const handleCityInputKeyDown = (e) => {
//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         const nextCityIndex =
//           highlightedCityIndex < 0
//             ? 0
//             : Math.min(highlightedCityIndex + 1, filteredCities.length - 1);
//         setHighlightedCityIndex(nextCityIndex);
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         if (highlightedCityIndex <= 0) {
//           setHighlightedCityIndex(-1);
//           // Input remains focused
//         } else {
//           setHighlightedCityIndex(Math.max(highlightedCityIndex - 1, 0));
//         }
//         break;
//       case "Enter":
//         e.preventDefault();
//         if (highlightedCityIndex >= 0 && filteredCities[highlightedCityIndex]) {
//           selectCity(filteredCities[highlightedCityIndex]);
//         }
//         break;
//       case "Escape":
//         setIsCityOpen(false);
//         setHighlightedCityIndex(-1);
//         break;
//     }
//   };

//   const handleRoomsInputKeyDown = (e) => {
//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         const nextRoomsIndex =
//           highlightedRoomsIndex < 0
//             ? 0
//             : Math.min(
//                 highlightedRoomsIndex + 1,
//                 filteredRoomsTypes.length - 1
//               );
//         setHighlightedRoomsIndex(nextRoomsIndex);
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         if (highlightedRoomsIndex <= 0) {
//           setHighlightedRoomsIndex(-1);
//           // Input remains focused
//         } else {
//           setHighlightedRoomsIndex(Math.max(highlightedRoomsIndex - 1, 0));
//         }
//         break;
//       case "Enter":
//         e.preventDefault();
//         if (
//           highlightedRoomsIndex >= 0 &&
//           filteredRoomsTypes[highlightedRoomsIndex]
//         ) {
//           selectRooms(filteredRoomsTypes[highlightedRoomsIndex]);
//         }
//         break;
//       case "Escape":
//         setIsRoomsOpen(false);
//         setHighlightedRoomsIndex(-1);
//         break;
//     }
//   };

//   const handleCityOptionKeyDown = (e, index) => {
//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         const nextCityIndex = Math.min(index + 1, filteredCities.length - 1);
//         setHighlightedCityIndex(nextCityIndex);
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         if (index === 0) {
//           setHighlightedCityIndex(-1);
//           const input = cityMenuRef.current?.querySelector(".searchInput");
//           input?.focus();
//         } else {
//           setHighlightedCityIndex(Math.max(index - 1, 0));
//         }
//         break;
//       case "Enter":
//         e.preventDefault();
//         selectCity(filteredCities[index]);
//         break;
//       case "Escape":
//         setIsCityOpen(false);
//         setHighlightedCityIndex(-1);
//         break;
//     }
//   };

//   const handleRoomsOptionKeyDown = (e, index) => {
//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         const nextRoomsIndex = Math.min(
//           index + 1,
//           filteredRoomsTypes.length - 1
//         );
//         setHighlightedRoomsIndex(nextRoomsIndex);
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         if (index === 0) {
//           setHighlightedRoomsIndex(-1);
//           const input = roomsMenuRef.current?.querySelector(".searchInput");
//           input?.focus();
//         } else {
//           setHighlightedRoomsIndex(Math.max(index - 1, 0));
//         }
//         break;
//       case "Enter":
//         e.preventDefault();
//         selectRooms(filteredRoomsTypes[index]);
//         break;
//       case "Escape":
//         setIsRoomsOpen(false);
//         setHighlightedRoomsIndex(-1);
//         break;
//     }
//   };

//   return (
//     <section className={styles.heroWrapper}>
//       <div className={styles.hero}>
//         <div className={styles.heroInner}>
//           <video
//             className={styles.video}
//             src="/assets/video/backgroundvideo.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />
//           <div className={styles.overlay} />

//           <div className={styles.content}>
//             <h1>Connect with Top Interior Designers Easily</h1>
//             <p>
//               Discover skilled interior designers who bring your vision to life.
//               Explore portfolios, compare styles, and start your dream project
//               today.
//             </p>
//             <a href="/designers">
//               <button className={styles.cta}>Find Designer →</button>
//             </a>
//           </div>
//         </div>

//         {/* Search Box */}
//         <div className={styles.searchBox}>
//           {/* City Dropdown */}
//           <div className={styles.customDropdown}>
//             <button
//               className={styles.dropdownTrigger}
//               onClick={toggleCityDropdown}
//             >
//               {selectedCity}
//               <span className={styles.dropdownArrow}>▼</span>
//             </button>
//             {isCityOpen && (
//               <div className={styles.dropdownMenu} ref={cityMenuRef}>
//                 <div className={styles.searchInputWrapper}>
//                   <img
//                     src="/assets/images/icon/search-icon-city.png" // Replace with the path to your uploaded image
//                     className={styles.searchImage}
//                     alt="Search cities"
//                     loading="lazy"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search Cities..."
//                     value={citySearch}
//                     onChange={(e) => setCitySearch(e.target.value)}
//                     className={styles.searchInput}
//                     onKeyDown={handleCityInputKeyDown}
//                   />
//                 </div>
//                 {filteredCities.length > 0 ? (
//                   filteredCities.map((city, index) => (
//                     <button
//                       key={city}
//                       className={styles.dropdownOption}
//                       onClick={() => selectCity(city)}
//                       onKeyDown={(e) => handleCityOptionKeyDown(e, index)}
//                     >
//                       {city}
//                     </button>
//                   ))
//                 ) : (
//                   <p className={styles.emptyText}>
//                     {citySearch
//                       ? "No matching cities found"
//                       : "No cities found"}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Rooms Type Dropdown */}
//           <div className={styles.customDropdown}>
//             <button
//               className={styles.dropdownTrigger}
//               onClick={toggleRoomsDropdown}
//             >
//               {selectedRooms}
//               <span className={styles.dropdownArrow}>▼</span>
//             </button>
//             {isRoomsOpen && (
//               <div className={styles.dropdownMenu} ref={roomsMenuRef}>
//                 <div className={styles.searchInputWrapper}>
//                   <img
//                     src="/assets/images/icon/search-icon-city.png" // Replace with the path to your uploaded image
//                     className={styles.searchImage}
//                     alt="Search property types"
//                     loading="lazy"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search Property Types..."
//                     value={roomsSearch}
//                     onChange={(e) => setRoomsSearch(e.target.value)}
//                     className={styles.searchInput}
//                     onKeyDown={handleRoomsInputKeyDown}
//                   />
//                 </div>
//                 {filteredRoomsTypes.length > 0 ? (
//                   filteredRoomsTypes.map((type, index) => (
//                     <button
//                       key={type}
//                       className={styles.dropdownOption}
//                       onClick={() => selectRooms(type)}
//                       onKeyDown={(e) => handleRoomsOptionKeyDown(e, index)}
//                     >
//                       {type}
//                     </button>
//                   ))
//                 ) : (
//                   <p className={styles.emptyText}>
//                     {roomsSearch
//                       ? "No matching property types found"
//                       : "No types found"}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <button className={styles.searchBtn} onClick={handleSearch}>
//             <img
//               src="/assets/images/icon/search.png"
//               loading="lazy"
//               alt="Search the design"
//             />
//             <span>Search</span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import styles from "./hero.module.scss";

export default function Hero() {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedRooms, setSelectedRooms] = useState("All Property Types");
  const [cities, setCities] = useState([]);
  const [roomsTypes, setRoomsTypes] = useState([]);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const router = useRouter();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city, label: city })),
    [cities]
  );
  const heroSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 56,
      borderRadius: 999,
      borderWidth: 2,

      borderColor: state.isFocused ? "#984b01" : "#e4e7ec",

      backgroundColor: "#ffffff",

      boxShadow: state.isFocused ? "0 0 0 4px rgba(152, 75, 1, 0.18)" : "none",

      transition: "all 0.2s ease",

      "&:hover": {
        borderColor: "#984b01",
      },

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
      borderRadius: 16,
      marginTop: 8,
      zIndex: 9999,
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
    }),
  };

  const roomsOptions = useMemo(
    () => roomsTypes.map((type) => ({ value: type, label: type })),
    [roomsTypes]
  );

  const selectCity = (option) => {
    setSelectedCity(option ? option.value : "All Cities");
  };

  const selectRooms = (option) => {
    setSelectedRooms(option ? option.value : "All Property Types");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity !== "All Cities") params.append("city", selectedCity);
    if (selectedRooms !== "All Property Types")
      params.append("propertyType", selectedRooms);

    const queryString = params.toString();
    router.push(queryString ? `/designers?${queryString}` : "/designers");
  };

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await fetch(`${SITE_URL}/MasterData`);
        const result = await res.json();
        const data = result?.data || {};

        // Directly use cities and propertyTypes from API
        const apiCities = data.cities || [];
        const apiPropertyTypes = data.propertyTypes || [];

        setCities(["All Cities", ...apiCities.map((c) => c.trim())]);
        setRoomsTypes(["All Property Types", ...apiPropertyTypes]);
      } catch (err) {
        console.error("Error fetching master data:", err);
      }
    };

    fetchMasterData();
  }, []);

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <video
            className={styles.video}
            src="/assets/video/backgroundvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.overlay} />

          <div className={styles.content}>
            <h1>Connect with Top Interior Designers Easily</h1>
            <p>
              Discover skilled interior designers who bring your vision to life.
              Explore portfolios, compare styles, and start your dream project
              today.
            </p>
            <a href="/designers">
              <button className={styles.cta}>Find Designer →</button>
            </a>
          </div>
        </div>

        {/* Search Box */}
        <div className={styles.searchBox}>
          {/* City Dropdown */}
          <div className={styles.customDropdown}>
            <div className={styles.selectWrapper}>
              {cityMenuOpen && <span></span>}
              <Select
                classNamePrefix="react-select"
                options={cityOptions}
                value={cityOptions.find((opt) => opt.value === selectedCity)}
                onChange={selectCity}
                placeholder="All Cities"
                isSearchable
                styles={heroSelectStyles} // ✅ ADD THIS
                onMenuOpen={() => setCityMenuOpen(true)}
                onMenuClose={() => setCityMenuOpen(false)}
                noOptionsMessage={() => "No matching cities found"}
              />
            </div>
          </div>

          {/* Rooms Type Dropdown */}
          <div className={styles.customDropdown}>
            <div className={styles.selectWrapper}>
              <Select
                classNamePrefix="react-select"
                options={roomsOptions}
                value={roomsOptions.find((opt) => opt.value === selectedRooms)}
                onChange={selectRooms}
                placeholder="All Property Types"
                isSearchable
                styles={heroSelectStyles} // ✅ ADD THIS
                onMenuOpen={() => setRoomsMenuOpen(true)}
                onMenuClose={() => setRoomsMenuOpen(false)}
                noOptionsMessage={() => "No matching property types found"}
              />
            </div>
          </div>

          <button className={styles.searchBtn} onClick={handleSearch}>
            <img
              src="/assets/images/icon/search.png"
              loading="lazy"
              alt="Search the design"
            />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
}
