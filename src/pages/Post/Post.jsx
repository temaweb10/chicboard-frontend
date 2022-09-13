import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import styles from "../Post/Post.module.scss";
const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(null);

  console.log(params.idPost);

  const getPost = async () => {
    await axios
      .get(`/api/post/${params.idPost}`)
      .then((result) => {
        setPost(result.data);
        setLoading("true");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    console.log(post);
  }, [loading]);

  return (
    <div>
      <Header />
      <div className="page-content">
        {loading ? <h1>Загрузилось</h1> : <Loader />}
      </div>
    </div>
  );
};

export default Post;
