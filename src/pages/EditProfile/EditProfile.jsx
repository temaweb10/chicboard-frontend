import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../common/auth";
import Header from "../../components/Header/Header";
import { storage } from "../../firebase";
import { store } from "../../store/index";

function EditProfile() {
  let dispatch = useDispatch();
  const authBollean = useSelector((state) => state.auth.isAuth);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState();
  const [inputValues, setInputValues] = useState({
    username: "",
  });
  useEffect(() => {
    const authFNC = async () => {
      await auth(dispatch);
      setCurrentUser(store.getState());
    };
    authFNC();
    setLoading(true);
  }, []);

  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = async () => {
    if (imageUpload == null) return;

    const imageRef = ref(
      storage,
      `images/${currentUser.auth.currentUser.user.username}`
    );
    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref).then(async (url) => {
        setUrlAvatar(url);

        axios
          .put(`/api/user/edit/${currentUser.auth.currentUser.user.id}`, {
            avatar: url,
            username: inputValues.username,
          })
          .then((response) => {
            console.log(response);
            auth(dispatch);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  useEffect(() => {
    console.log(urlAvatar);
  }, [urlAvatar]);

  return (
    <div>
      <Header />
      Profile
      <div className="App">
        <TextField
          id="outlined-basic"
          label="Заголовок"
          variant="outlined"
          onChange={(e) =>
            setInputValues({ ...inputValues, username: e.target.value })
          }
        />
        <input
          type="file"
          onChange={(event) => setImageUpload(event.target.files[0])}
        />
        <button onClick={uploadImage}>Upload Image</button>
        <Avatar
          alt="Remy Sharp"
          src={urlAvatar}
          sx={{ width: 138, height: 138 }}
        />
      </div>
    </div>
  );
}

export default EditProfile;
