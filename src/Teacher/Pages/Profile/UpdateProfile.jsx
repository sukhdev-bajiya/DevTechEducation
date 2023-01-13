import React from "react";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getuserdata } from "../../../Redux/function";
import { updateUserProfileFun } from "../../../Redux/action";

// Sign Up Page Return Part

export default function UpdateProfile() {
  const dispatch = useDispatch();

  const { userProfileUpdate } = useSelector((state) => state);

  // set user Input Box Value
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

  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: devTechUserData.name,
    username: devTechUserData.username,
    password: "",
    confirmPassword: "",
    oldpassword: "",
    email: devTechUserData.email,
    number: devTechUserData.number,
    dateofbirth: devTechUserData.dateofbirth,
  });
  const [inputBoxAddressValue, setInputBoxAddressValue] = React.useState(
    inputBoxAddressValuefromuser
  );

  // Key press input part
  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };
  const handleOnChangeInputBoxAddressValue = (e) => {
    const { name, value } = e.target;
    setInputBoxAddressValue({ ...inputBoxAddressValue, [name]: value });
  };

  // update user data function
  const userprofileupdateformdata = (event) => {
    event.preventDefault();
    inputBoxValue.postAddress = inputBoxAddressValue;
    dispatch(updateUserProfileFun(inputBoxValue));
  };

  // Password show and hide button part
  const [valuesPasswordViewPart, setvaluesPasswordViewPart] =
    React.useState(false);
  const handleClickShowPassword = () => {
    setvaluesPasswordViewPart(!valuesPasswordViewPart);
  };
  const [valuesPasswordConfirmViewPart, setvaluesPasswordConfirmViewPart] =
    React.useState(false);
  const handleClickShowPasswordConfirm = () => {
    setvaluesPasswordConfirmViewPart(!valuesPasswordConfirmViewPart);
  };
  const [valuesOldPasswordViewPart, setvaluesOldPasswordViewPart] =
    React.useState(false);
  const handleClickShowOldPassword = () => {
    setvaluesOldPasswordViewPart(!valuesOldPasswordViewPart);
  };

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={outerBoxForForm}
      sx={{ width: { xs: "90%", sm: "50%" } }}
    >
      <form
        className="user_profile_update_formOutsideBox"
        onSubmit={userprofileupdateformdata}
      >
        {/* User Info */}
        <Box>User Info</Box>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_username">
            Username
          </InputLabel>
          <Input
            disabled
            name="username"
            value={inputBoxValue.username}
            id="user_profile_update_username"
            endAdornment={
              <Tooltip title="Your username">
                <IconButton style={{ width: "40px" }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_email"> Email </InputLabel>
          <Input
            disabled
            name="email"
            value={inputBoxValue.email}
            id="user_profile_update_email"
            endAdornment={
              <Tooltip title="Your registered email">
                <IconButton style={{ width: "40px" }}>
                  <MailIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_number"> Number </InputLabel>
          <Input
            disabled
            name="number"
            value={inputBoxValue.number}
            id="user_profile_update_number"
            endAdornment={
              <Tooltip title="Your registered phone number">
                <IconButton style={{ width: "40px" }}>
                  <PhoneIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>

        {/* Update user Info */}
        <Box>Update User Info</Box>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_name"> Name </InputLabel>
          <Input
            onChange={handleOnChangeInputBoxValue}
            name="name"
            value={inputBoxValue.name}
            id="user_profile_update_name"
            endAdornment={
              <Tooltip title="Enter your full name and name length is more then 3">
                <IconButton style={{ width: "40px" }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_dateofbirth">
            Date Of Birth
          </InputLabel>
          <Input
            type="date"
            onChange={handleOnChangeInputBoxValue}
            name="dateofbirth"
            value={inputBoxValue.dateofbirth}
            id="user_profile_update_dateofbirth"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_address">Address</InputLabel>
          <Input
            onChange={handleOnChangeInputBoxAddressValue}
            name="address"
            value={inputBoxAddressValue.address}
            id="user_profile_update_address"
            endAdornment={
              <Tooltip title="Enter your full address">
                <IconButton style={{ width: "40px" }}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_city">City</InputLabel>
          <Input
            onChange={handleOnChangeInputBoxAddressValue}
            name="city"
            value={inputBoxAddressValue.city}
            id="user_profile_update_city"
            endAdornment={
              <Tooltip title="Enter your city name">
                <IconButton style={{ width: "40px" }}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_state">State</InputLabel>
          <Input
            onChange={handleOnChangeInputBoxAddressValue}
            name="state"
            value={inputBoxAddressValue.state}
            id="user_profile_update_state"
            endAdornment={
              <Tooltip title="Enter your state name">
                <IconButton style={{ width: "40px" }}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_country">Country</InputLabel>
          <Input
            disabled
            onChange={handleOnChangeInputBoxAddressValue}
            name="country"
            value={inputBoxAddressValue.country}
            id="user_profile_update_country"
            endAdornment={
              <Tooltip title="Enter your country name">
                <IconButton style={{ width: "40px" }}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_pincode">Pincode</InputLabel>
          <Input
            onChange={handleOnChangeInputBoxAddressValue}
            name="pincode"
            type="number"
            value={inputBoxAddressValue.pincode}
            id="user_profile_update_pincode"
            endAdornment={
              <Tooltip title="Enter your pincode number">
                <IconButton style={{ width: "40px" }}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>

        {/* Update User Password */}
        <Box>Update Password</Box>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_password">
            New Password
          </InputLabel>
          <Input
            name="password"
            value={inputBoxValue.password}
            id="user_profile_update_password"
            type={valuesPasswordViewPart ? "text" : "password"}
            onChange={handleOnChangeInputBoxValue}
            endAdornment={
              <Tooltip title="Enter 8 digit password">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  style={{ width: "40px" }}
                >
                  {valuesPasswordViewPart ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_passwordConfirm">
            Confirm New Password
          </InputLabel>
          <Input
            required={inputBoxValue.password === "" ? false : true}
            name="confirmPassword"
            value={inputBoxValue.confirmPassword}
            id="user_profile_update_passwordConfirm"
            type={valuesPasswordConfirmViewPart ? "text" : "password"}
            onChange={handleOnChangeInputBoxValue}
            endAdornment={
              <Tooltip title="Enter same as password">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  style={{ width: "40px" }}
                >
                  {valuesPasswordConfirmViewPart ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </Tooltip>
            }
          />
          {inputBoxValue.confirmPassword === "" ||
          inputBoxValue.password === inputBoxValue.confirmPassword ? (
            ""
          ) : (
            <p style={{ color: "red", textAlign: "start" }}>
              Enter the same new password
            </p>
          )}
        </FormControl>

        {/* User Password for updating data */}
        <Box>Enter Old Password</Box>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="user_profile_update_passwordOld">
            Old Password
          </InputLabel>
          <Input
            required
            name="oldpassword"
            value={inputBoxValue.oldpassword}
            id="user_profile_update_passwordOld"
            type={valuesOldPasswordViewPart ? "text" : "password"}
            onChange={handleOnChangeInputBoxValue}
            endAdornment={
              <Tooltip title="Enter old password for updating profile info">
                <IconButton
                  aria-label="toggle Old password visibility"
                  onClick={handleClickShowOldPassword}
                  style={{ width: "40px" }}
                >
                  {valuesOldPasswordViewPart ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </Tooltip>
            }
          />
        </FormControl>

        <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
          <Button type="submit">
            {!userProfileUpdate || userProfileUpdate.status === "null" ? (
              "Update Profile"
            ) : userProfileUpdate.status === "loading" ? (
              <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
            ) : userProfileUpdate.status === "success" ? (
              "Profile Update successfully"
            ) : (
              "Profile Not Update, Try Again later"
            )}
          </Button>
        </Stack>
      </form>
    </Typography>
  );
}

//

// Style Part
const outerBoxForForm = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  margin: "auto",
  borderRadius: "10px",
  textAlign: "center",
  fontFamily: "play",
  alignItems: "center",
  gap: "50px",
  borderLeft: "0px",
  borderStyle: "double",
  padding: "15px 0",
};
