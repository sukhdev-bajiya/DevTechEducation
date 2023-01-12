import React from "react";
import "./Signin.css";
import logonight from "../../../assets/images/logonight.png";
import backgroundImage from "../../../assets/images/backgroundImage.webp";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";
import ResetPassword from "./ResetPassword";
import ResetUsername from "./ResetUsername";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Collapse, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { userSignInFun } from "../../../Redux/action";
import { useNavigate } from "react-router-dom";

// Sign In Page Return Part

export default function SignIn() {
  document.title = "Dev Tech Education || SIGNIN";

  const { signinSuccessData, signinLoadingFlag, signinErrorFlag } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   User Login Failed Alert State
  const [userLoginFailedAlert, setUserLoginFailedAlert] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  //   User Registration Error Alert State
  const [userLoginErrorAlert, setUserLoginErrorAlert] = React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (signinSuccessData === null) {
      setUserLoginFailedAlert(false);
      setUserLoginErrorAlert(false);
    } else if (signinSuccessData && signinSuccessData.status === "success") {
      localStorage.setItem("user", signinSuccessData.data);
      sessionStorage.setItem("user", JSON.stringify(signinSuccessData));

      setloading(true);
      setTimeout(() => {
        setloading(false);
        if (signinSuccessData.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (signinSuccessData.user.role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (signinSuccessData.user.role === "student") {
          navigate("/student/dashboard");
        }
      }, 5000);
    } else if (signinSuccessData && signinSuccessData.status === "fail") {
      setUserLoginFailedAlert(true);
    } else if (signinSuccessData && signinSuccessData.status === "error") {
      setUserLoginErrorAlert(true);
    }
  }, [navigate, signinErrorFlag, signinSuccessData]);

  // Password show and hide button part
  const [valuesPasswordViewPart, setvaluesPasswordViewPart] =
    React.useState(false);
  const handleClickShowPassword = () => {
    setvaluesPasswordViewPart(!valuesPasswordViewPart);
  };

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    password: "",
    username: "",
  });

  // On key press data stored in state
  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  // On submit post data
  const signinformdata = (event) => {
    event.preventDefault();

    // Call fetch function
    dispatch(userSignInFun(inputBoxValue));
  };

  // Open Option for Reset Password and Get Username Function
  const [openFormDialogFunIndex, setOpenFormDialogFunIndex] =
    React.useState(-1);
  const openFormDialogFun = (index) => {
    if (openFormDialogFunIndex === index) {
      setOpenFormDialogFunIndex(-1);
    } else {
      setOpenFormDialogFunIndex(index);
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Welcome To</h1>
          <img
            src={logonight}
            alt=""
            style={{ width: "250px", marginTop: "25px" }}
          />
          <img
            src={freeLoadGif}
            alt=""
            style={{ width: "100px", marginTop: "25px" }}
          />
        </div>
      ) : (
        <Typography
          variant="div"
          noWrap
          component="div"
          style={outerBoxForForm}
          sx={{ width: { xs: "90%", sm: "50%" }, overflow: "hidden" }}
        >
          {/* Logo Part */}
          <Link to={"/"}>
            <img src={logonight} alt="" className="welcome_signin_logo" />
          </Link>
          {/* Signin form */}
          <form
            className="welcome_signin_formOutsideBox"
            onSubmit={signinformdata}
          >
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="welcome_signin_username">
                {" "}
                Username{" "}
              </InputLabel>
              <Input
                required
                type="number"
                onChange={handleOnChangeInputBoxValue}
                name="username"
                value={inputBoxValue.username}
                id="welcome_signin_username"
                endAdornment={
                  <Tooltip title="Enter your 13 digit username">
                    <IconButton style={{ width: "40px" }}>
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="welcome_signin_password">
                Password
              </InputLabel>
              <Input
                required
                name="password"
                value={inputBoxValue.password}
                id="welcome_signin_password"
                type={valuesPasswordViewPart ? "text" : "password"}
                onChange={handleOnChangeInputBoxValue}
                endAdornment={
                  <Tooltip title="Enter your password">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ width: "40px" }}
                    >
                      {valuesPasswordViewPart ? (
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
              {signinLoadingFlag || loading ? (
                <img
                  src={freeLoadGif}
                  alt=""
                  style={{ width: "50px", margin: "auto" }}
                />
              ) : (
                <Button type="submit" disabled={loading}>
                  Login
                </Button>
              )}
            </Stack>
          </form>

          {/* Link Page Box */}
          <Box>
            <p>
              {" "}
              No account?{" "}
              <Link to="/signup" className="welcome_signin_createOne">
                Create New Account
              </Link>{" "}
            </p>
          </Box>

          {/* User Option for Reset Password and Get Username */}
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button onClick={() => openFormDialogFun(0)}>Reset Password</Button>
            <Button onClick={() => openFormDialogFun(1)}>Get Username</Button>
          </Stack>

          {/* User Login Failed Alert */}
          <Collapse sx={{ width: "100%" }} in={userLoginFailedAlert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setUserLoginFailedAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>
                User Signin <strong> Failed </strong>
              </AlertTitle>
              <strong>Enter valid Username or Password!</strong>
            </Alert>
          </Collapse>
          {/* User Login Failed Alert */}
          <Collapse sx={{ width: "100%" }} in={userLoginErrorAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setUserLoginErrorAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>
                User Signin <strong> Failed </strong>
              </AlertTitle>
              <strong>Try after some time!</strong>
            </Alert>
          </Collapse>

          {/* User Option for Reset Password and Get Username Function*/}
          {openFormDialogFunIndex === 0 ? (
            <ResetPassword />
          ) : openFormDialogFunIndex === 1 ? (
            <ResetUsername />
          ) : (
            ""
          )}
        </Typography>
      )}
    </>
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
