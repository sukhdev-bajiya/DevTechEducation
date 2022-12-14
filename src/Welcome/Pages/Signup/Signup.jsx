import React from "react";
import "./Signup.css";
import logonight from "../../../assets/images/logonight.png";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";
import backgroundImage from "../../../assets/images/backgroundImage.webp";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Collapse, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignUpFun } from "../../../Redux/action";

// Sign Up Page Return Part

export default function SignUp() {
  document.title = "Dev Tech Education || Student || SIGN UP";

  const { signupLoadingFlag, signupErrorFlag, signupSuccessData } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   User Registered Successfully Alert State
  const [userRegisteredSuccessfullyAlert, setUserRegisteredSuccessfullyAlert] =
    React.useState(false);

  //   User Registration Failed Alert State
  const [userRegistrationFailedAlert, setUserRegistrationFailedAlert] =
    React.useState(false);

  //   User Registration Error Alert State
  const [userRegistrationErrorAlert, setUserRegistrationErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (signupSuccessData === null) {
      setUserRegisteredSuccessfullyAlert(false);
      setUserRegistrationFailedAlert(false);
      setUserRegistrationErrorAlert(false);
    }
    if (
      signupSuccessData &&
      signupSuccessData.success &&
      !signupSuccessData.error
    ) {
      setUserRegisteredSuccessfullyAlert(true);
      let { data } = signupSuccessData;
      let password = data.email.split("@")[0];
      fetch(
        `https://script.google.com/macros/s/AKfycbzXTeE18f404PCyVtuK4Sw5-8dfDTIyFfbDdKEKjRP22KnqdG1DnDX1bWIGwL27HhZcaA/exec?Name=${data.name}&Email=${data.email}&Number=${data.number}&Template=<div><p><b> Dear ${data.name} </b>,</p><p>Greetings from <b> <i> Dev Tech Education! </i> </b> </p><p>Hope you are doing well,</p><p>Please find below the important details regarding your education journey</p><p>Important Details:-</p>Course Platform Username : <b> ${data.username} </b><br>Course Platform Password : <b> ${password} </b> <br>Course Platform Link : <a href="https://devtecheducation.netlify.app" target="_blank" >https://devtecheducation.netlify.app</a><br></p><p>You can write to us at <a href="mailto:devtecheducation@gmail.com" target="_blank">devtecheducation@gmail.com</a> for any additional information or queries</p><p>Happy Learning!</p><p>Regards,<br><b><i> Team Dev Tech Education </i></b></p></div>&Subject=Dev Tech Education Online Course Platform Login Credentials`
      );
    }
    if (
      signupSuccessData &&
      !signupSuccessData.success &&
      !signupSuccessData.error
    ) {
      setUserRegistrationFailedAlert(true);
    }
    if (signupErrorFlag) {
      setUserRegistrationErrorAlert(true);
    }
  }, [signupErrorFlag, signupSuccessData]);

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
  const signupformdata = (event) => {
    event.preventDefault();

    // Call fetch function
    dispatch(userSignUpFun(inputBoxValue));

    // Empty form data
    setInputBoxValue({
      name: "",
      email: "",
      number: "",
      dateofbirth: "",
    });
  };

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={outerBoxForForm}
      sx={{ width: { xs: "90%", sm: "50%" }, overflow: "hidden" }}
    >
      {/* Logo Part */}
      <Link to={"/"}>
        <img src={logonight} alt="" className="welcome_signup_logo" />
      </Link>

      {/* Signup form */}
      <form className="welcome_signup_formOutsideBox" onSubmit={signupformdata}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="welcome_signup_name"> Name </InputLabel>
          <Input
            required
            onChange={handleOnChangeInputBoxValue}
            name="name"
            value={inputBoxValue.name}
            id="welcome_signin_name"
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
          <InputLabel htmlFor="welcome_signup_email"> Email </InputLabel>
          <Input
            required
            type="email"
            onChange={handleOnChangeInputBoxValue}
            name="email"
            value={inputBoxValue.email}
            id="welcome_signin_email"
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
          <InputLabel htmlFor="welcome_signup_number"> Number </InputLabel>
          <Input
            required
            type="number"
            onChange={handleOnChangeInputBoxValue}
            name="number"
            value={inputBoxValue.number}
            id="welcome_signin_number"
            endAdornment={
              <Tooltip title="Enter your phone number">
                <IconButton style={{ width: "40px" }}>
                  <PhoneIcon />
                </IconButton>
              </Tooltip>
            }
          />
          {inputBoxValue.number === "" || inputBoxValue.number.length === 10 ? (
            ""
          ) : (
            <p style={{ color: "red", textAlign: "start" }}>
              Enter 10 digit number
            </p>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="welcome_signup_dateofbirth">
            {" "}
            Date Of Birth{" "}
          </InputLabel>
          <Input
            required
            type="date"
            onChange={handleOnChangeInputBoxValue}
            name="dateofbirth"
            value={inputBoxValue.dateofbirth}
            id="welcome_signin_dateofbirth"
          />
        </FormControl>
        <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
          <Button type="submit">
            {signupLoadingFlag ? (
              <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
            ) : (
              ""
            )}
            Sign Up
          </Button>
        </Stack>
      </form>
      {/* Link Page Box */}
      <Box>
        <p>
          You Have Already An Account ?
          <Link to="/signin" className="welcome_signin_createOne">
            Sign In
          </Link>
        </p>
      </Box>

      {/* User Registered Successfully Alert */}
      <Collapse sx={{ width: "100%" }} in={userRegisteredSuccessfullyAlert}>
        <Alert
          severity="success"
          action={
            <Button
              onClick={() => {
                return (
                  setUserRegisteredSuccessfullyAlert(false), navigate("/signin")
                );
              }}
              color="inherit"
              size="small"
            >
              Login
            </Button>
          }
        >
          <AlertTitle>
            User Registered <strong> Successfully </strong>
          </AlertTitle>
          Username and password were <br /> sent successfully to your <br />
          registered email -{" "}
          <strong>
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              check it out!
            </a>
          </strong>
        </Alert>
      </Collapse>
      {/* User Registration Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={userRegistrationFailedAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setUserRegistrationFailedAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            User Registration <strong> Failed </strong>
          </AlertTitle>
          User already exists with <br /> same Email or Number <br /> -{" "}
          <strong>Use other Email or Number!</strong>
        </Alert>
      </Collapse>
      {/* User Registration Failed Alert */}
      <Collapse sx={{ width: "100%" }} in={userRegistrationErrorAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setUserRegistrationErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>
            User Registration <strong> Failed </strong>
          </AlertTitle>
          <strong>Try after some time!</strong>
        </Alert>
      </Collapse>
    </Typography>
  );
}

// Style part
const outerBoxForForm = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  margin: "50px auto",
  borderRadius: "10px",
  textAlign: "center",
  fontFamily: "play",
  alignItems: "center",
  gap: "50px",
  paddingTop: "25px",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  borderLeft: "0px",
  borderStyle: "double",
  padding: "15px 0",
};
