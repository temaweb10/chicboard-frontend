import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPost from "../CardPost/CardPost";
import Loader from "../Loader/Loader";
function Posts() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(null);
  const getPosts = async () => {
    await axios
      .get("/api/posts")
      .then((result) => {
        console.log(result);
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading("true");
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <Grid  alignItems="stretch"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 17 }}
          >
            {posts.map((post) => {
              return (
                <CardPost
                  post={post}
                  key={`${Date.now()}_post${Math.random(10)}`}
                />
              );
            })}
          </Grid>
        </div>
      ) : (
        <Loader />
      )}
      {/*  {posts.map((post) => {
        <Post post={post} key={`${Date.now()}_post${Math.random(10)}`} />;
      })} */}
    </div>
  );
}

export default Posts;
