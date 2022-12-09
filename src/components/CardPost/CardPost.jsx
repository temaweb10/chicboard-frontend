import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CardPost.module.scss";

function CardPost({ post }) {
  return (
    <Grid xs={2} sm={4} md={4}>
      <Card
        className={styles["card-post-card"]}
        style={{ padding: 0, height: "100%" }}
      >
        <div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={4}
            autoHeight={true}
            modules={[Pagination]}
            className="mySwiper"
          >
            {post.post_images.map((value) => {
              return (
                <SwiperSlide
                  key={`swiperjs_${Date.now() - Math.random(100) * 100}`}
                >
                  <div className="swiper-zoom-container">
                    <img
                      src={value}
                      className={styles["post-image"]}
                      alt="404"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={styles["card-post-content"]}>
            <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
              <div className={styles["card-content"]}>
                <span className={styles["card-price"]}>
                  {`${Number(post.price).toLocaleString()} ₽`}
                </span>

                <span className={styles["card-text"]}>{post.title}</span>
                <span className={styles["card-text"]}>
                  {`${new Date(post.createdAt).toLocaleDateString()} `}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default CardPost;
