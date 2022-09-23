import React from "react";
import styles from "../Post/Post.module.scss";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
function PostRight({ rightData }) {
  console.log(rightData);
  return (
    <div className={styles["page-right"]}>
      <div className={styles["post-user"]}>
        <Avatar
          src={rightData?.avatar}
          style={{ backgroundColor: "rgba(255,27,68,1)" }}
        >
          {!rightData?.avatar ? (rightData?.username).slice(0, 1) : ""}
        </Avatar>
        {rightData?.createdAt ? (
          <p>
            На сайте с {new Date(rightData?.createdAt).toLocaleDateString()}
          </p>
        ) : (
          ""
        )}
        <Rating name="read-only" value={rightData?.rating} readOnly />
      </div>
    </div>
  );
}

export default PostRight;
