import React from "react";
import freeLoadGif from "../../../../assets/gif/loaderspinnergif.gif";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  Collapse,
  DialogContent,
  DialogContentText,
  Stack,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { addnewUserFun } from "../../../../Redux/action";

function AddTeacher() {
  const [openFromDialogAddTeacher, setOpenFromDialogAddTeacher] =
    React.useState(true);

  const { addUserStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   User Registered Successfully Alert State
  const [addTeacherSuccessfullyAlert, setAddTeacherSuccessfullyAlert] =
    React.useState(false);

  //   User Registration Failed Alert State
  const [addTeacherFailedAlert, setAddTeacherFailedAlert] =
    React.useState(false);

  //   User Registration Error Alert State
  const [addTeacherErrorAlert, setAddTeacherErrorAlert] = React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (!addUserStatus || !addUserStatus.status) {
      setAddTeacherSuccessfullyAlert(false);
      setAddTeacherFailedAlert(false);
      setAddTeacherErrorAlert(false);
    } else if (addUserStatus.status === "success") {
      setAddTeacherSuccessfullyAlert(true);
    } else if (addUserStatus.status === "fail") {
      setAddTeacherFailedAlert(true);
    } else if (addUserStatus.status === "error") {
      setAddTeacherErrorAlert(true);
    }
  }, [addUserStatus]);

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: "",
    email: "",
    number: "",
    dateofbirth: "",
    role: "teacher",
  });

  // On key press data stored in state
  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  // On submit post data
  const adduserformdata = (event) => {
    event.preventDefault();

    // Call fetch function
    dispatch(addnewUserFun(inputBoxValue));
    // Empty form data
    setInputBoxValue({
      name: "",
      email: "",
      number: "",
      dateofbirth: "",
      role: "teacher",
    });
  };

  return (
    <Dialog open={openFromDialogAddTeacher}>
      <DialogTitle style={{ textAlign: "center" }}>Add Teacher</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter teacher information to create new teacher account
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={adduserformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_user_name"> Name </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="name"
              value={inputBoxValue.name}
              id="add_user_name"
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
            <InputLabel htmlFor="add_user_email"> Email </InputLabel>
            <Input
              required
              type="email"
              onChange={handleOnChangeInputBoxValue}
              name="email"
              value={inputBoxValue.email}
              id="add_user_email"
              endAdornment={
                <Tooltip title="Enter your email address">
                  <IconButton style={{ width: "40px" }}>
                    <MailIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_user_number"> Number </InputLabel>
            <Input
              required
              type="number"
              onChange={handleOnChangeInputBoxValue}
              name="number"
              value={inputBoxValue.number}
              id="add_user_number"
              endAdornment={
                <Tooltip title="Enter your phone number">
                  <IconButton style={{ width: "40px" }}>
                    <PhoneIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            {inputBoxValue.number === "" ||
            inputBoxValue.number.length === 10 ? (
              ""
            ) : (
              <p style={{ color: "red", textAlign: "start" }}>
                Enter 10 digit number
              </p>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_user_dateofbirth">
              {" "}
              Date Of Birth{" "}
            </InputLabel>
            <Input
              required
              type="date"
              onChange={handleOnChangeInputBoxValue}
              name="dateofbirth"
              value={inputBoxValue.dateofbirth}
              id="add_user_dateofbirth"
            />
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button type="submit">
              {addUserStatus && addUserStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Add Teacher
            </Button>
            <Button onClick={() => setOpenFromDialogAddTeacher(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* User Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={addTeacherSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddTeacherSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Teacher Registered <strong> Successfully </strong>
            </AlertTitle>
            Username and password were <br /> sent successfully to Teacher{" "}
            <br />
            registered email -{" "}
          </Alert>
        </Collapse>
        {/* User Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={addTeacherFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddTeacherFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Teacher Registration <strong> Failed </strong>
            </AlertTitle>
            Teacher already exists with <br /> same Email or Number <br /> -{" "}
            <strong>Use other Email or Number!</strong>
          </Alert>
        </Collapse>
        {/* User Error Alert */}
        <Collapse sx={{ width: "100%" }} in={addTeacherErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddTeacherErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Teacher Registration <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default AddTeacher;

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
