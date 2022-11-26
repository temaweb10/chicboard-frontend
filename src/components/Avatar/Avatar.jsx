import AvatarUI from "@mui/material/Avatar";
import React from "react";
function Avatar({ user, className }) {
  return (
    <AvatarUI
      src={user?.avatar}
      style={{ backgroundColor: "#50c878" }}
      className={className}
    >
      {" "}
      {!user?.avatar ? (user?.username).slice(0, 1) : ""}
    </AvatarUI>
  );
}

export default Avatar;
