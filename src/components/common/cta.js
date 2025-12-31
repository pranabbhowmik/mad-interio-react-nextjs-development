"use client";
import styles from "./cta.module.scss";

export default function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay}></div>
      <div className={styles.ctaContent}>
        <h2>Let’s Find The Perfect Interior Design Partner</h2>
        <a href="/designers">
          <button className={styles.ctaButton}> Find Designer →</button>
        </a>
      </div>
    </section>
  );
}
