import React from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.ring}></div>
      <div className={styles.text}>Loading...</div>
    </div>
  );
};

export default Loader;
