import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "../Loader/Loader.module.scss";
function Loader() {
  return (
    <div className={styles["loader-parent"]}>
      <CircularProgress style={{ color: "rgba(0, 204, 195, 1)" }} />
    </div>
  );
}

export default Loader;
