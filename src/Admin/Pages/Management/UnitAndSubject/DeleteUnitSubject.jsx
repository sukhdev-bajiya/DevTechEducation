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
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
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
import { deleteSubjectFun } from "../../../../Redux/action";
import { getdatatoprint } from "../../../../Redux/function";

function DeleteUnitSubject() {
  const [openFromDialogDeleteUnitSubject, setOpenFromDialogDeleteUnitSubject] =
    React.useState(true);

  let devtechCourseList = getdatatoprint("c_c_course") || [];
  let devtechSubjectList = getdatatoprint("c_s_course") || [];

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   Subject Successfully Alert State
  const [DeleteSubjectSuccessfullyAlert, setDeleteSubjectSuccessfullyAlert] =
    React.useState(false);

  //   Subject Failed Alert State
  const [DeleteSubjectFailedAlert, setDeleteSubjectFailedAlert] =
    React.useState(false);

  //   Subject Error Alert State
  const [DeleteSubjectErrorAlert, setDeleteSubjectErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (
      functionWorkStatus === undefined ||
      functionWorkStatus.status === "null"
    ) {
      setDeleteSubjectSuccessfullyAlert(false);
      setDeleteSubjectFailedAlert(false);
      setDeleteSubjectErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setDeleteSubjectSuccessfullyAlert(true);
      setTimeout(() => {
        setOpenFromDialogDeleteUnitSubject(false);
      }, 3000);
    } else if (functionWorkStatus.status === "fail") {
      setDeleteSubjectFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setDeleteSubjectErrorAlert(true);
    }
  }, [functionWorkStatus]);

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    title: "",
    description: "",
    subDescription: "",
    image: "",
  });
  const [inputuserBoxValue, setInputuserBoxValue] = React.useState("");
  const [inputreasonBoxValue, setInputreasonBoxValue] = React.useState("");

  const setuserinform = () => {
    for (let i = 0; i < devtechSubjectList.length; i++) {
      if (devtechSubjectList[i]._id === inputuserBoxValue) {
        let obj = {
          title: devtechSubjectList[i].title,
          description: devtechSubjectList[i].description,
          subDescription: devtechSubjectList[i].subDescription,
          image: devtechSubjectList[i].image,
        };
        setCourseName(devtechSubjectList[i].courses);
        setInputBoxValue(obj);
        break;
      }
    }
  };

  // On submit post data
  const Deletesubjectformdata = (event) => {
    event.preventDefault();
    inputBoxValue.courses = courseName;
    inputBoxValue.id = inputuserBoxValue;

    // Call fetch function
    dispatch(deleteSubjectFun(inputBoxValue));
  };

  const [courseName, setCourseName] = React.useState([]);

  const handleCourseChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourseName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Dialog open={openFromDialogDeleteUnitSubject}>
      <DialogTitle>Delete Unit / Subject</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete subject - In subject stor lectures video and notes
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={Deletesubjectformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="Delete_subjectList"
              value={inputuserBoxValue}
              onChange={(e) => setInputuserBoxValue(e.target.value)}
              name="subject"
            >
              <option value="">Select Subject</option>
              {devtechSubjectList.map((subject, index) => (
                <option key={index} value={subject._id}>
                  {subject.title} ({subject.lectures.length})
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button onClick={setuserinform}>Get Subject</Button>
          </Stack>

          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="Delete_subject_title"> Titel </InputLabel>
            <Input
              disabled
              name="title"
              value={inputBoxValue.title}
              id="Delete_subject_title"
              endAdornment={
                <Tooltip title="Enter subject title">
                  <IconButton style={{ width: "40px" }}>
                    <TitleIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="Delete_subject_subDescription">
              Sub Description
            </InputLabel>
            <Input
              disabled
              name="subDescription"
              value={inputBoxValue.subDescription}
              id="Delete_subject_subDescription"
              endAdornment={
                <Tooltip title="Enter subject subDescription">
                  <IconButton style={{ width: "40px" }}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="Delete_subject_description">
              Description
            </InputLabel>
            <Input
              disabled
              name="description"
              value={inputBoxValue.description}
              id="Delete_subject_description"
              endAdornment={
                <Tooltip title="Enter subject description">
                  <IconButton style={{ width: "40px" }}>
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="Delete_subject_image">
              Subject Image
            </InputLabel>
            <Input
              disabled
              name="image"
              type="url"
              value={inputBoxValue.image}
              id="Delete_subject_image"
              endAdornment={
                <Tooltip title="Enter subject image">
                  <IconButton style={{ width: "40px" }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="Delete_subject_course">
              Select Multiple Courses
            </InputLabel>
            <Select
              labelId="Delete_subject_course"
              id="Delete_subject_course_checkbox"
              multiple
              disabled
              value={courseName}
              onChange={handleCourseChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{ border: "none", outline: "none" }}
            >
              {devtechCourseList.map((course, index) => (
                <MenuItem key={index} value={course.title}>
                  <Checkbox checked={courseName.indexOf(course.title) > -1} />
                  <ListItemText primary={course.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              {functionWorkStatus && functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Delete Subject
            </Button>
            <Button onClick={() => setOpenFromDialogDeleteUnitSubject(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Subject Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={DeleteSubjectSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSubjectSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Delete<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Subject Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={DeleteSubjectFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSubjectFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Delete <strong> Failed </strong>
            </AlertTitle>
            Subject already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Titel!</strong>
          </Alert>
        </Collapse>
        {/* Subject Error Alert */}
        <Collapse sx={{ width: "100%" }} in={DeleteSubjectErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSubjectErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Delete <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default DeleteUnitSubject;

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
