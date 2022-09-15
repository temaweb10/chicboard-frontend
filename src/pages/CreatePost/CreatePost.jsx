import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import Header from "../../components/Header/Header";
import { storage } from "../../firebase";
import styles from "../CreatePost/CreatePost.module.scss";

function CreatePost() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const id = currentUser?.user?.id;
  const [selectValues, setSelectValues] = useState({
    category: "car",
    podCategory: "",
    location: currentUser?.user?.location || "50",
  });
  const [inputValues, setInputValues] = useState({
    title: "",
    about: "",
    price: "",
    tel: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "post_images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    console.log(imageUpload);
    const imageRef = ref(storage, `post_images/${v4()}`);
    for (let i = 0; i < imageUpload.length; i++) {
      console.log(imageUpload[i]);
      uploadBytes(ref(storage, `post_images/${v4() + i + Date.now()}`), imageUpload[i]).then((snapShot) => {
        console.log(i)
        console.log(snapShot);
        getDownloadURL(snapShot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    }
  };
  const sendData = () => {
    try {
      console.log(imageList);
      axios
        .post("/api/add-post", {
          ...inputValues,
          ...selectValues,
          post_images: imageList,
          id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectValues);
    console.log(inputValues);
  }, [selectValues, inputValues]);

  return (
    <div>
      <Header />
      <div className={styles["create-post_body"]}>
        <div className={styles["create-post_parent"]}>
          <div className={styles["create-post_content"]}>
            <TextField
              id="outlined-basic"
              label="Заголовок"
              variant="outlined"
              className={styles.input}
              onChange={(e) =>
                setInputValues({ ...inputValues, title: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Цена"
              variant="outlined"
              type="number"
              className={styles.input}
              onChange={(e) =>
                setInputValues({ ...inputValues, price: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Номер телефона"
              variant="outlined"
              type="tel"
              className={styles.input}
              onChange={(e) =>
                setInputValues({ ...inputValues, tel: e.target.value })
              }
            />
            <TextField
              id="outlined-multiline-static"
              label="Описание"
              multiline
              rows={4}
              className={styles.input}
              onChange={(e) =>
                setInputValues({ ...inputValues, about: e.target.value })
              }
            />
            <div>
              <input
                type="file"
                multiple={true}
                accept="image/*,image/jpeg"
                onChange={(event) => setImageUpload(event.target.files)}
              />
              <button onClick={uploadImage}>Фотографии</button>
              {imageList.map((url) => {
                return <img src={url} style={{ width: "200px" }} key={v4()} />;
              })}
            </div>
            <InputLabel id="demo-simple-select-label">Категория</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Категория"
              value={selectValues.category}
              className={styles.input}
              onChange={(e) =>
                setSelectValues({ ...selectValues, category: e.target.value })
              }
            >
              <MenuItem value={"technic"}>Техника</MenuItem>
              <MenuItem value={"car"}>Машина</MenuItem>
              <MenuItem value={"animal"}>Животное</MenuItem>
              <MenuItem value={"repairParts"}>Запчасти</MenuItem>
              <MenuItem value={"service"}>Услуги</MenuItem>
              <MenuItem value={"other"}>Прочее</MenuItem>
            </Select>
            <div>
              <InputLabel id="demo-simple-select-label">Регион</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={styles.input}
                label="Категория"
                value={selectValues.location}
                onChange={(e) =>
                  setSelectValues({ ...selectValues, location: e.target.value })
                }
              >
                <MenuItem value="1">Республика Адыгея</MenuItem>
                <MenuItem value="2">Республика Алтай </MenuItem>
                <MenuItem value="3">Республика Башкортостан </MenuItem>
                <MenuItem value="4">Республика Бурятия </MenuItem>
                <MenuItem value="5">Республика Дагестан </MenuItem>
                <MenuItem value="6">Республика Ингушетия </MenuItem>
                <MenuItem value="7">Кабардино-Балкарская Республика</MenuItem>
                <MenuItem value="8">Республика Калмыкия </MenuItem>
                <MenuItem value="9">Карачаево-Черкесская Республика</MenuItem>
                <MenuItem value="10">Республика Карелия </MenuItem>
                <MenuItem value="11">Республика Коми </MenuItem>
                <MenuItem value="12">Республика Марий Эл </MenuItem>
                <MenuItem value="13">Республика Мордовия </MenuItem>
                <MenuItem value="14">Республика Саха (Якутия) </MenuItem>
                <MenuItem value="15">
                  Республика Северная Осетия - Алания{" "}
                </MenuItem>
                <MenuItem value="16">Республика Татарстан</MenuItem>
                <MenuItem value="17">Республика Тыва </MenuItem>
                <MenuItem value="18">Удмуртская Республика </MenuItem>
                <MenuItem value="19">Республика Хакасия </MenuItem>
                <MenuItem value="20">Чеченская Республика</MenuItem>
                <MenuItem value="21">Чувашская Республика</MenuItem>
                <MenuItem value="22">Алтайский край</MenuItem>
                <MenuItem value="75">Забайкальский край</MenuItem>
                <MenuItem value="41">Камчатский край</MenuItem>
                <MenuItem value="23">Краснодарский край</MenuItem>
                <MenuItem value="24">Красноярский край</MenuItem>
                <MenuItem value="59">Пермский край</MenuItem>
                <MenuItem value="25">Приморский край</MenuItem>
                <MenuItem value="26">Ставропольский край</MenuItem>
                <MenuItem value="27">Хабаровский край</MenuItem>
                <MenuItem value="28">Амурская область </MenuItem>
                <MenuItem value="29">Архангельская область</MenuItem>
                <MenuItem value="30">Астраханская область </MenuItem>
                <MenuItem value="31">Белгородская область</MenuItem>
                <MenuItem value="32">Брянская область </MenuItem>
                <MenuItem value="33">Владимирская область </MenuItem>
                <MenuItem value="34">Волгоградская область </MenuItem>
                <MenuItem value="35">Вологодская область </MenuItem>
                <MenuItem value="36">Воронежская область </MenuItem>
                <MenuItem value="37">Ивановская область </MenuItem>
                <MenuItem value="38">Иркутская область </MenuItem>
                <MenuItem value="39">Калининградская область</MenuItem>
                <MenuItem value="40">Калужская область </MenuItem>
                <MenuItem value="42">Кемеровская область </MenuItem>
                <MenuItem value="43">Кировская область </MenuItem>
                <MenuItem value="44">Костромская область </MenuItem>
                <MenuItem value="45">Курганская область </MenuItem>
                <MenuItem value="46">Курская область </MenuItem>
                <MenuItem value="47">Ленинградская область </MenuItem>
                <MenuItem value="48">Липецкая область </MenuItem>
                <MenuItem value="49">Магаданская область</MenuItem>
                <MenuItem value="50">Московская область</MenuItem>
                <MenuItem value="51">Мурманская область </MenuItem>
                <MenuItem value="52">Нижегородская область </MenuItem>
                <MenuItem value="53">Новгородская область </MenuItem>
                <MenuItem value="54">Новосибирская область </MenuItem>
                <MenuItem value="55">Омская область</MenuItem>
                <MenuItem value="56">Оренбургская область </MenuItem>
                <MenuItem value="57">Орловская область </MenuItem>
                <MenuItem value="58">Пензенская область </MenuItem>
                <MenuItem value="60">Псковская область </MenuItem>
                <MenuItem value="61">Ростовская область </MenuItem>
                <MenuItem value="62">Рязанская область </MenuItem>
                <MenuItem value="63">Самарская область </MenuItem>
                <MenuItem value="64">Саратовская область </MenuItem>
                <MenuItem value="65">Сахалинская область </MenuItem>
                <MenuItem value="66">Свердловская область </MenuItem>
                <MenuItem value="67">Смоленская область </MenuItem>
                <MenuItem value="68">Тамбовская область </MenuItem>
                <MenuItem value="69">Тверская область </MenuItem>
                <MenuItem value="70">Томская область </MenuItem>
                <MenuItem value="71">Тульская область</MenuItem>
                <MenuItem value="72">Тюменская область </MenuItem>
                <MenuItem value="73">Ульяновская область </MenuItem>
                <MenuItem value="74">Челябинская область </MenuItem>
                <MenuItem value="76">Ярославская область</MenuItem>
                <MenuItem value="77">Москва</MenuItem>
                <MenuItem value="78">Санкт-Петербург</MenuItem>
                <MenuItem value="79">Еврейская АО</MenuItem>
                <MenuItem value="80">Ненецкий АО</MenuItem>
                <MenuItem value="81">Ханты-Мансийский АО</MenuItem>
                <MenuItem value="82">Чукотский АО</MenuItem>
                <MenuItem value="83">Ямало-Ненецкий АО</MenuItem>
              </Select>
            </div>
            <Button variant="contained" onClick={sendData}>
              Выложить объявление
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
