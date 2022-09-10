import axios from "axios";
const auth = (dispatch) => {
  console.log(localStorage.getItem("token"));
  let bollean;
  axios
    .get("/auth", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => {
      console.log(true);
      bollean = true;
    })
    .catch((err) => {
      console.log(false);
      bollean = false;
    });
  const authBollean = bollean;
  return authBollean;
};

export default auth;
