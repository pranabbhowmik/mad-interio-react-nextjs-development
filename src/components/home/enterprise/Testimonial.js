import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { testimonial1 } from "@/data/slickSlider";
import NoSsr from "@/utils/NoSsr";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Neha Kulkarni",
      role: "Homeowner",
      place: "Homeowner, Pune",
      testimonial:
        "MAD INTERIO made finding the right interior designer effortless. I explored verified portfolios, connected with a professional, and my home turned out exactly as I imagined.",
      image: "/assets/images/testimonial/neha.webp",
    },
    {
      name: "Arjun Mehta",
      role: "Homeowner",
      place: "Café Owner, Mumbai",
      testimonial:
        "I wanted a modern, cozy vibe for my café. MAD INTERIO helped me find the perfect designer, making the process smooth, transparent, and very easy to finalize quickly.",
      image: "/assets/images/testimonial/arjun.webp",
    },
    {
      name: "Priya Shah",
      role: "Homeowner",
      place: "Architect, Pune",
      testimonial:
        "Finding trusted 3D artists and interior designers was tough before. MAD INTERIO gave me access to genuine talent and smooth communication for all my projects.",
      image: "/assets/images/testimonial/priya.webp",
    },
    {
      name: "Karan Bhosale",
      role: "Homeowner",
      place: "IT Professional, Mumbai",
      testimonial:
        "I explored multiple designers on MAD INTERIO and found one that matched my style and budget. Verified profiles and clear portfolios made the process simple.",
      image: "/assets/images/testimonial/karan.webp",
    },
    {
      name: "Riya Patil",
      role: "Homeowner",
      place: "Boutique Owner, Pune",
      testimonial:
        "MAD INTERIO helped me find the perfect designer for my boutique. Their easy search, genuine listings, and smooth process made the experience enjoyable.",
      image: "/assets/images/testimonial/riya.webp",
    },
  ];

  return (
    <section className="testimonial-style-1">
      <Container>
        <Row>
          <Col>
            <div className="title-2" id="testimonialheading">
              <h2>Our Happy Clients</h2>
              <p>See how we transform spaces with trusted designers</p>
            </div>

            <div className="slick-between service-section">
              <NoSsr>
                <Slider
                  className="testimonial-1 dot-gradient"
                  {...testimonial1}
                >
                  {testimonials.map((data, i) => (
                    <div key={i}>
                      <div className="pepole-comment">
                        <div className="client-msg">
                          <span className="quote">
                            <img
                              src="assets/images/testimonial/customer-testimonial-quote-icon.webp"
                              alt="Quotation icon representing customer testimonials"
                            />
                          </span>
                          <span className="quote-shadow">
                            <img
                              src="assets/images/testimonial/customer-testimonial-quote-shadow.webp"
                              alt="Shadow effect behind testimonial quote icon for design aesthetics"
                            />
                          </span>
                          <p>{data.testimonial}</p>
                        </div>

                        <div className="media">
                          <img src={data.image} alt={data.name} />
                          <div className="media-body">
                            <h3>{data.name}</h3>
                            <span>{data.place}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </NoSsr>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialSection;
