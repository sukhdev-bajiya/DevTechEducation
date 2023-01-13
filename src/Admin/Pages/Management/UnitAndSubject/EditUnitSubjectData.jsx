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
import { editSubjectFun } from "../../../../Redux/action";
import { getdatatoprint } from "../../../../Redux/function";

function EditUnitSubjectData() {
  const [
    openFromDialogEditUnitSubjectData,
    setOpenFromDialogEditUnitSubjectData,
  ] = React.useState(true);

  let devtechCourseList = getdatatoprint("c_c_course") || [];
  let devtechSubjectList = getdatatoprint("c_s_course") || [];

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   Subject Successfully Alert State
  const [EditSubjectSuccessfullyAlert, setEditSubjectSuccessfullyAlert] =
    React.useState(false);

  //   Subject Failed Alert State
  const [EditSubjectFailedAlert, setEditSubjectFailedAlert] =
    React.useState(false);

  //   Subject Error Alert State
  const [EditSubjectErrorAlert, setEditSubjectErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (functionWorkStatus.status === "null") {
      setEditSubjectSuccessfullyAlert(false);
      setEditSubjectFailedAlert(false);
      setEditSubjectErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setEditSubjectSuccessfullyAlert(true);
      setOpenFromDialogEditUnitSubjectData(false);
    } else if (functionWorkStatus.status === "fail") {
      setEditSubjectFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setEditSubjectErrorAlert(true);
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

  // On key press data stored in state
  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

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
  const Editsubjectformdata = (event) => {
    event.preventDefault();
    inputBoxValue.courses = courseName;
    inputBoxValue.id = inputuserBoxValue;

    // Call fetch function
    dispatch(editSubjectFun(inputBoxValue));

    // Empty form data
    setInputBoxValue({
      title: "",
      description: "",
      subDescription: "",
      image: "",
    });
    setCourseName([]);
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
    <Dialog open={openFromDialogEditUnitSubjectData}>
      <DialogTitle>Edit Subject</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit subject for students - In subject stor lectures video and notes
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={Editsubjectformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="Edit_subjectList"
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
            <InputLabel htmlFor="Edit_subject_title"> Titel </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="title"
              value={inputBoxValue.title}
              id="Edit_subject_title"
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
            <InputLabel htmlFor="Edit_subject_subDescription">
              Sub Description
            </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="subDescription"
              value={inputBoxValue.subDescription}
              id="Edit_subject_subDescription"
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
            <InputLabel htmlFor="Edit_subject_description">
              Description
            </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="description"
              value={inputBoxValue.description}
              id="Edit_subject_description"
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
            <InputLabel htmlFor="Edit_subject_image">
              {" "}
              Subject Image{" "}
            </InputLabel>
            <Input
              required
              onChange={handleOnChangeInputBoxValue}
              name="image"
              type="url"
              value={inputBoxValue.image}
              id="Edit_subject_image"
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
            <InputLabel id="Edit_subject_course">
              Select Multiple Courses
            </InputLabel>
            <Select
              labelId="Edit_subject_course"
              id="Edit_subject_course_checkbox"
              multiple
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

          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button type="submit">
              {functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Edit Subject
            </Button>
            <Button onClick={() => setOpenFromDialogEditUnitSubjectData(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Subject Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={EditSubjectSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditSubjectSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Edit<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Subject Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={EditSubjectFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditSubjectFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Edit <strong> Failed </strong>
            </AlertTitle>
            Subject already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Titel!</strong>
          </Alert>
        </Collapse>
        {/* Subject Error Alert */}
        <Collapse sx={{ width: "100%" }} in={EditSubjectErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setEditSubjectErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Subject Edit <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default EditUnitSubjectData;

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
const ITEM_PEditING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PEditING_TOP,
      width: 250,
    },
  },
};
