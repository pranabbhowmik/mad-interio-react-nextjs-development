"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./categorycard.module.scss";
import { Container } from "reactstrap";

export default function CategoryCard() {
  return (
    <Container>
      <section className={styles.categorySection}>
        <div className={styles.header}>
          <h2>Explore By Category</h2>
          <p>Simple, Transparent, And Local</p>
        </div>

        <motion.div
          className={styles.cardWrapper}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.cardContent}>
              <h3>Residential</h3>
              <p>
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry’s Standard Dummy
              </p>
              <button className={styles.btn}>
                View Agencies <span>→</span>
              </button>
            </div>
            <div className={styles.cardImage}>
              <Image
                src="/assets/images/catagory/catagory1.jpg" // replace with your image
                alt="Residential"
                loading="lazy"
                fill
                className={styles.img}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Container>
  );
}
