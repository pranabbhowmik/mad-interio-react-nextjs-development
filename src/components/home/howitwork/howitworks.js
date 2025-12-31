"use client";
import { Container } from "reactstrap";
import styles from "./howitworks.module.css";

export default function HowItWorks() {
  return (
    <Container>
      <section className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftCard}>
          <div className={styles.leftContent}>
            <div className="property-details padding-zero">
              <h2 className="text-white">How It Works</h2>
              <p className="font-rubik text-light-white">
                Simple, Transparent, and Built for Design.
              </p>
            </div>
          </div>
          <div className={styles.leftImage}>
            <img
              src="/assets/images/testimonial/how-it-works-background.webp"
              alt="Mad Interio – simple, transparent platform connecting homeowners with skilled interior designers."
              loading="lazy"
              placeholder="blur"
              blurDataURL="/assets/images/testimonial/how-it-works-background-blur.webp"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightCards}>
          <div className={styles.card}>
            <h3>Search & Discover</h3>
            <p>
              Find professionals near you by location, style, or project need.{" "}
            </p>
          </div>
          <div className={styles.card}>
            <h3>Compare & Explore</h3>
            <p>Check designer portfolios, past work, and client reviews. </p>
          </div>
          <div className={styles.card}>
            <h3>Connect Instantly</h3>
            <p>Send a message or book a consultation in just a few clicks.</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
