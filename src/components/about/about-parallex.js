// Modified about-parallex.js
import ParallaxCard from "./paeallaxcard";
import data from "@/data/ourVision.json";

import styles from "./parallax-cards.module.scss";
import { Container } from "reactstrap";

export default function AboutParallaxCards() {
  return (
    <div className={styles.explore}>
      <section className={styles.categorySection}>
        <Container>
          <div class="title-2 text-start">
            <h2>What Makes Us Different</h2>
            <p>Simple, Transparent, And Local</p>
          </div>
          <main className={styles.container} id="work">
            {data.map((card, i) => {
              return <ParallaxCard key={i} i={i} {...card} />;
            })}
          </main>
        </Container>
      </section>
    </div>
  );
}
