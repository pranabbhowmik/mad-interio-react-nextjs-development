"use client";
import React from "react";
import styles from "./hero.module.scss";

export default function Hero({ heading, subHeading, image }) {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <img className={styles.video} src={image} loading="lazy" />
          <div className={styles.overlay} />

          <div className={styles.content}>
            <h1>{heading}</h1>
            <p>{subHeading}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
