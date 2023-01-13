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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { resetUsernameFun } from "../../../Redux/action";
import { useDispatch, useSelector } from "react-redux";

function ResetUsername() {
  const [openFromDialogResetUsername, setOpenFromDialogResetUsername] =
    React.useState(true);

  const { resetUsernameLoadingFlag, resetUsernameSuccessData } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [inputUserDetail, setInputBoxUserDetail] = React.useState({
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

    dispatch(resetUsernameFun(inputUserDetail));
  };

  return (
    <Dialog open={openFromDialogResetUsername}>
      <DialogTitle
        style={{ textAlign: "center", fontSize: "28px", fontWeight: "600" }}
      >
        Get Username
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
                <InputLabel htmlFor="welcome_resetusername_email">
                  {" "}
                  Enter Your Email{" "}
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
                  {" "}
                  Enter Your Number{" "}
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
                    {resetUsernameLoadingFlag ? (
                      <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
                    ) : (
                      "Get"
                    )}
                  </Button>
                  <Button onClick={() => setOpenFromDialogResetUsername(false)}>
                    Close
                  </Button>
                </div>
                <div>
                  {resetUsernameSuccessData &&
                  resetUsernameSuccessData.status === "fail" ? (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      Enter veiled data
                    </p>
                  ) : resetUsernameSuccessData &&
                    resetUsernameSuccessData.status === "success" ? (
                    <p style={{ color: "green", fontSize: "16px" }}>
                      Username sent on your registered email
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

export default ResetUsername;
