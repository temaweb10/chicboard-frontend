import axios from "axios";
import React from "react";
import auth from "../../common/auth";
import Posts from "../../components/CardPosts/CardPosts";
import Header from "../../components/Header/Header";
function Main() {
  return (
    <div>
      <Header />
      <div className="page-content">
        <Posts />
      </div>
    </div>
  );
}

export default Main;
