import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardPost.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
function CardPost({ post }) {
  console.log(post)
  return (
    <Grid xs={2} sm={4} md={4}>
      <Card className={styles["card-post-card"]}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        zoom={true}
        autoHeight={false}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Pagination]}
        className="mySwiper"
      >

        {post.post_images.map((value)=>{
          return ( <SwiperSlide key={`swiperjs_${Date.now() - Math.random(100) * 100}`}>
          <div className="swiper-zoom-container">
            <img src={value} />
          </div>
        </SwiperSlide>)
        })}

       
       
      </Swiper>
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
