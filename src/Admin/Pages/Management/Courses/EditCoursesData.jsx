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
  NativeSelect,
  Stack,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { editCourseFun } from "../../../../Redux/action";
import { Box } from "@mui/system";
import { getdatatoprint } from "../../../../Redux/function";

function EditCoursesData() {
  const [openFromDialogEditCoursesData, setOpenFromDialogEditCoursesData] =
    React.useState(true);

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  let devtechCourseList = getdatatoprint("c_c_course") || [];

  //   Course Successfully Alert State
  const [editCoursesSuccessfullyAlert, setEditCoursesSuccessfullyAlert] =
    React.useState(false);

  //   Course Failed Alert State
  const [editCoursesFailedAlert, setEditCoursesFailedAlert] =
    React.useState(false);

  //   Course Error Alert State
  const [editCoursesErrorAlert, setEditCoursesErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (
      functionWorkStatus === undefined ||
      functionWorkStatus.status === "null"
    ) {
      setEditCoursesSuccessfullyAlert(false);
      setEditCoursesFailedAlert(false);
      setEditCoursesErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setEditCoursesSuccessfullyAlert(true);
      setTimeout(() => {
        setOpenFromDialogEditCoursesData(false);
      }, 3000);
    } else if (functionWorkStatus.status === "fail") {
      setEditCoursesFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setEditCoursesErrorAlert(true);
    }
  }, [functionWorkStatus]);

  // Form data stored in state
  const [inputActiveCourseBoxValue, setInputActiveCourseBoxValue] =
    React.useState("");

  const [inputBoxValue, setInputBoxValue] = React.useState({
    title: "",
    description: "",
    subDescription: "",
    image: "",
    fee: 0,
  });
  const [inputtitleBoxValue, setInputtitleBoxValue] = React.useState("");
  const [inputdescriptionBoxValue, setInputdescriptionBoxValue] =
    React.useState("");
  const [inputsubDescriptionBoxValue, setInputsubDescriptionBoxValue] =
    React.useState("");
  const [inputimageBoxValue, setInputimageBoxValue] = React.useState("");
  const [inputfeeBoxValue, setInputfeeBoxValue] = React.useState("");

  const setuserinform = () => {
    for (let i = 0; i < devtechCourseList.length; i++) {
      if (devtechCourseList[i]._id === inputActiveCourseBoxValue) {
        let obj = {
          title: devtechCourseList[i].title,
          description: devtechCourseList[i].description,
          subDescription: devtechCourseList[i].subDescription,
          image: devtechCourseList[i].image,
          fee: devtechCourseList[i].fee,
        };
        setInputBoxValue(obj);
        break;
      }
    }
  };

  // On submit post data
  const editcourseformdata = (event) => {
    event.preventDefault();

    if (inputtitleBoxValue !== "") inputBoxValue.title = inputtitleBoxValue;
    if (inputdescriptionBoxValue !== "")
      inputBoxValue.description = inputdescriptionBoxValue;
    if (inputsubDescriptionBoxValue !== "")
      inputBoxValue.subDescription = inputsubDescriptionBoxValue;
    if (inputimageBoxValue !== "") inputBoxValue.image = inputimageBoxValue;
    if (inputfeeBoxValue !== "") inputBoxValue.fee = inputfeeBoxValue;
    inputBoxValue.id = inputActiveCourseBoxValue;
    // Call fetch function
    dispatch(editCourseFun(inputBoxValue));
  };

  return (
    <Dialog open={openFromDialogEditCoursesData}>
      <DialogTitle>Edit Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit courses - You can edit courses title, description, sub
          description image and fee
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={editcourseformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="edit_user_studentList"
              value={inputActiveCourseBoxValue}
              onChange={(e) => setInputActiveCourseBoxValue(e.target.value)}
              name="activeCourse"
            >
              <option value="">Select Course</option>
              {devtechCourseList.map((course, index) => (
                <option key={index} value={course._id}>
                  {course.title} ({course.fee})
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button onClick={setuserinform}>Get Student</Button>
          </Stack>
          {/* Old Data */}
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_title"> Titel </InputLabel>
            <Input
              disabled
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
              disabled
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
          {/* <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_description">
              Description
            </InputLabel>
            <Input
              disabled
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
          </FormControl> */}
          {/* <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_image"> Course Image </InputLabel>
            <Input
              disabled
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
          </FormControl>*/}
          {/* <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_fee"> Fee </InputLabel>
            <Input
              disabled
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
          </FormControl> */}

          {/* New Data */}
          <Box>Add New Data</Box>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_title"> Titel </InputLabel>
            <Input
              onChange={(e) => setInputtitleBoxValue(e.target.value)}
              name="title"
              value={inputtitleBoxValue}
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
              onChange={(e) => setInputsubDescriptionBoxValue(e.target.value)}
              name="subDescription"
              value={inputsubDescriptionBoxValue}
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
              onChange={(e) => setInputdescriptionBoxValue(e.target.value)}
              name="description"
              value={inputdescriptionBoxValue}
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
              onChange={(e) => setInputimageBoxValue(e.target.value)}
              name="image"
              type="url"
              value={inputimageBoxValue}
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
              type="number"
              onChange={(e) => setInputfeeBoxValue(e.target.value)}
              name="fee"
              value={inputfeeBoxValue}
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
              {functionWorkStatus && functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Edit Course
            </Button>
            <Button onClick={() => setOpenFromDialogEditCoursesData(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Course Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={editCoursesSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditCoursesSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Edit<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Course Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={editCoursesFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditCoursesFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Edit <strong> Failed </strong>
            </AlertTitle>
            Course already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Titel!</strong>
          </Alert>
        </Collapse>
        {/* Course Error Alert */}
        <Collapse sx={{ width: "100%" }} in={editCoursesErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditCoursesErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Edit <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default EditCoursesData;

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
  overflowY: "auto",
  padding: "0 20px 0 10px",
};
