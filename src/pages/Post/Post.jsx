import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";
import recommendLC from "../../common/recommendLC";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import Slider from "../../components/Slider/Slider";
import styles from "../Post/Post.module.scss";
import PostRight from "./PostRight";
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

        axios
          .get(`/api/user/findById/${result.data.id}`)
          .then((rightDataRes) => {
            setRightData(rightDataRes.data);
            setLoading("true");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewFavoritePost = async () => {
    /* newFavoritePost id */
    await axios.post("/api/add-favorite-post", {
      _id: params.idPost,
      newFavoritePost: params.idPost,
    });
  };

  useEffect(() => {
    getPost();

    console.log(currentUser?.currentUser?.user?.id);

    console.log(currentUser.isAuth);
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
      recommendLC(post?.category, post?.podCategory);
    }
  }, [loading]);

  return (
    <div>
      <Header />
      <div
        className="page-content"
        style={{ backgroundColor: "#fff", marginTop: "32px" }}
      >
        {loading ? (
          <div className={styles["product-content"]}>
            <div className={styles["page-left"]}>
              <div className={styles["top-side"]}>
                <h2 className={styles["post-title"]}>{post.title}</h2>

                <button
                  className={styles["button-favorite"]}
                  style={{ display: "flex", alignItems: "center" }}
                  /*  onClick={addNewFavoritePost} */
                >
                  {/* <GrFavorite className={styles["icon-favorite"]} /> */}
                  <UseAnimations animation={heart} fillColor="#FF0000" />
                  <span className={styles["text-favorite"]}>
                    Добавть в избранное
                  </span>
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
                  className={"swiper-post"}
                />
              </div>

              {/*    <h2 className={styles["post-title"]}>{post.views}</h2> */}
            </div>
            <PostRight rightData={rightData} post={post} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Post;
