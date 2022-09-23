import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import CardPost from "../../components/CardPost/CardPost";

function User() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  console.log(params.userId);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/user/find/${params.userId}`);
      console.log(data);
      await setUser(data);
      setLoading(true);
    };
    getUser();
    console.log(user);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      {loading ? (
        <div>
          <h1>{user?.name}</h1>
          <h1>{user?.surname}</h1>
          <h1>
            {user?.posts.length == 1
              ? `Найдено ${user.posts.length} объявление`
              : ""}
            {user?.posts.length > 1
              ? `Найдено ${user.posts.length} объявлений`
              : ""}
            {user?.posts.length == 0 ? `Объявлений не найдено` : ""}
          </h1>
          {user.posts.map((post) => {
            return (
              <CardPost
                post={post[0]}
                key={`user_post_key_${Math.random(10) * 10}_${Date.now()}`}
              />
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default User;
