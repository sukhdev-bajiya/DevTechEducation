import React from "react";
import "./Profile.css";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Collapse } from "@mui/material";
import Button from "@mui/material/Button";

import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinSuccess, userprofileupdating } from "../../../Redux/action";
import UserProfile from "./UserProfile";
import WebsiteUnderConstruction from "../../../ErrorPage/WebsiteUnderConstruction";

export default function Profile() {
  document.title = "Dev Tech Education || Teacher || Profile";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfileUpdate } = useSelector((state) => state);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //   User Profile Update Successfully Alert State
  const [
    userProfileUpdateSuccessfullyAlert,
    setUserProfileUpdateSuccessfullyAlert,
  ] = React.useState(false);

  //   User Profile Update Failed Alert State
  const [userProfileUpdateFailedAlert, setUserProfileUpdateFailedAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (userProfileUpdate === null || userProfileUpdate === undefined) {
      setUserProfileUpdateSuccessfullyAlert(false);
      setUserProfileUpdateFailedAlert(false);
    }
    if (
      (userProfileUpdate !== null &&
        userProfileUpdate !== undefined &&
        userProfileUpdate.status) === "true"
    ) {
      setUserProfileUpdateSuccessfullyAlert(true);
      localStorage.setItem("user", userProfileUpdate.data.data);
      sessionStorage.setItem("user", JSON.stringify(userProfileUpdate.data));
      setTimeout(() => {
        dispatch(userprofileupdating(null));
        dispatch(signinSuccess(userProfileUpdate.data));
      }, 3000);
    }

    if (
      userProfileUpdate !== null &&
      userProfileUpdate !== undefined &&
      userProfileUpdate.status === "fail"
    ) {
      setUserProfileUpdateFailedAlert(true);
      setTimeout(() => {
        dispatch(userprofileupdating(null));
      }, 3000);
    }
    if (
      userProfileUpdate !== null &&
      userProfileUpdate !== undefined &&
      userProfileUpdate.status === "error"
    ) {
      navigate("/signin");
    }
  }, [userProfileUpdate, navigate, dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="YOUR PROFILE" {...a11yProps(0)} />
          <Tab label="UPDATE PROFILE" {...a11yProps(1)} />
          <Tab label="SETTINGS" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Box style={{ height: "15px" }}></Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserProfile />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UpdateProfile />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <WebsiteUnderConstruction />
        </TabPanel>
      </SwipeableViews>

      {/* User Profile Update Successfully Alert */}
      <Collapse sx={{ width: "100%" }} in={userProfileUpdateSuccessfullyAlert}>
        <Alert
          severity="success"
          action={
            <Button
              onClick={() => setUserProfileUpdateSuccessfullyAlert(false)}
              color="inherit"
              size="small"
            >
              <CloseIcon fontSize="inherit" />
            </Button>
          }
        >
          <AlertTitle>
            User Profile Update <strong> Successfully </strong>
          </AlertTitle>
          <strong>Happy Learning!</strong>
        </Alert>
      </Collapse>
      {/* User Profile Update Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={userProfileUpdateFailedAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setUserProfileUpdateFailedAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            User Profile Update <strong> Failed </strong>
          </AlertTitle>
          <strong>Enter Valid Old Password!</strong>
        </Alert>
      </Collapse>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}
