import styles from "./parallax-card.module.scss";

export default function ParallaxCard({
  i,
  title,
  description,
  image,
  alt,
  imageDescription,
}) {
  const isReversed = i % 2 === 1;

  return (
    <div
      className={`${styles.card} ${isReversed ? styles.reversed : ""}`}
      style={{
        "--bg-image": `url(${image})`,
        "--bg-alt": `"${alt}"`,
        "--bg-image-description": `"${imageDescription}"`,
      }}
    >
      <div
        className={`${styles.content} ${
          isReversed ? styles.reversedContent : ""
        }`}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
