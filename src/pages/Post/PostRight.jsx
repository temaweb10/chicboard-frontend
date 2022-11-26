import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Post/Post.module.scss";
function PostRight({ rightData, post }) {
  console.log(rightData);
  useEffect(() => {
    if (rightData === null) {
      /*  navigate("/404"); */
    }
    console.log(post.price);
  }, []);
  const navigate = useNavigate();
  return (
    <div className={styles["page-right"]}>
      <div className="">
        <span className={styles["post-price"]}>
          {Number(post.price).toLocaleString()} ₽
        </span>
      </div>
      <div className={styles["post-user"]}>
        <div style={{ display: "flex" }}>
          <Avatar
            src={rightData?.avatar}
            style={{
              backgroundColor: "#50c878",
            }}
            className={styles["post-user-avatar"]}
          >
            {!rightData?.avatar ? (rightData?.username).slice(0, 1) : ""}
          </Avatar>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>
              {rightData.name} {rightData.surname.slice(0, 1)}
            </span>

            {rightData?.createdAt ? (
              <span className={styles["post-text"]}>
                На сайте с {new Date(rightData?.createdAt).toLocaleDateString()}
              </span>
            ) : (
              ""
            )}

            <Rating name="read-only" value={rightData?.rating} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRight;
