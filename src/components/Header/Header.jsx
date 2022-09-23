import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import auth from "../../common/auth";
import { store } from "../../store/index";
import styles from "../Header/Header.module.scss";

const Header = () => {
  let dispatch = useDispatch();
  const authBollean = useSelector((state) => state.auth.isAuth);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authFNC = async () => {
      await auth(dispatch);
      setCurrentUser(store.getState());
    };
    authFNC();
    setLoading(true);
  }, []);

  useEffect(() => {
    /*     console.log(currentUser.auth.currentUser.user.id); */
  }, [currentUser]);

  const pages = ["Объявления", "Категории", "Разместить объявление"];
  const pageObj = [
    {
      name: "Объявления",
      path: "/posts",
    },
    {
      name: "Категории",
      path: "/category",
    },
  ];
  const settings1 = [
    {
      name: "Profile",
    },
    "Account",
    "Dashboard",
    "Logout",
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={styles.header}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,

                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
              className={styles["logo-text"]}
            >
              CHICBOARD
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pageObj.map((page) => (
                <Button key={`menu_item_link_${page.path}`}>
                  <Link
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    className={styles["menu-link-page"]}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
              <Button>
                <Link
                  to="/post/create"
                  sx={{ my: 2, color: "white", display: "block" }}
                  className="button-outlined"
                >
                  РАЗМЕСТИТЬ ОБЪЯВЛЕНИЕ
                </Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {authBollean ? (
                    <div>
                      {currentUser?.auth ? (
                        <Avatar
                          title={currentUser?.auth?.currentUser?.user?.username}
                          src={currentUser.auth.currentUser.user.avatar}
                        >
                          {/*    {(currentUser?.auth?.currentUser?.user?.username).slice(
                            0,
                            1
                          )} */}
                        </Avatar>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className={styles["auth-block"]}>
                      <Link to="/login" className={styles["sign-text"]}>
                        Войти
                      </Link>
                      <Link to="/register" className={styles["sign-text"]}>
                        Зарегистрироваться
                      </Link>
                    </div>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={`fff${Math.random(10) * 10} + ${Date.now()}`}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    to={`/user/${currentUser?.auth?.currentUser?.user?.id}`}
                  >
                    {" "}
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
