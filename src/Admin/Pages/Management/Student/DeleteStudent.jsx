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

function DeleteStudent() {
  const [openFromDialogDeleteStudent, setOpenFromDialogDeleteStudent] =
    React.useState(true);
  const dispatch = useDispatch();
  let devtechUserList = getdatatoprint("c_s_user") || [];

  const { addUserStatus } = useSelector((state) => state);

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
    setDevTechUserData({
      name: "",
      username: "",
      email: "",
      number: "",
      active: true,
    });
  };

  //   User Successfully Alert State
  const [
    deactiveStudentSuccessfullyAlert,
    setDeactiveStudentSuccessfullyAlert,
  ] = React.useState(false);

  //   User Failed Alert State
  const [deactiveStudentFailedAlert, setDeactiveStudentFailedAlert] =
    React.useState(false);

  //   User Error Alert State
  const [deactiveStudentErrorAlert, setDeactiveStudentErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (!addUserStatus || !addUserStatus.status) {
      setDeactiveStudentSuccessfullyAlert(false);
      setDeactiveStudentFailedAlert(false);
      setDeactiveStudentErrorAlert(false);
    } else if (addUserStatus.status === "true") {
      setDeactiveStudentSuccessfullyAlert(true);
    } else if (addUserStatus.status === "false") {
      setDeactiveStudentFailedAlert(true);
    } else if (addUserStatus.status === "error") {
      setDeactiveStudentErrorAlert(true);
    }
    if (devtechUserList.length > 0) {
      setInputuserBoxValue(devtechUserList[0]._id);
    }
  }, [addUserStatus]);

  return (
    <Dialog open={openFromDialogDeleteStudent}>
      <DialogTitle>Deactive Student</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deactive Student - after deactivating, student is not able to log in
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
              id="deactive_user_studentList"
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
            <Button onClick={setuserinform}>Get Student</Button>
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
              {addUserStatus && addUserStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              {devTechUserData.active ? "Active Student" : "Deactive Student"}
            </Button>
            <Button onClick={() => setOpenFromDialogDeleteStudent(false)}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Typography>

      {/* User Successfully Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveStudentSuccessfullyAlert}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveStudentSuccessfullyAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Student Activation
            <strong> Successfully </strong>
          </AlertTitle>
        </Alert>
      </Collapse>
      {/* User Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveStudentFailedAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveStudentFailedAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Student Activation
            <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
      {/* User Error Alert */}
      <Collapse sx={{ width: "100%" }} in={deactiveStudentErrorAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeactiveStudentErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            Student Activation
            <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
    </Dialog>
  );
}

export default DeleteStudent;

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
