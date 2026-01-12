// "use client";

// import React, { Fragment, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "@/components/common/navbar";
// import FooterOne from "@/layout/footers/FooterOne";
// import Hero from "@/components/hero/hero";
// import { Col, Container, Row } from "reactstrap";
// import Head from "next/head";

// const GalleryPage = () => {
//   const { id } = useParams();
//   const [galleryData, setGalleryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (!id) return;

//     const fetchGallery = async () => {
//       try {
//         const res = await fetch(
//           `https://api.madservices.co.in/api/professionals/gallery/${id}`
//         );
//         const data = await res.json();

//         // Handle both response formats
//         if (data.galleryImages) {
//           setGalleryData(data.galleryImages);
//         } else if (Array.isArray(data)) {
//           setGalleryData(data);
//         } else {
//           setGalleryData([]);
//         }
//       } catch (error) {
//         console.error("Gallery fetch error:", error);
//         setGalleryData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGallery();
//   }, [id]);

//   const openLightbox = (index) => {
//     setCurrentIndex(index);
//     setLightboxOpen(true);
//   };

//   const closeLightbox = () => {
//     setLightboxOpen(false);
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!lightboxOpen) return;

//       switch (e.key) {
//         case "Escape":
//           closeLightbox();
//           break;
//         case "ArrowLeft":
//           goToPrev();
//           break;
//         case "ArrowRight":
//           goToNext();
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [lightboxOpen, currentIndex, galleryData.length]);

//   return (
//     <Fragment>
//       <Head>
//         <title>MAD INTERIO | Gallery</title>
//         <meta
//           name="description"
//           content="Explore interior design gallery images and videos"
//         />
//       </Head>

//       <Navbar />

//       <Hero
//         heading="Gallery"
//         subHeading="Explore beautiful interior design works"
//         image="/assets/images/listing/listing-hero.webp"
//       />

//       <Container className="mt-5 mb-5">
//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading gallery...</p>
//           </div>
//         ) : galleryData.length === 0 ? (
//           <div className="text-center py-5">
//             <div className="empty-state">
//               <i className="fas fa-images fa-3x text-muted mb-3"></i>
//               <h4>No gallery content found</h4>
//               <p className="text-muted">This gallery is currently empty.</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <Row className="mb-4">
//               <Col>
//                 <div className="gallery-header">
//                   <h2 className="mb-2">Design Gallery</h2>
//                   <p className="text-muted">
//                     {galleryData.length}{" "}
//                     {galleryData.length === 1 ? "item" : "items"} in this
//                     gallery
//                   </p>
//                 </div>
//               </Col>
//             </Row>

//             <Row className="gy-4">
//               {galleryData.map((item, index) => (
//                 <Col lg="3" md="4" sm="6" key={index}>
//                   <div
//                     className="gallery-item card shadow-sm border-0"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                       height: "100%",
//                     }}
//                     onClick={() => openLightbox(index)}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 10px 30px rgba(0,0,0,0.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 6px rgba(0,0,0,0.1)";
//                     }}
//                   >
//                     {item.type === "Image" ? (
//                       <div
//                         className="image-container"
//                         style={{
//                           position: "relative",
//                           paddingTop: "75%",
//                           backgroundColor: "#f8f9fa",
//                         }}
//                       >
//                         <img
//                           src={item.imageVideoUrl}
//                           alt={`Gallery image ${index + 1}`}
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src =
//                               "/assets/images/lightbox-fallback.jpg";
//                           }}
//                         />
//                       </div>
//                     ) : (
//                       <div
//                         className="video-container"
//                         style={{
//                           position: "relative",
//                           paddingTop: "75%",
//                           backgroundColor: "#000",
//                         }}
//                       >
//                         <video
//                           src={item.imageVideoUrl}
//                           muted
//                           loop
//                           playsInline
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                         <div
//                           className="video-overlay"
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             background: "rgba(0,0,0,0.3)",
//                             transition: "background 0.3s ease",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "rgba(255,255,255,0.9)",
//                               borderRadius: "50%",
//                               width: "60px",
//                               height: "60px",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               transition: "transform 0.3s ease",
//                             }}
//                           >
//                             <i className="fas fa-play text-#984b01"></i>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </>
//         )}
//       </Container>

//       {/* Custom Lightbox Modal */}
//       {lightboxOpen && galleryData[currentIndex] && (
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
//             {galleryData[currentIndex].type === "Image" ? (
//               <img
//                 src={galleryData[currentIndex].imageVideoUrl}
//                 alt={`Gallery image ${currentIndex + 1}`}
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
//                 src={galleryData[currentIndex].imageVideoUrl}
//                 controls
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "100%",
//                   borderRadius: "8px",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//                 }}
//                 controlsList="nodownload"
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
//             {currentIndex + 1} / {galleryData.length}
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
//             {galleryData[currentIndex].type}
//           </div>
//         </div>
//       )}

//       <FooterOne />

//       <style jsx>{`
//         .gallery-header {
//           border-bottom: 2px solid #f0f0f0;
//           padding-bottom: 20px;
//         }

//         .empty-state {
//           padding: 60px 20px;
//         }

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
//     </Fragment>
//   );
// };

// export default GalleryPage;

"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/navbar";
import FooterOne from "@/layout/footers/FooterOne";
import Hero from "@/components/hero/hero";
import { Col, Container, Row } from "reactstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import Img from "../../../../utils/BackgroundImageRatio";
import Head from "next/head";

const GalleryPage = () => {
  const { id } = useParams();
  const [projectImages, setProjectImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `https://api.madservices.co.in/api/professionals/gallery/${id}`
        );

        const data = await res.json();

        // API may return galleryImages OR projectImages
        const images = data;

        setProjectImages(images);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [id]);

  return (
    <Fragment>
      <Head>
        <title>MAD INTERIO | Gallery</title>
        <meta
          name="description"
          content="Explore interior design gallery images"
        />
      </Head>

      <Navbar />

      <Hero
        heading="Designer Portfolio Gallery"
        subHeading="Explore real interior designs that reflect this designer’s creativity and expertise"
        image="/assets/images/listing/listing-hero.webp"
      />

      <Container className="mt-5 mb-5">
        {loading ? (
          <p className="text-center">Loading gallery...</p>
        ) : projectImages.length === 0 ? (
          <p className="text-center">No images found</p>
        ) : (
          <Gallery>
            <Row className="portfolio-section zoom-gallery-multiple gy-md-4 gy-3 ratio_square">
              {projectImages.map((image, i) => (
                <Col lg="3" sm="6" className="grid-item" key={i}>
                  <div className="grid-box">
                    <div className="overlay">
                      <div className="portfolio-image">
                        <Item
                          original={image.imageVideoUrl}
                          thumbnail={image.imageVideoUrl}
                          width="1200"
                          height="800"
                        >
                          {({ ref, open }) => (
                            <a ref={ref} onClick={open}>
                              <Img
                                src={image.imageVideoUrl}
                                className="bg-img"
                                alt={`Gallery ${i + 1}`}
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
        )}
      </Container>

      <FooterOne />
    </Fragment>
  );
};

export default GalleryPage;
