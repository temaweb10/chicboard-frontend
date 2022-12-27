import axios from "axios";
import React, { useState, useEffect } from "react";
import auth from "../../common/auth";
import Posts from "../../components/CardPosts/CardPosts";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

function Main() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = 'АРТАРЕА: недвижимость , транспорт'
    const getPosts = async () => {
      const { data } = await axios.get("/api/posts");
      console.log(data);
      setPosts(data);
      setLoading(true);
    };

    getPosts();
  }, []);

  return (
    <div>
      <Header />

      <div className="page-content">
        {loading ? (
          <Posts posts={posts} spacing={2} columns={24} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Main;
