import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../Slider/Slider.module.scss";
function Slider({
  images,
  lazy,
  spaceBetween,
  pagination,
  navigation,
  autoHeight,
}) {
  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        /*   lazy={lazy} */
        pagination={pagination}
        spaceBetween={spaceBetween}
        autoHeight={autoHeight}
        navigation={navigation}
        modules={[Lazy, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((value) => {
          return (
            <SwiperSlide
              key={`swiperjs_${Date.now() - Math.random(100) * 100}`}
            >
              <div className="swiper-zoom-container">
                <img src={value} className={styles["post-image"]} alt="404" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
