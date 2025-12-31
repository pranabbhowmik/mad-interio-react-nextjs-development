import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import ParallaxCard from "./paeallaxcard";
import data from "@/data/caseStudies.json";

import styles from "./parallax-cards.module.scss";
import { Container } from "reactstrap";

export default function ParallaxCards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.explore}>
      <section className={styles.categorySection}>
        <Container>
          {/* <div className={styles.header}>
            <h2>Explore By Category</h2>
            <p>One platform. All spaces </p>
          </div> */}
          <div class="title-2 text-start">
            {/* <span class="label label-gradient">New Offer</span> */}
            <h2>Explore By Category</h2>
            <p>One platform. All spaces </p>
          </div>
          <main className={styles.container} ref={container} id="work">
            {data.map((card, i) => {
              const targetScale = 1 - (data.length - i) * 0.03;
              const range = [i * 0.15, 1];

              return (
                <ParallaxCard
                  key={i}
                  i={i}
                  {...card}
                  progress={scrollYProgress}
                  range={range}
                  targetScale={targetScale}
                />
              );
            })}
          </main>
        </Container>
      </section>
    </div>
  );
}
