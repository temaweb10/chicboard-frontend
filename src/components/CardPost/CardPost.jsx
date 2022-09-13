import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardPost.module.scss";
function CardPost({ post }) {
  return (
    <Grid xs={2} sm={4} md={4}>
      <Card className={styles["card-post-card"]}>
        <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
          <div className={styles["card-content"]}>
            <span className={styles["card-price"]}>
              {Number(post.price).toLocaleString()}
            </span>
            <span className={styles["card-title"]}>{post.title}</span>
          </div>
        </Link>
      </Card>
    </Grid>
  );
}

export default CardPost;
