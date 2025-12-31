"use client";
import React from "react";
import styles from "./ourstory.module.scss";
import { Container } from "reactstrap";

export default function OurStory() {
  return (
    <Container>
      <section className={styles.storySection}>
        <div className={styles.headingWrapper}>
          {" "}
          <h2 className={styles.heading}>Our Story</h2>{" "}
          <p className={styles.subHeading}>How We Began</p>{" "}
          <button className={styles.viewBtn}>
            {" "}
            View All <span className={styles.arrow}>➝</span>{" "}
          </button>{" "}
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <img
              src="/assets/images/about/abouthero.jpg"
              alt="Our Story"
              className={styles.storyImage}
            />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.rightHeading}>
              A Brief Narrative Explaining
            </h3>
            <ul className={styles.list}>
              <li>
                The Inspiration Behind Creating A Platform Dedicated To Interior
                Design Professionals
              </li>
              <li>
                The Challenges Homeowners And Businesses Face In Finding Trusted
                Designers
              </li>
              <li>
                Why Focusing On Pune And Mumbai Ensures Tailored Recommendations
                And Local Expertise
              </li>
            </ul>

            <p className={styles.exampleTitle}>Example Text Snippet:</p>
            <p className={styles.exampleText}>
              We Understand How Overwhelming It Can Be To Choose The Right
              Interior Designer. That’s Why We Created This Platform—To Simplify
              Your Search, Provide Verified Professionals, And Empower You With
              The Tools You Need To Bring Your Vision To Life.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
