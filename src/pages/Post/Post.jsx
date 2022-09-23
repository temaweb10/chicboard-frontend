import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import styles from "../Post/Post.module.scss";

import { GrFavorite } from "react-icons/gr";
import PostRight from "./PostRight";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../components/Slider/Slider";
const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [rightData, setRightData] = useState();
  const [loading, setLoading] = useState(null);
  const currentUser = useSelector((state) => state.auth);

  const getPost = async () => {
    await axios
      .get(`/api/post/${params.idPost}`)
      .then((result) => {
        setPost(result.data);

        axios.get(`/api/user/find/${result.data.id}`).then((rightDataRes) => {
          setRightData(rightDataRes.data);
          setLoading("true");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewFavoritePost = async () => {
    await axios.post("/api/add-favorite-post", {});
  };

  useEffect(() => {
    getPost();

    console.log(currentUser);
  }, []);
  useEffect(() => {
    console.log("Загрузилось");
    const addView = async () => {
      const { data } = await axios.put(
        `/api/post-views-update/${params.idPost}`,
        {
          currentViews: post.views,
        }
      );
      console.log(data);
    };
    if (loading !== null) {
      addView();
    }
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

                <button
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={addNewFavoritePost}
                >
                  <GrFavorite className={styles["icon-favorite"]} />
                  <p className={styles["text-favorite"]}>Добавть в избранное</p>
                </button>
              </div>

              <div className={styles["swiper-parent"]}>
                <Slider
                  images={post.post_images}
                  lazy={true}
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={4}
                  autoHeight={true}
                  navigation={true}
                />
              </div>

              <h2 className={styles["post-title"]}>{post.views}</h2>
            </div>
            <PostRight rightData={rightData} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Post;
