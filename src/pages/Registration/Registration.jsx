import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Registration/Registration.module.scss";
import { Formik, Form, ErrorMessage } from "formik";
import formStyles from "../../styles/FormStyles.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function Registration() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    tel: "",
    location: "",
  });

  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);

  useEffect(() => {
    console.log(userLogin);
  }, [userLogin]);

  const postUser = () => {
    axios
      .post("/auth/regisration", userLogin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(80,200,120)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  name: "",
                  surname: "",
                  tel: "",
                  location: "",
                }}
                validate={(values) => {
                  const errors = {};
                  values.password = userLogin.password;
                  values.username = userLogin.username;
                  values.name = userLogin.name;
                  values.surname = userLogin.surname;
                  values.location = userLogin.location;
                  values.tel = userLogin.tel;
                  console.log(values);
                  if (values.password == "") {
                    errors.password = "Введите пароль";
                  }
                  if (values.username == "") {
                    errors.username = "Введите никнейм";
                  }
                  if (!/^((\+7|7|8)+([0-9]){10})$/i.test(values.tel)) {
                    errors.tel = "Ввёден некоретно номер телефона";
                  }
                  if (values.location == "") {
                    errors.location = "Укажите регион";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("отправляю");

                  postUser();
                  setSubmitting(true);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div style={{ display: "flex" }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Имя"
                        name="name"
                        autoFocus
                        onChange={(e) =>
                          setUserLogin({ ...userLogin, name: e.target.value })
                        }
                        style={{ marginRight: "4px" }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Фамилия"
                        name="surname"
                        autoFocus
                        onChange={(e) =>
                          setUserLogin({
                            ...userLogin,
                            surname: e.target.value,
                          })
                        }
                        style={{ marginLeft: "4px" }}
                      />
                    </div>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Никнейм"
                      name="username"
                      autoFocus
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, username: e.target.value })
                      }
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Пароль"
                      type="password"
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, password: e.target.value })
                      }
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Номер телефона"
                      name="tel"
                      type="tel"
                      autoFocus
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, tel: e.target.value })
                      }
                    />
                    <ErrorMessage
                      name="tel"
                      component="div"
                      className="error-form"
                    />

                    <InputLabel id="demo-simple-select-label">
                      Регион
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className={styles.input}
                      label="Категория"
                      value={userLogin.location}
                      name="location"
                      style={{ width: "100%", marginBottom: "12px" }}
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, location: e.target.value })
                      }
                    >
                      <MenuItem value="1">Республика Адыгея</MenuItem>
                      <MenuItem value="2">Республика Алтай </MenuItem>
                      <MenuItem value="3">Республика Башкортостан </MenuItem>
                      <MenuItem value="4">Республика Бурятия </MenuItem>
                      <MenuItem value="5">Республика Дагестан </MenuItem>
                      <MenuItem value="6">Республика Ингушетия </MenuItem>
                      <MenuItem value="7">
                        Кабардино-Балкарская Республика
                      </MenuItem>
                      <MenuItem value="8">Республика Калмыкия </MenuItem>
                      <MenuItem value="9">
                        Карачаево-Черкесская Республика
                      </MenuItem>
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

                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-form"
                    />

                    <button type="submit" className={formStyles["button-form"]}>
                      Зарегистрироваться
                    </button>
                  </Form>
                )}
              </Formik>

              {/*  <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={postUser}
                className="main-buttton"
              >
                Регистрация
              </Button> */}
              <Grid container>
                <Grid item>
                  <Link to="/login" className={styles["login-link"]}>
                    {"Уже есть аккаунт ? Войти"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Registration;
