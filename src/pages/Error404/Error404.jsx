import React from "react";
import styles from "../Error404/Error404.module.scss";
function Error404() {
  return (
    <div className={styles["error-parent"]}>
      <span className={styles["error-404"]}>404</span>
      <span className={styles["error-text"]}>Страница не найдена</span>
    </div>
  );
}

export default Error404;
