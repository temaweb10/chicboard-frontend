import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { apartmentSale, saleHouse } from "../../common/descPostObjects";
import { useEffect } from "react";
import styles from "../../pages/CreatePost/CreatePost.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CreatePostApartament from "./CreatePostApartament";
function CreatePostInputs({ podCategory, setInputsValue }) {
  let descObj;
  useEffect(() => {
    if (podCategory == "apartmentSale") {
      setDescPost(apartmentSale);
    }
    if (podCategory == "saleHouse") {
      setDescPost(saleHouse);
    }

    console.log(descPost);
  }, [podCategory]);
  const [descPost, setDescPost] = useState(descObj);

  const setDescPostFunc = (obj) => {
    setDescPost(obj);
  }; 

  useEffect(()=>{
    setInputsValue(descPost)
  },[descPost])

  useEffect(() => {
    console.log(descPost);
  }, [descPost]);
  return (
    <div>
      {podCategory == "apartmentSale" ? (
        <CreatePostApartament
          setDescPostFunc={setDescPostFunc}
          descPost={descPost}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default CreatePostInputs;
