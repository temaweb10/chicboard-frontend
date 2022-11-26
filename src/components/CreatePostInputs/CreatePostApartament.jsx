import React from "react";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import styles from "../../pages/CreatePost/CreatePost.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Formik, Form, Field, ErrorMessage } from "formik";
function CreatePostApartament({ setDescPostFunc, descPost }) {
  console.log(descPost);
  return (
    <div className={styles["parametr-block"]}>
      <h2 className={styles["title-h2"]}>Параметры дома</h2>
      <h4 className={styles["title-h4"]}>Основные</h4>

      <Formik
        initialValues={{ typeApartment: "" ,yearConstruction:"",elevator:"",gas:"",roomsInApartment:"",floor:"",floorsInHouse:"",totalArea:"",livingArea:"",kitchenArea:"",whoPosted:""}}
        validate={(values) => {
          const errors = {};
          console.log(values);
          if (values.typeApartment == "") {
            errors.typeApartment = "Заполните поле";
          }
          console.log(errors)
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.inputDiv}>
            <ErrorMessage
                name="typeApartment"
                component="div"
                className="error-form"
              />
              <InputLabel id="demo-simple-select-label">
                Тип квартиры
              </InputLabel>
              {1 == 1 ? console.log(isSubmitting) : "descPost?.typeApartment"}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Тип квартиры"
                style={{ width: "100%" }}
                /*    name="typeApartment" */
                value={
                  descPost?.typeApartment == undefined
                    ? "null"
                    : descPost?.typeApartment
                }
                /*         className={styles["select-category_2"]} */
                onChange={(e) => {
                  setDescPostFunc({
                    ...descPost,
                    typeApartment: e.target.value,
                  });
                }}
              >
                <MenuItem value="null">Не выбрано</MenuItem>
                <MenuItem value={"secondary"}>Вторичка</MenuItem>
                <MenuItem value={"newBuilding"}>Новостройка</MenuItem>
              </Select>
            </div>

            <div className={styles.inputDiv}>
            <ErrorMessage
                name="yearConstruction"
                component="div"
                className="error-form"
              />
              <InputLabel id="demo-simple-select-label">
                Год постройки
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Год постройки"
                variant="outlined"
                type="number"
                style={{ width: "100%" }}
                className={styles.selectMUI}
                name="yearConstruction"
                onChange={(e) =>
                  setDescPostFunc({
                    ...descPost,
                    yearConstruction: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputDiv}>
            <ErrorMessage
                name="elevator"
                component="div"
                className="error-form"
              />
              <InputLabel id="demo-simple-select-label">Лифты</InputLabel>
              <Select
                style={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Лифты"
                value={
                  descPost?.elevator == undefined ? "null" : descPost?.elevator
                }
                /*         className={styles["select-category_2"]} */
                onChange={(e) => {
                  setDescPostFunc({ ...descPost, elevator: e.target.value });
                }}
                name="elevator"
              >
                <MenuItem value="null">Не выбрано</MenuItem>
                <MenuItem value={"passenger"}>Легковой</MenuItem>
                <MenuItem value={"passengerСargo"}>
                  Легковой и грузовой
                </MenuItem>
                <MenuItem value={"threeOrMore"}>Три и более</MenuItem>
              </Select>
            </div>

            <h4 className={styles["title-h4"]}>Дополнительные</h4>

            <div className={styles.inputDiv}>
              <InputLabel id="demo-simple-select-label">Газ</InputLabel>
              <Select
                style={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Лифты"
                value={descPost?.gas == undefined ? "null" : descPost?.gas}
                /*         className={styles["select-category_2"]} */
                onChange={(e) => {
                  setDescPostFunc({ ...descPost, gas: e.target.value });
                }}
              >
                <MenuItem value="null">Не выбрано</MenuItem>

                <MenuItem value={"true"}>Есть</MenuItem>
                <MenuItem value={"false"}>Нету</MenuItem>
              </Select>
            </div>
            <div className={styles["parametr-block"]}>
              <h2 className={styles["title-h2"]}>Параметры квартиры</h2>
              <h4 className={styles["title-h4"]}>Основные</h4>

              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Комнат в квартире
                </InputLabel>
                <Select
                  style={{ width: "100%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Комнат в квартире"
                  value={
                    descPost?.roomsInApartment == undefined
                      ? "null"
                      : descPost?.roomsInApartment
                  }
                  onChange={(e) => {
                    setDescPostFunc({
                      ...descPost,
                      roomsInApartment: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="null">Не выбрано</MenuItem>
                  <MenuItem value={1}>1 комната</MenuItem>
                  <MenuItem value={2}>2 комнаты</MenuItem>
                  <MenuItem value={3}>3 комнаты</MenuItem>
                  <MenuItem value={4}>4 комнаты</MenuItem>
                  <MenuItem value={"fiveOrMore"}>5 и более</MenuItem>
                  <MenuItem value={"apartaments"}>Апартаменты</MenuItem>
                </Select>
              </div>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">Этаж</InputLabel>
                <TextField
                  id="outlined-basic"
                  style={{ width: "100%" }}
                  variant="outlined"
                  type="number"
                  className={styles.selectMUI}
                  onChange={(e) =>
                    setDescPostFunc({ ...descPost, floor: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Этажность дома
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  style={{ width: "100%" }}
                  variant="outlined"
                  type="number"
                  className={styles.selectMUI}
                  onChange={(e) =>
                    setDescPostFunc({
                      ...descPost,
                      floorsInHouse: e.target.value,
                    })
                  }
                />
              </div>
              <h4 className={styles["title-h4"]}>Площадь</h4>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Общая площадь
                  <i>
                    {" "}
                    м
                    <sup>
                      <small>2</small>
                    </sup>
                  </i>
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "100%" }}
                  type="number"
                  className={styles.selectMUI}
                  onChange={(e) =>
                    setDescPostFunc({ ...descPost, totalArea: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Жилая площадь
                  <i>
                    {" "}
                    м
                    <sup>
                      <small>2</small>
                    </sup>
                  </i>
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  style={{ width: "100%" }}
                  variant="outlined"
                  type="number"
                  className={styles.selectMUI}
                  onChange={(e) =>
                    setDescPostFunc({ ...descPost, livingArea: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Площадь кухни
                  <i>
                    {" "}
                    м
                    <sup>
                      <small>2</small>
                    </sup>
                  </i>
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  style={{ width: "100%" }}
                  variant="outlined"
                  type="number"
                  className={styles.selectMUI}
                  onChange={(e) =>
                    setDescPostFunc({
                      ...descPost,
                      kitchenArea: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {/*       <div className={styles.inputDiv}></div>
      <div className={styles.inputDiv}></div>
      <div className={styles.inputDiv}></div>
      <div className={styles.inputDiv}></div>
      <div className={styles.inputDiv}></div>
      <div className={styles.inputDiv}></div>
       */}
            <div>
              <div className={styles.inputDiv}>
                <InputLabel id="demo-simple-select-label">
                  Кто разместил
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  style={{ width: "100%" }}
                  id="demo-simple-select"
                  label="Кто разместил"
                  value={
                    descPost?.whoPosted == undefined
                      ? "null"
                      : descPost?.whoPosted
                  }
                  onChange={(e) => {
                    setDescPostFunc({
                      ...descPost,
                      whoPosted: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="null">Не выбрано</MenuItem>
                  <MenuItem value={"owner"}>Сообственик</MenuItem>
                  <MenuItem value={"agent"}>Агент</MenuItem>
                </Select>
              </div>
            </div>

            {/*  <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" /> */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePostApartament;
