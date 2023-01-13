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
import { NativeSelect, Tooltip, Typography, Collapse } from "@mui/material";
import { Stack } from "@mui/system";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { getdatatoprint } from "../../../../Redux/function";
import { deActiveUserFun } from "../../../../Redux/action";

function DeleteTeacher() {
  const [openFromDialogDeleteTeacher, setOpenFromDialogDeleteTeacher] =
    React.useState(true);
  const dispatch = useDispatch();
  let devtechUserList = getdatatoprint("c_t_user") || [];

  const { functionWorkStatus } = useSelector((state) => state);

  const [devTechUserData, setDevTechUserData] = React.useState({
    name: "",
    username: "",
    email: "",
    number: "",
    active: true,
  });

  const [inputreasonBoxValue, setInputreasonBoxValue] = React.useState("");
  const [inputuserBoxValue, setInputuserBoxValue] = React.useState("");
  const [inputacBoxValue, setInputacBoxValue] = React.useState(true);

  const setuserinform = () => {
    for (let i = 0; i < devtechUserList.length; i++) {
      if (devtechUserList[i]._id === inputuserBoxValue) {
        let obj = {
          name: devtechUserList[i].name,
          username: devtechUserList[i].username,
          email: devtechUserList[i].email,
          number: devtechUserList[i].number,
          active: devtechUserList[i].userDeactive,
        };
        setDevTechUserData(obj);
        setInputacBoxValue(devtechUserList[i].userDeactive);
        break;
      }
    }
  };

  const deactiveuserformdata = (event) => {
    event.preventDefault();
    dispatch(
      deActiveUserFun({ user: inputuserBoxValue, ac: !inputacBoxValue })
    );

    setInputreasonBoxValue("");
    setInputuserBoxValue("");
  };

  //   User Successfully Alert State
  const [
    deactiveTeacherSuccessfullyAlert,
    setDeactiveTeacherSuccessfullyAlert,
  ] = React.useState(false);

  //   User Failed Alert State
  const [deactiveTeacherFailedAlert, setDeactiveTeacherFailedAlert] =
    React.useState(false);

  //   User Error Alert State
  const [deactiveTeacherErrorAlert, setDeactiveTeacherErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (
      functionWorkStatus === undefined ||
      functionWorkStatus.status === "null"
    ) {
      setDeactiveTeacherSuccessfullyAlert(false);
      setDeactiveTeacherFailedAlert(false);
      setDeactiveTeacherErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setDeactiveTeacherSuccessfullyAlert(true);
      setTimeout(() => {
        setOpenFromDialogDeleteTeacher(false);
      }, 3000);
    } else if (functionWorkStatus.status === "fail") {
      setDeactiveTeacherFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setDeactiveTeacherErrorAlert(true);
    }
  }, [functionWorkStatus]);

  return (
    <Dialog open={openFromDialogDeleteTeacher}>
      <DialogTitle>Deactive Teacher</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deactive Teacher - after deactivating, teacher is not able to log in
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={deactiveuserformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="deactive_user_teacherList"
              value={inputuserBoxValue}
              onChange={(e) => setInputuserBoxValue(e.target.value)}
              name="user"
            >
              <option value="">Select Teacher</option>
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
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="deactive_user_name">Name</InputLabel>
            <Input
              disabled
              value={devTechUserData.name}
              id="deactive_user_name"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <BadgeIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="deactive_user_username">Username</InputLabel>
            <Input
              disabled
              value={devTechUserData.username}
              id="deactive_user_username"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <AccountCircle />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="deactive_user_email">Email</InputLabel>
            <Input
              disabled
              value={devTechUserData.email}
              id="deactive_user_email"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <MailIcon />
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="deactive_user_number">
              Mobile Number
            </InputLabel>
            <Input
              disabled
              value={devTechUserData.number}
              id="deactive_user_number"
              endAdornment={
                <IconButton style={{ width: "40px" }}>
                  <PhoneIcon />
                </IconButton>
              }
            />
          </FormControl>

          {/* enter a valid reason for deactivating */}

          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="deactive_user_reason"> reason </InputLabel>
            <Input
              required
              onChange={(e) => setInputreasonBoxValue(e.target.value)}
              name="reason"
              value={inputreasonBoxValue}
              id="deactive_user_reason"
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
            <Button type="submit">
              {functionWorkStatus && functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              {devTechUserData.active ? "Active Teacher" : "Deactive Teacher"}
            </Button>
            <Button onClick={() => setOpenFromDialogDeleteTeacher(false)}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Typography>

      {/* User Successfully Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveTeacherSuccessfullyAlert}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveTeacherSuccessfullyAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Activation
            <strong> Successfully </strong>
          </AlertTitle>
        </Alert>
      </Collapse>
      {/* User Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveTeacherFailedAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveTeacherFailedAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Activation
            <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
      {/* User Error Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveTeacherErrorAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveTeacherErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Teacher Activation
            <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
    </Dialog>
  );
}

export default DeleteTeacher;

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
