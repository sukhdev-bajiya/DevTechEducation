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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
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
import { deleteCourseFun } from "../../../../Redux/action";
import { getdatatoprint } from "../../../../Redux/function";

function DeleteCourses() {
  const [openFromDialogDeleteCourses, setOpenFromDialogDeleteCourses] =
    React.useState(true);

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  let devtechCourseList = getdatatoprint("c_c_course") || [];

  //   Course Successfully Alert State
  const [deleteCoursesSuccessfullyAlert, setDeleteCoursesSuccessfullyAlert] =
    React.useState(false);

  //   Course Failed Alert State
  const [deleteCoursesFailedAlert, setDeleteCoursesFailedAlert] =
    React.useState(false);

  //   Course Error Alert State
  const [deleteCoursesErrorAlert, setDeleteCoursesErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (functionWorkStatus.status === "null") {
      setDeleteCoursesSuccessfullyAlert(false);
      setDeleteCoursesFailedAlert(false);
      setDeleteCoursesErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setDeleteCoursesSuccessfullyAlert(true);
      setOpenFromDialogDeleteCourses(false);
    } else if (functionWorkStatus.status === "fail") {
      setDeleteCoursesFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setDeleteCoursesErrorAlert(true);
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
  const [inputreasonBoxValue, setInputreasonBoxValue] = React.useState("");

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
  const deletecourseformdata = (event) => {
    event.preventDefault();

    // Call fetch function
    dispatch(deleteCourseFun({ id: inputActiveCourseBoxValue }));

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
    <Dialog open={openFromDialogDeleteCourses}>
      <DialogTitle>Delete Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete courses - Delete courses with all subjects and lectures in side
          of the course
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={deletecourseformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="delete_user_studentList"
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
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
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
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
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
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
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
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_course_titlereason"> Reason </InputLabel>
            <Input
              required
              onChange={(e) => setInputreasonBoxValue(e.target.value)}
              name="reason"
              value={inputreasonBoxValue}
              id="add_course_reason"
              endAdornment={
                <Tooltip title="Enter delete reason">
                  <IconButton style={{ width: "40px" }}>
                    <QuestionMarkIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>

          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button type="submit">
              {functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Delete Course
            </Button>
            <Button onClick={() => setOpenFromDialogDeleteCourses(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Course Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={deleteCoursesSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteCoursesSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Delete<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Course Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={deleteCoursesFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteCoursesFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Delete <strong> Failed </strong>
            </AlertTitle>
            Course already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Titel!</strong>
          </Alert>
        </Collapse>
        {/* Course Error Alert */}
        <Collapse sx={{ width: "100%" }} in={deleteCoursesErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteCoursesErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Course Delete <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default DeleteCourses;

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
