import React from "react";
import freeLoadGif from "../../../../assets/gif/loaderspinnergif.gif";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/Comment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Collapse,
  DialogContent,
  DialogContentText,
  Stack,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { addNewCourseFun } from "../../../../Redux/action";

function AddCourses() {
  const [openFromDialogAddCourses, setOpenFromDialogAddCourses] =
    React.useState(true);

  const { addUserStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   Course Successfully Alert State
  const [addCourseSuccessfullyAlert, setAddCourseSuccessfullyAlert] =
    React.useState(false);

  //   Course Failed Alert State
  const [addCourseFailedAlert, setAddCourseFailedAlert] = React.useState(false);

  //   Course Error Alert State
  const [addCourseErrorAlert, setAddCourseErrorAlert] = React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (!addUserStatus || !addUserStatus.status) {
      setAddCourseSuccessfullyAlert(false);
      setAddCourseFailedAlert(false);
      setAddCourseErrorAlert(false);
    } else if (addUserStatus.status === "true") {
      setAddCourseSuccessfullyAlert(true);
    } else if (addUserStatus.status === "false") {
      setAddCourseFailedAlert(true);
    } else if (addUserStatus.status === "error") {
      setAddCourseErrorAlert(true);
    }
  }, [addUserStatus]);

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    title: "",
    description: "",
    subDescription: "",
    image: "",
    fee: 0,
  });

  // On key press data stored in state
  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  // On submit post data
  const addcourseformdata = (event) => {
    event.preventDefault();

    // Call fetch function
    dispatch(addNewCourseFun(inputBoxValue));

    // Empty form data
    setInputBoxValue({
      title: "",
      description: "",
      subDescription: "",
      image: "",
      fee: 0,
    });
  };

  return (
    <Dialog open={openFromDialogAddCourses}>
      <DialogTitle>Add Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add courses for students - In courses stor subject and lectures
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={addcourseformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_title"> Titel </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="title"
              value={inputBoxValue.title}
              id="add_course_title"
              endAdornment={
                <Tooltip title="Enter course title">
                  <IconButton style={{ width: "40px" }}>
                    <TitleIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_subDescription">
              Sub Description
            </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="subDescription"
              value={inputBoxValue.subDescription}
              id="add_course_subDescription"
              endAdornment={
                <Tooltip title="Enter course subDescription">
                  <IconButton style={{ width: "40px" }}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_description">
              Description
            </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="description"
              value={inputBoxValue.description}
              id="add_course_description"
              endAdornment={
                <Tooltip title="Enter course description">
                  <IconButton style={{ width: "40px" }}>
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_image"> Course Image </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="image"
              type="url"
              value={inputBoxValue.image}
              id="add_course_image"
              endAdornment={
                <Tooltip title="Enter course image">
                  <IconButton style={{ width: "40px" }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_fee"> Fee </InputLabel>
            <Input
              required
              type="number"
              onChange={handleOnChangeInputBoxValue}
              name="fee"
              value={inputBoxValue.fee}
              id="add_course_fee"
              endAdornment={
                <Tooltip title="Enter course fee">
                  <IconButton style={{ width: "40px" }}>
                    <CurrencyRupeeIcon />
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
              Add Course
            </Button>
            <Button onClick={() => setOpenFromDialogAddCourses(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Course Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={addCourseSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddCourseSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Add<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Course Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={addCourseFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddCourseFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Add <strong> Failed </strong>
            </AlertTitle>
            Course already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Titel!</strong>
          </Alert>
        </Collapse>
        {/* Course Error Alert */}
        <Collapse sx={{ width: "100%" }} in={addCourseErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAddCourseErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Add <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default AddCourses;

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
