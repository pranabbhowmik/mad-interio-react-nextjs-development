// provide.js
import styles from "./provide.module.scss";

export default function Provide() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.mainCard}>
          <h2 className={styles.mainTitle}>What We Provide</h2>
          <p className={styles.mainSubtitle}>
            A List Or Grid Format Explaining Key Features
          </p>
          <button className={styles.exploreButton}>
            Explore Designers &gt;
          </button>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Verified Interior Design Professionals
            </h3>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Portfolio Access To Help You Make Informed Decisions
            </h3>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Location-Based Recommendations Tailored
            </h3>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Reviews From Real Clients For Better Transparency
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
