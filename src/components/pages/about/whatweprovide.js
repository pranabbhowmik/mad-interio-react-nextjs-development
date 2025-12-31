"use client";
import { Container } from "reactstrap";
import styles from "./whatweprovide.module.scss";

export default function WhatWeProvide() {
  return (
    <Container>
      <section className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftCard}>
          <div className={styles.leftContent}>
            <div className="property-details padding-zero">
              <h2 className="text-white">What We Provide</h2>
              <p className="font-rubik text-light-white">
                Connecting you with verified interior designers.
              </p>
            </div>
          </div>
          <div className={styles.leftImage}>
            <img
              src="/assets/images/testimonial/how-it-works-background.webp"
              alt="How it works"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightCards}>
          <div className={styles.card}>
            <h3> Verified Design Experts</h3>
            <p>Connect with trusted designers and skilled 3D artists.</p>
          </div>
          <div className={styles.card}>
            <h3>Designer Portfolio Access </h3>
            <p>Browse real portfolios to find your perfect match.</p>
          </div>
          <div className={styles.card}>
            <h3>Tailored Local Suggestions</h3>
            <p>Connect with nearby designers for projects.</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
