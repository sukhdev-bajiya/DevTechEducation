import React from "react";
import Error404Image from "../assets/images/Error/error.webp";

import { Typography } from "@mui/material";

function Error404() {
  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "50px 0",
      }}
    >
      <img
        style={{ width: "50%" }}
        src={Error404Image}
        alt="Error 404 Page Not Found"
      />

      <h1 style={{ fontFamily: "play", fontSize: "72px" }}>Oops!</h1>
      <h1 style={{ fontFamily: "play" }}>Page Not Found</h1>
    </Typography>
  );
}

export default Error404;
