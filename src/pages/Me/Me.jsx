import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Avatar from "../../components/Avatar/Avatar";
import { Rating } from "@mui/material";

import styles from "./Me.module.scss";
function Me() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((resp) => {
        console.log(resp);
        setUser(resp.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <div>
        {isLoading ? (
          <div className={styles.profile}>
            <div className={styles["profile-left"]}>
              <div className={styles["profile-avatar-block"]}>
                <Avatar user={user} className={styles["profile-avatar"]} />
                <div className={styles["profile-avatar-block-child"]}>
                  <span>
                    На сайте с {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <Rating name="read-only" value={user?.rating} readOnly />
                </div>
              </div>
            </div>
            <div className={styles["profile-right"]}>
           
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Me;
