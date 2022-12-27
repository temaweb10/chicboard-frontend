import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Formik, Form, ErrorMessage } from "formik";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Login/Login.module.scss";
import formStyles from "../../styles/FormStyles.module.scss";
function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = 'Авторизация'
    console.log(userLogin);
  }, [userLogin]);

  const postUser = async () => {
    await axios
      .post("/auth/login", userLogin)
      .then((res) => {
        dispatch({ type: "SET_USER", payload: res.data });
        localStorage.setItem("token", res.data.token);
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(auth);
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
              Вход
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <Formik
                initialValues={{ username: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  values.password = userLogin.password;
                  values.username = userLogin.username;
                  console.log(values);
                  if (values.password == "") {
                    errors.password = "Введите пароль";
                  }
                  if (values.username == "") {
                    errors.username = "Введите никнейм";
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

                    <ErrorMessage name="username" component="div" />

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

                    <button type="submit" className={formStyles["button-form"]}>
                      Войти
                    </button>
                  </Form>
                )}
              </Formik>

              <Grid container>
                <Grid item>
                  <Link to="/register" className={styles["login-link"]}>
                    {"Создать аккаунт"}
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

export default Login;
