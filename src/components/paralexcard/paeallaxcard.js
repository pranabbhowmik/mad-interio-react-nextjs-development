import { motion, useTransform } from "framer-motion";
import styles from "./parallax-card.module.scss";

export default function ParallaxCard({
  i,
  title,
  description,
  image,
  ctaText,
  progress,
  link,
  range,
  targetScale,
  alt,
  imageDescription,
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const offset = 20;

  return (
    <motion.div
      style={{
        scale,
        top: `calc(${80 + i * offset}px)`,
        "--bg-image": `url(${image})`,
        "--bg-alt": `"${alt}"`,
        "--bg-image-description": `"${imageDescription}"`,
      }}
      className={styles.card}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <a href={link}>
          <button className={styles.ctaButton}>{ctaText}</button>
        </a>
      </div>
    </motion.div>
  );
}
