import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPost from "../CardPost/CardPost";
import Loader from "../Loader/Loader";

function Posts({ posts, spacing, columns }) {
  return (
    <div>
      <div>
        <Grid
          alignItems="stretch"
          container
          spacing={spacing}
          columns={columns}
        >
          {posts.map((post) => {
            if (post[0]) {
              return (
                <CardPost
                  post={post[0]}
                  key={`${Date.now()}_post${Math.random(10)}`}
                />
              );
            } else {
              return (
                <CardPost
                  post={post}
                  key={`${Date.now()}_post${Math.random(10)}`}
                />
              );
            }
          })}
        </Grid>
      </div>

      {/*  {posts.map((post) => {
        <Post post={post} key={`${Date.now()}_post${Math.random(10)}`} />;
      })} */}
    </div>
  );
}

export default Posts;
