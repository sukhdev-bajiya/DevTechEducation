import React from "react";
import { getuserdata } from "../../../Redux/function";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import Typography from "@mui/material/Typography";

function UserProfile() {
  let devTechUserData = getuserdata();
  let inputBoxAddressValuefromuser;
  if (devTechUserData.postAddress) {
    inputBoxAddressValuefromuser = {
      address: devTechUserData.postAddress.address || "",
      city: devTechUserData.postAddress.city || "",
      pincode: devTechUserData.postAddress.pincode || "",
      state: devTechUserData.postAddress.state || "",
      country: devTechUserData.postAddress.country || "India",
    };
  } else {
    inputBoxAddressValuefromuser = {
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    };
  }

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={{ display: "grid", gap: "15px", padding: "0 15px" }}
      sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
    >
      <Box
        style={{
          borderRight: "0px",
          borderStyle: "double",
          padding: "15px",
          borderRadius: "10px",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", font: "play" }}>Profile Info</h2>

        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_name">Name</InputLabel>
          <Input
            disabled
            value={devTechUserData.name}
            id="show_user_profile_name"
            endAdornment={
              <IconButton style={{ width: "40px" }}>
                <BadgeIcon />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_username">Username</InputLabel>
          <Input
            disabled
            value={devTechUserData.username}
            id="show_user_profile_username"
            endAdornment={
              <IconButton style={{ width: "40px" }}>
                <AccountCircle />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_email">Email</InputLabel>
          <Input
            disabled
            value={devTechUserData.email}
            id="show_user_profile_email"
            endAdornment={
              <IconButton style={{ width: "40px" }}>
                <MailIcon />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_number">
            Mobile Number
          </InputLabel>
          <Input
            disabled
            value={devTechUserData.number}
            id="show_user_profile_number"
            endAdornment={
              <IconButton style={{ width: "40px" }}>
                <PhoneIcon />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_dateofbirth">
            Date of Birth
          </InputLabel>
          <Input
            disabled
            value={devTechUserData.dateofbirth}
            id="show_user_profile_dateofbirth"
            endAdornment={
              <IconButton style={{ width: "40px" }}>
                <CalendarMonthIcon />
              </IconButton>
            }
          />
        </FormControl>
        {/* User Address Info */}
        <h4
          style={{
            textAlign: "center",
            font: "play",
          }}
        >
          <IconButton style={{ width: "40px" }}>
            <MapsHomeWorkIcon />
          </IconButton>{" "}
          Address Info{" "}
          <IconButton style={{ width: "40px" }}>
            <LocationOnIcon />
          </IconButton>
        </h4>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_address">Address</InputLabel>
          <Input
            disabled
            value={inputBoxAddressValuefromuser.address}
            id="show_user_profile_address"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_city">City</InputLabel>
          <Input
            disabled
            value={inputBoxAddressValuefromuser.city}
            id="show_user_profile_city"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_state">State</InputLabel>
          <Input
            disabled
            value={inputBoxAddressValuefromuser.state}
            id="show_user_profile_state"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_country">Country</InputLabel>
          <Input
            disabled
            value={inputBoxAddressValuefromuser.country}
            id="show_user_profile_country"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="show_user_profile_pincode">
            Pin Code / Zip Code
          </InputLabel>
          <Input
            disabled
            value={inputBoxAddressValuefromuser.pincode}
            id="show_user_profile_pincode"
          />
        </FormControl>
      </Box>

      <Box></Box>
      {/* <Box
        style={{
          borderLeft: "0px",
          borderStyle: "double",
          padding: "15px 0",
          borderRadius: "10px",
          minHeight: "250px",
        }}
      ></Box> */}
    </Typography>
  );
}

export default UserProfile;
