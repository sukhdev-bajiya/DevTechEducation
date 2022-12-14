import React from "react";
import WebsiteUnderConstructionImage from "../assets/images/Error/websiteunderconstruction.png";

import { Typography } from "@mui/material";

function WebsiteUnderConstruction() {
  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "50px 0",
      }}
    >
      <img
        style={{ width: "80%" }}
        src={WebsiteUnderConstructionImage}
        alt="Website Under Construction"
      />
    </Typography>
  );
}

export default WebsiteUnderConstruction;
