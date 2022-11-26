import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locations from "../../common/locations";
import Avatar from "../../components/Avatar/Avatar";
import CardPost from "../../components/CardPost/CardPost";
import CardPosts from "../../components/CardPosts/CardPosts";
import Loader from "../../components/Loader/Loader";
import styles from "./User.module.scss";

function User() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  const [me, setMe] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/api/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((resp) => {
          console.log(resp);
          setMe(resp.data);
          setIsMe(true);
        })
        .catch((err) => {
          console.log(err);
          setIsMe(false);
        });
    } else {
      setIsMe(false);
    }

    const getUser = async () => {
      const { data } = await axios.get(`/api/user/findById/${params.userName}`);
      console.log(data);
      if (data === null) {
      } else {
        setUser(data);
        setLoading(true);
      }
    };
    getUser();
    /*  axios
      .post("/api/arr", {
        arr: [{ a: 1, b: 2 }],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }); */
  }, []);
  useEffect(() => {
    console.log(user?.posts);
  }, [user]);
  let lcs = "52";

  return (
    <div>
      {loading == true ? (
        <div className="page-content">
          {1 == 1 ? console.log([isMe, me]) : ""}
          <div className={styles["user-page"]}>
            <div className={styles["left-side"]}>
              <p className={styles["user-name"]}>
                {user?.name} {user?.surname}
              </p>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  user={user}
                  className={styles["user-avatar"]}
                  style={{
                    backgroundColor: "#50c878!important",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={styles["user-span"]}>
                    {locations.map((value) => {
                      if (value.num == user?.location) {
                        return value.city;
                      } else {
                        return "";
                      }
                    })}
                  </span>
                  <span className={styles["user-span"]}>
                    На сайте с {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/*  <span
                      className={styles["rating-count"]}
                      styles={{ display: user?.rating == 0 ? "none" : "block" }}
                    >
                      {user?.rating}
                    </span> */}
                    <Rating name="read-only" value={user?.rating} readOnly />
                  </div>
                </div>
              </div>
              {isMe == true && me.username == user?.username ? (
                ""
              ) : (
                <button className={styles["subscribe-button"]}>
                  Подписаться
                </button>
              )}

              <div className={styles["user-social-counters"]}>
                <div className={styles["user-social-block"]}>
                  <span className={styles["user-social-count"]}>44</span>
                  <span className={styles["user-social-name"]}>отзыва</span>
                </div>
                <div className={styles["user-social-block"]}>
                  <span className={styles["user-social-count"]}>22</span>
                  <span className={styles["user-social-name"]}>подписчики</span>
                </div>
                <div className={styles["user-social-block"]}>
                  <span className={styles["user-social-count"]}>1</span>
                  <span className={styles["user-social-name"]}>подписки</span>
                </div>
              </div>
            </div>
            <div className={styles["right-side"]}>
              <h1>
                {user?.posts.length == 1
                  ? `Найдено ${user.posts.length} объявление`
                  : ""}
                {user?.posts.length > 1
                  ? `Найдено ${user.posts.length} объявлений`
                  : ""}
                {user?.posts.length == 0 ? `Объявлений не найдено` : ""}
              </h1>
              <CardPosts
                posts={user.posts}
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 2, md: 13 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default User;
