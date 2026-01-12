// import React, { useState } from "react";
// import { Row, Col } from "reactstrap";
// import Img from "@/utils/BackgroundImageRatio";

// const GalleryDeskBox = ({ gallery }) => {
//   const galleryImages = gallery?.galleryImages || [];
//   const id = gallery?.id;

//   const [isOpen, setIsOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   if (!galleryImages.length) return null;

//   const currentItem = galleryImages[index];

//   const openLightbox = (i) => {
//     setIndex(i);
//     setIsOpen(true);
//   };

//   const closeLightbox = () => {
//     setIsOpen(false);
//   };

//   const goToPrev = () => {
//     setIndex(
//       (prev) => (prev + galleryImages.length - 1) % galleryImages.length
//     );
//   };

//   const goToNext = () => {
//     setIndex((prev) => (prev + 1) % galleryImages.length);
//   };

//   return (
//     <div className="desc-box px-2" id="gallery">
//       <Row className="gy-3 px-2 py-3 align-items-stretch">
//         <h4 className="content-title mb-1">Gallery</h4>

//         {galleryImages.slice(0, 3).map((item, i) => (
//           <Col lg="4" sm="6" xs="6" key={i}>
//             <div
//               className="gallery-item card shadow-sm border-0 h-100"
//               style={{
//                 cursor: "pointer",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//               }}
//               onClick={() => openLightbox(i)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-5px)";
//                 e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//               }}
//             >
//               {item.type === "Image" ? (
//                 <div
//                   className="image-container"
//                   style={{
//                     position: "relative",
//                     paddingTop: "75%",
//                     backgroundColor: "#f8f9fa",
//                   }}
//                 >
//                   <Img
//                     src={item.imageVideoUrl}
//                     className="bg-img"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/assets/images/lightbox-fallback.jpg";
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="video-container"
//                   style={{
//                     position: "relative",
//                     paddingTop: "75%",
//                     backgroundColor: "#f8f9fa", // Changed from "#000" to match images
//                   }}
//                 >
//                   <video
//                     src={item.imageVideoUrl}
//                     muted
//                     loop
//                     playsInline
//                     preload="metadata" // Helps load first frame faster
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <div
//                     className="video-overlay"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background: "rgba(0,0,0,0.3)",
//                       transition: "background 0.3s ease",
//                     }}
//                   >
//                     <div
//                       style={{
//                         background: "rgba(255,255,255,0.9)",
//                         borderRadius: "50%",
//                         width: "60px",
//                         height: "60px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         transition: "transform 0.3s ease",
//                       }}
//                     >
//                       <i className="fas fa-play text-#984b01"></i>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </Col>
//         ))}
//       </Row>

//       {/* VIEW MORE */}
//       <Row>
//         <Col className="text-center">
//           <a target="_blank" href={`/gallery/${id}`}>
//             <button
//               className="btn btn-solid mt-3"
//               style={{ marginBottom: "20px" }}
//             >
//               View More →
//             </button>
//           </a>
//         </Col>
//       </Row>

//       {/* CUSTOM LIGHTBOX */}
//       {isOpen && currentItem && (
//         <div
//           className="lightbox-modal"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.95)",
//             zIndex: 9999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={closeLightbox}
//             className="lightbox-close-btn"
//             style={{
//               position: "absolute",
//               top: "20px",
//               right: "20px",
//               background: "rgba(255, 255, 255, 0.1)",
//               border: "none",
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               color: "white",
//               fontSize: "24px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "background 0.3s ease",
//               zIndex: 10000,
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
//             }
//           >
//             ✕
//           </button>

//           {/* Navigation Buttons */}
//           <button
//             onClick={goToPrev}
//             className="lightbox-nav-btn prev"
//             style={{
//               position: "absolute",
//               left: "20px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "rgba(255, 255, 255, 0.1)",
//               border: "none",
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               color: "white",
//               fontSize: "24px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "background 0.3s ease",
//               zIndex: 10000,
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
//             }
//           >
//             ‹
//           </button>

//           <button
//             onClick={goToNext}
//             className="lightbox-nav-btn next"
//             style={{
//               position: "absolute",
//               right: "20px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "rgba(255, 255, 255, 0.1)",
//               border: "none",
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               color: "white",
//               fontSize: "24px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "background 0.3s ease",
//               zIndex: 10000,
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
//             }
//           >
//             ›
//           </button>

//           {/* Media Content */}
//           <div
//             className="lightbox-content"
//             style={{
//               width: "90vw",
//               maxWidth: "1200px",
//               height: "80vh",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "20px",
//             }}
//           >
//             {currentItem.type === "Image" ? (
//               <img
//                 src={currentItem.imageVideoUrl}
//                 alt={`Gallery image ${index + 1}`}
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "100%",
//                   objectFit: "contain",
//                   borderRadius: "8px",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//                 }}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/assets/images/lightbox-fallback.jpg";
//                 }}
//               />
//             ) : (
//               <video
//                 src={currentItem.imageVideoUrl}
//                 controls
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "100%",
//                   borderRadius: "8px",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//                 }}
//                 controlsList="nodownload"
//                 onError={(e) => {
//                   console.error(
//                     "Video failed to load:",
//                     currentItem.imageVideoUrl
//                   );
//                 }}
//               />
//             )}
//           </div>

//           {/* Counter */}
//           <div
//             className="lightbox-counter"
//             style={{
//               position: "absolute",
//               bottom: "20px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               color: "white",
//               fontSize: "16px",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               padding: "8px 20px",
//               borderRadius: "20px",
//               backdropFilter: "blur(5px)",
//               zIndex: 10000,
//             }}
//           >
//             {index + 1} / {galleryImages.length}
//           </div>

//           {/* Media Type Indicator */}
//           <div
//             className="lightbox-type-indicator"
//             style={{
//               position: "absolute",
//               top: "20px",
//               left: "20px",
//               color: "white",
//               fontSize: "14px",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               padding: "6px 12px",
//               borderRadius: "12px",
//               backdropFilter: "blur(5px)",
//               zIndex: 10000,
//             }}
//           >
//             {currentItem.type}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .video-container:hover .video-overlay {
//           background: rgba(0, 0, 0, 0.2) !important;
//         }

//         .video-container:hover .video-overlay div {
//           transform: scale(1.1);
//         }

//         @media (max-width: 768px) {
//           .lightbox-content {
//             padding: 10px !important;
//           }

//           .lightbox-nav-btn,
//           .lightbox-close-btn {
//             width: 40px !important;
//             height: 40px !important;
//             font-size: 20px !important;
//           }
//         }

//         @media (max-width: 576px) {
//           .gallery-item {
//             margin-bottom: 15px;
//           }

//           .lightbox-nav-btn {
//             left: 10px !important;
//             right: 10px !important;
//             top: auto !important;
//             bottom: 20px !important;
//             transform: none !important;
//           }

//           .lightbox-nav-btn.prev {
//             left: 20px !important;
//           }

//           .lightbox-nav-btn.next {
//             right: 20px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GalleryDeskBox;

import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Row } from "reactstrap";
import Img from "@/utils/BackgroundImageRatio";

const GalleryDeskBox = ({ gallery }) => {
  const galleryImages = gallery?.galleryImages || [];
  const id = gallery?.id;
  console.log("Gallery ID:", id);

  if (!galleryImages.length) return null;

  const displayedImages = galleryImages.slice(0, 3);

  return (
    <div className="desc-box px-2" id="gallery">
      <Gallery>
        <Row className="portfolio-section zoom-gallery-multiple gy-3 px-2 px-md-3 py-2 py-md-3">
          <h4 className="content-title mb-1">Gallery</h4>
          {displayedImages.map((image, i) => (
            <Col lg="4" md="4" sm="6" xs="6" className="grid-item p-2" key={i}>
              <div className="grid-box">
                <div className="overlay">
                  <div className="portfolio-image">
                    <Item
                      original={image.imageVideoUrl}
                      width={1000}
                      height={800}
                    >
                      {({ ref, open }) => (
                        <a ref={ref} onClick={open}>
                          <Img
                            src={image.imageVideoUrl}
                            className="bg-img"
                            alt={`Gallery image ${i + 1}`}
                          />
                        </a>
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Gallery>
      <Row className="gy-3 px-2 px-md-3 py-2 py-md-3">
        <Col xs="12" className="text-center">
          <a href={`/gallery/${id}`} target="_blank">
            <button type="button" className="btn btn-solid">
              View More →
            </button>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default GalleryDeskBox;
