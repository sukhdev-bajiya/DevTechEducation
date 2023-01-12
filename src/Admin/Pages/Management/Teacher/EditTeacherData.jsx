import React from "react";
import freeLoadGif from "../../../../assets/gif/loaderspinnergif.gif";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import {
  Box,
  Collapse,
  NativeSelect,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { getdatatoprint } from "../../../../Redux/function";
import { editUserFun } from "../../../../Redux/action";

function EditTeacherData() {
  const [openFromDialogEditTeacherData, setOpenFromDialogEditTeacherData] =
    React.useState(true);
  const dispatch = useDispatch();
  let devtechUserList = getdatatoprint("c_t_user") || [];

  const { addUserStatus } = useSelector((state) => state);

  const [devTechUserData, setDevTechUserData] = React.useState({
    name: "",
    username: "",
    email: "",
    number: "",
  });

  const [inputreasonBoxValue, setInputreasonBoxValue] = React.useState("");
  const [inputuserBoxValue, setInputuserBoxValue] = React.useState("");
  const [inputusernameBoxValue, setInputusernameBoxValue] = React.useState("");
  const [inputuseremailBoxValue, setInputuseremailBoxValue] =
    React.useState("");
  const [inputusernumberBoxValue, setInputusernumberBoxValue] =
    React.useState("");

  const setuserinform = () => {
    for (let i = 0; i < devtechUserList.length; i++) {
      if (devtechUserList[i]._id === inputuserBoxValue) {
        let obj = {
          name: devtechUserList[i].name,
          username: devtechUserList[i].username,
          email: devtechUserList[i].email,
          number: devtechUserList[i].number,
        };
        setDevTechUserData(obj);
        break;
      }
    }
  };

  const edituserformdata = (event) => {
    event.preventDefault();
    devTechUserData.user = inputuserBoxValue;
    devTechUserData.name = inputusernameBoxValue;
    devTechUserData.email = inputuseremailBoxValue;
    devTechUserData.number = inputusernumberBoxValue;
    dispatch(editUserFun(devTechUserData));

    setInputreasonBoxValue("");
    setInputuserBoxValue("");
    setInputusernameBoxValue("");
    setInputuseremailBoxValue("");
    setInputusernumberBoxValue("");
    setDevTechUserData({
      name: "",
      username: "",
      email: "",
      number: "",
    });
  };

  //   User Successfully Alert State
  const [editTeacherSuccessfullyAlert, setEditTeacherSuccessfullyAlert] =
    React.useState(false);

  //   User Failed Alert State
  const [editTeacherFailedAlert, setEditTeacherFailedAlert] =
    React.useState(false);

  //   User Error Alert State
  const [editTeacherErrorAlert, setEditTeacherErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (!addUserStatus || !addUserStatus.status) {
      setEditTeacherSuccessfullyAlert(false);
      setEditTeacherFailedAlert(false);
      setEditTeacherErrorAlert(false);
    } else if (addUserStatus.status === "success") {
      setEditTeacherSuccessfullyAlert(true);
    } else if (addUserStatus.status === "fail") {
      setEditTeacherFailedAlert(true);
    } else if (addUserStatus.status === "error") {
      setEditTeacherErrorAlert(true);
    }
    if (devtechUserList.length > 0) {
      setInputuserBoxValue(devtechUserList[0]._id);
    }
  }, [addUserStatus]);

  return (
    <Dialog open={openFromDialogEditTeacherData}>
      <DialogTitle>Edit Teacher Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can change only name, email, number with teacher permission
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={edituserformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="edit_user_teacherList"
              value={inputuserBoxValue}
              onChange={(e) => setInputuserBoxValue(e.target.value)}
              name="user"
            >
              {devtechUserList.map((user, index) => (
                <option key={index} value={user._id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button onClick={setuserinform}>Get Teacher</Button>
          </Stack>

          {/* User Info */}
          <Box>Teacher Old Data</Box>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_name">Name</InputLabel>
            <Input
              disabled
              value={devTechUserData.name}
              id="edit_user_name"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <BadgeIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_username">Username</InputLabel>
            <Input
              disabled
              value={devTechUserData.username}
              id="edit_user_username"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <AccountCircle />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_email">Email</InputLabel>
            <Input
              disabled
              value={devTechUserData.email}
              id="edit_user_email"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <MailIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_number">Mobile Number</InputLabel>
            <Input
              disabled
              value={devTechUserData.number}
              id="edit_user_number"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <PhoneIcon />
                </IconButton>
              }
            />
          </FormControl>

          <Box>Teacher New Data</Box>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_newname">Name</InputLabel>
            <Input
              required
              value={inputusernameBoxValue}
              id="edit_user_newname"
              onChange={(e) => setInputusernameBoxValue(e.target.value)}
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <BadgeIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_newemail">Email</InputLabel>
            <Input
              required
              type="email"
              value={inputuseremailBoxValue}
              id="edit_user_newemail"
              onChange={(e) => setInputuseremailBoxValue(e.target.value)}
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <MailIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_newnumber">Mobile Number</InputLabel>
            <Input
              required
              type="number"
              value={inputusernumberBoxValue}
              onChange={(e) => setInputusernumberBoxValue(e.target.value)}
              id="edit_user_newnumber"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <PhoneIcon />
                </IconButton>
              }
            />
          </FormControl>

          {/* enter a valid reason for deactivating */}

          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="edit_user_reason"> reason </InputLabel>
            <Input
              required
              onChange={(e) => setInputreasonBoxValue(e.target.value)}
              name="reason"
              value={inputreasonBoxValue}
              id="edit_user_reason"
              endAdornment={
                <Tooltip title="Enter a valid reason for deactivating">
                  <IconButton style={{ width: "40px" }}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button
              type="submit"
              disabled={
                inputuserBoxValue === "" || devTechUserData.name === ""
                  ? true
                  : false
              }
            >
              {addUserStatus && addUserStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Update Teacher
            </Button>
            <Button onClick={() => setOpenFromDialogEditTeacherData(false)}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Typography>

      {/* User Successfully Alert */}
      <Collapse sx={{ width: "100%" }} in={editTeacherSuccessfullyAlert}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEditTeacherSuccessfullyAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Data Update <strong> Successfully </strong>
          </AlertTitle>
        </Alert>
      </Collapse>
      {/* User Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={editTeacherFailedAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEditTeacherFailedAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Update <strong> Failed </strong>
          </AlertTitle>
          Teacher already exists with <br /> same Email or Number <br /> -{" "}
          <strong>Use other Email or Number!</strong>
        </Alert>
      </Collapse>
      {/* User Error Alert */}
      <Collapse sx={{ width: "100%" }} in={editTeacherErrorAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEditTeacherErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Data Update <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
    </Dialog>
  );
}

export default EditTeacherData;

// Style part
const outerBoxForForm = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  width: "100%",
  borderRadius: "10px",
  textAlign: "center",
  fontFamily: "play",
  alignItems: "center",
  overflow: "hidden",
  padding: "0 20px 0 10px",
};
