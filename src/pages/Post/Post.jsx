import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import styles from "../Post/Post.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GrFavorite } from "react-icons/gr";
import Avatar from "@mui/material/Avatar";
const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [rightData, setRightData] = useState();
  const [loading, setLoading] = useState(null);

  console.log(params.idPost);

  const getPost = async () => {
    await axios
      .get(`/api/post/${params.idPost}`)
      .then(async (result) => {
        setPost(result.data);

        await axios
          .get(`/api/user/find/${result.data.id}`)
          .then((rightDataRes) => {
            console.log(rightDataRes);
            setRightData(rightDataRes.data);
            setLoading("true");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    console.log("Загрузилось");
  }, [loading]);

  return (
    <div>
      <Header />
      <div className="page-content">
        {loading ? (
          <div className={styles["product-content"]}>
            <div className={styles["page-left"]}>
              <div className={styles["top-side"]}>
                <h2 className={styles["post-title"]}>{post.title}</h2>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <GrFavorite className={styles["icon-favorite"]} />
                  <p className={styles["text-favorite"]}>Добавть в избранное</p>
                </div>
              </div>

              <div className={styles["swiper-parent"]}>
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  lazy={true}
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={4}
                  autoHeight={true}
                  navigation={true}
                  modules={[Lazy, Pagination, Navigation]}
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
              </div>
            </div>
            <div className={styles["page-right"]}>
              <div className={styles["post-user"]}>
                <Avatar src={rightData.avatar} />
                {rightData?.createdAt ? (
                  <p>
                    На сайте с{" "}
                    {new Date(rightData?.createdAt).toLocaleDateString()}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Post;
