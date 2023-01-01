import Rating from "@mui/material/Rating";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locations from "../../common/locations";
import Avatar from "../../components/Avatar/Avatar";
import CardPost from "../../components/CardPost/CardPost";
import CardPosts from "../../components/CardPosts/CardPosts";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import Modal from '@mui/material/Modal';
import styles from "./User.module.scss";
import Box from '@mui/material/Box';
import SubscribersList from "../../components/Subscribers/SubscribersList";
import { MdOutlineClose } from "react-icons/md";

function User() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  const [isSubscribe,setIsSubcribe] = useState(false)
  const [me, setMe] = useState("");
  const [activityPosts, setActivityPosts] = useState([]);
  const [soldPosts, setsoldPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/api/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((resp) => {
          setMe(resp.data);
          setIsMe(true);
        })
        .catch((err) => {
          console.log(err);
          setIsMe(false);
        });
    } else {
      setIsMe(false);
    }

    const getUser = async () => {
      const { data } = await axios.get(`/api/user/findById/${params.userName}`);
      if (data === null) {
      } else {
        setUser(data);
        console.log(data);
        data.posts.map((value) => {
          if (value[0]?.typePost == "active") {
            setActivityPosts([{ ...activityPosts, ...value }]);
            console.log("АКТИВВВ ААААА");
          } else if (value[0]?.typePost == "sold") {
            setsoldPosts([{ ...soldPosts, ...value }]);
          }
        });
        setLoading(true);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    /*     console.log(user?.posts); */

    console.log(isMe);
  }, [isMe]);
  const Subscriber = (userId,subscribeUserId)=>{
    if(isSubscribe == true) {
      axios
      .post(`/api/${userId}/removeSubscribe/${subscribeUserId}`)
      .then(()=>{
          setIsSubcribe(false)
          console.log('вы успешно ОТПИСАЛИСЬ на пользователя')
      })
      .catch((err)=>{
        console.log('ошибка')
      })
    
    } 

    if (isSubscribe == false) {
      axios
      .post(`/api/${userId}/addSubscribe/${subscribeUserId}`)
      .then(()=>{
          setIsSubcribe(true)
          console.log('вы успешно подписались на пользователя')
      })
      .catch((err)=>{
        console.log('ошибка')
      })
    
    }
    

  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [valuePanel, setValuePanel] = React.useState(0);
  const handleChangePanel = (event, newValue) => {
    setValuePanel(newValue);
  };


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className={styles["tabpanel-parent"]}
      >
        {value === index && <span>{children}</span>}
      </div>
    );
  }
  return (
    <div>
      <Header />
      {loading == true ? (
        <div className="page-content">
          {1 == 1 ? console.log([isMe, me]) : ""}
          <div className={styles["user-page"]}>
            <div className={styles["left-side"]}>
              <p className={styles["user-name"]}>
                {user?.name} {user?.surname}
              </p>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  user={user}
                  className={styles["user-avatar"]}
                  style={{
                    backgroundColor: "#50c878!important",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={styles["user-span"]}>
                    {locations.map((value) => {
                      if (value.num == user?.location) {
                        return value.city;
                      } else {
                        return "";
                      }
                    })}
                  </span>
                  <span className={styles["user-span"]}>
                    На сайте с {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/*  <span
                      className={styles["rating-count"]}
                      styles={{ display: user?.rating == 0 ? "none" : "block" }}
                    >
                      {user?.rating}
                    </span> */}
                    <Rating name="read-only" value={user?.rating} readOnly />
                  </div>
                </div>
              </div>
       {/*        {isMe == true && me.username == user?.username ? (
                ""
              ) : (
                <button className={styles["subscribe-button"]}>
                  Подписаться
                </button>
              )} */}

              <div className={styles["user-social-counters"]}>
                <div className={styles["user-social-block"]}>
                  <span className={styles["user-social-count"]}>44</span>
                  <span className={styles["user-social-name"]}>отзыва</span>
                </div>
                <div className={styles["user-social-block"]}>
                  <span className={styles["user-social-count"]}>{user.subscribersList.length}</span>
                  <span className={styles["user-social-name"]}>подписчики</span>
                </div>
                <div className={styles["user-social-block"]} onClick={handleOpen} style={{cursor:'pointer'}}>
                <span className={styles["user-social-count"]}>{user.userSubscribedList.length}</span>
                  <span className={styles["user-social-name"]}>подписки</span>
                </div>
              </div>

              {isMe == true && me.username == user?.username ? (
                ""
              ) : (
                <button className={`subscribe-button ${isSubscribe == true ? 'unsubscribe-button' : ''}`}  /* className={styles[isSubscribe == false ? "subscribe-button" : 'unsubscribe-button']}  */  onClick={(e)=>{
                   Subscriber(user._id,me._id,) 
                    }} >
                      {isSubscribe == true ? 'Отписаться' : 'Подписаться'} 
                    </button>
                  )}

                
                <div  className={styles['tabs']} style={{display:`${isMe == true ? 'block' : 'none'}`}}>
                  <Tabs 
                    orientation="vertical"
                    variant="scrollable"
                    value={valuePanel}
                    onChange={handleChangePanel}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider',
                    "& .MuiTabs-indicator": {
                      display: "none"
                     
                    } }}
                    style={{borderRight:'none'}}
                    className={styles['tabs-component']}
           
                  >
                  
                    <Tab label="Объявления" className={styles['tab-panel']}/>
                    <Tab label="Закладки"  className={styles['tab-panel']}/> 
                    <Tab label="Настройки"  className={styles['tab-panel']}/> 
                
                  </Tabs>
                </div>

             
                        
            </div>

        

            <div className={styles["right-side"]}>
             
              
              <TabPanel value={valuePanel} index={0}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label={`Активные ${activityPosts.length}`} />
                    <Tab label={`Проданные ${soldPosts.length}`} />
                  
                  </Tabs>


                    <TabPanel value={value} index={0}>
                    {activityPosts.length == 0 ? (
                      <div className={styles["tabs-alert-span"]}>
                        <span>Все активные объявления будут</span>

                        <span>отображаться на этой странице.</span>
                    </div>
                    ) : (
                      <CardPosts
                        posts={activityPosts}
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 2, sm: 2, md: 13 }}
                      />
                    )}

                  </TabPanel>

                  <TabPanel
                    value={value}
                    index={1}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {soldPosts.length == 0 ? (
                      <div className={styles["tabs-alert-span"]}>
                        <span>Все снятые с продажи объявления будут</span>

                        <span>отображаться на этой странице.</span>
                      </div>
                    ) : (
                      <CardPosts
                        posts={soldPosts}
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 2, sm: 2, md: 13 }}
                      />
                    )}
                  </TabPanel>
                
                </TabPanel>

                <TabPanel value={valuePanel} index={1}>
                  like
                </TabPanel>

                <TabPanel value={valuePanel} index={2}>
                  Настройки
                </TabPanel>

             

              {/*   <h1>
                {user?.posts.length == 1
                  ? `Найдено ${user.posts.length} объявление`
                  : ""}
                {user?.posts.length > 1
                  ? `Найдено ${user.posts.length} объявлений`
                  : ""}
                {user?.posts.length == 0 ? `Объявлений не найдено` : ""}
              </h1> */}
              {/*  <CardPosts
                posts={user.posts}
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 2, md: 13 }}
              /> */}

              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <div>
     
                    <Box  sx={
                        {position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        }}
                        className={styles['modal']}
                      >
                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                          <MdOutlineClose className={styles['modal-close-icon']} onClick={handleClose}/>
                        </div>
                       
                          <Box  className={styles['modal-content']} sx={{p:2}}>
              
                            <SubscribersList idArray={user.userSubscribedList}/>
                          </Box>
                  </Box>
                </div>
                

                </Modal>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default User;
