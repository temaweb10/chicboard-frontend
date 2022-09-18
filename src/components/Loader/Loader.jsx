import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "../Loader/Loader.module.scss";
function Loader() {
  return (
    <div className={styles["loader-parent"]}>
      <CircularProgress className={styles["loader-color"]} />
    </div>
  );
}

export default Loader;
