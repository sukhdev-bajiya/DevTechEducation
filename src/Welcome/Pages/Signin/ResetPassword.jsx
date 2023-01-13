import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFun } from "../../../Redux/action";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";

function ResetPassword() {
  const [openFromDialogResetPassword, setOpenFromDialogResetPassword] =
    React.useState(true);

  const { resetPasswordLoadingFlag, resetPasswordSuccessData } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [inputUserDetail, setInputBoxUserDetail] = React.useState({
    username: "",
    email: "",
    number: "",
  });

  // Key press input part
  const handleOnChangeInputBoxUserDetail = (e) => {
    const { name, value } = e.target;
    setInputBoxUserDetail({ ...inputUserDetail, [name]: value });
  };

  const inputUserDetailStep = (event) => {
    event.preventDefault();
    dispatch(resetPasswordFun(inputUserDetail));
  };

  return (
    <Dialog open={openFromDialogResetPassword}>
      <DialogTitle
        style={{ textAlign: "center", fontSize: "28px", fontWeight: "600" }}
      >
        Reset Password
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            component="div"
            sx={{ mt: 2, mb: 1, py: 1 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              className="welcome_resetusername_formOutsideBox"
              onSubmit={inputUserDetailStep}
            >
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="welcome_resetusername_username">
                  Enter Your Username
                </InputLabel>
                <Input
                  type="number"
                  required
                  onChange={handleOnChangeInputBoxUserDetail}
                  name="username"
                  value={inputUserDetail.username}
                  id="welcome_resetusername_username"
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
                <InputLabel htmlFor="welcome_resetusername_email">
                  Enter Your Email
                </InputLabel>
                <Input
                  required
                  type="email"
                  onChange={handleOnChangeInputBoxUserDetail}
                  name="email"
                  value={inputUserDetail.email}
                  id="welcome_resetusername_email"
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
                <InputLabel htmlFor="welcome_resetusername_number">
                  Enter Your Number
                </InputLabel>
                <Input
                  required
                  type="number"
                  onChange={handleOnChangeInputBoxUserDetail}
                  name="number"
                  value={inputUserDetail.number}
                  id="welcome_resetusername_number"
                  endAdornment={
                    <Tooltip title="Enter your phone number">
                      <IconButton style={{ width: "40px" }}>
                        <PhoneIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                {inputUserDetail.number === "" ||
                inputUserDetail.number.length === 10 ? (
                  ""
                ) : (
                  <p style={{ color: "red", textAlign: "start" }}>
                    Enter 10 digit number
                  </p>
                )}
              </FormControl>
              <Stack
                direction="row"
                spacing={1}
                style={{
                  margin: "auto",
                  dispatch: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Button type="submit">
                    {resetPasswordLoadingFlag ? (
                      <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
                    ) : (
                      "Get"
                    )}
                  </Button>
                  <Button onClick={() => setOpenFromDialogResetPassword(false)}>
                    Close
                  </Button>
                </div>
                <div>
                  {resetPasswordSuccessData &&
                  resetPasswordSuccessData.status === "fail" ? (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      Enter veiled data
                    </p>
                  ) : resetPasswordSuccessData &&
                    resetPasswordSuccessData.status === "success" ? (
                    <p style={{ color: "green", fontSize: "16px" }}>
                      Password sent on your registered email
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Stack>
            </form>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPassword;
