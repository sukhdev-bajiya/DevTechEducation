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

function AddStudent() {
  const [openFromDialogAddStudent, setOpenFromDialogAddStudent] =
    React.useState(true);

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   User Registered Successfully Alert State
  const [addStudentSuccessfullyAlert, setAddStudentSuccessfullyAlert] =
    React.useState(false);

  //   User Registration Failed Alert State
  const [addStudentFailedAlert, setAddStudentFailedAlert] =
    React.useState(false);

  //   User Registration Error Alert State
  const [addStudentErrorAlert, setAddStudentErrorAlert] = React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (
      functionWorkStatus === undefined ||
      functionWorkStatus.status === "null"
    ) {
      setAddStudentSuccessfullyAlert(false);
      setAddStudentFailedAlert(false);
      setAddStudentErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setAddStudentSuccessfullyAlert(true);
      setTimeout(() => {
        setOpenFromDialogAddStudent(false);
      }, 3000);
    } else if (functionWorkStatus.status === "fail") {
      setAddStudentFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setAddStudentErrorAlert(true);
    }
  }, [functionWorkStatus]);

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: "",
    email: "",
    number: "",
    dateofbirth: "",
    role: "student",
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
  };

  return (
    <Dialog open={openFromDialogAddStudent}>
      <DialogTitle style={{ textAlign: "center" }}>Add Student</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter student information to create new student account
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
              {functionWorkStatus && functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Add Student
            </Button>
            <Button onClick={() => setOpenFromDialogAddStudent(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* User Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={addStudentSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddStudentSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Student Registered <strong> Successfully </strong>
            </AlertTitle>
            Username and password were <br /> sent successfully to Student{" "}
            <br />
            registered email -{" "}
          </Alert>
        </Collapse>
        {/* User Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={addStudentFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddStudentFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Student Registration <strong> Failed </strong>
            </AlertTitle>
            Student already exists with <br /> same Email or Number <br /> -{" "}
            <strong>Use other Email or Number!</strong>
          </Alert>
        </Collapse>
        {/* User Error Alert */}
        <Collapse sx={{ width: "100%" }} in={addStudentErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddStudentErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Student Registration <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default AddStudent;

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
