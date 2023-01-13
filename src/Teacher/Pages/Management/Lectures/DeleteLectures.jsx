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
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
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
import { deleteLecturesFun } from "../../../../Redux/action";
import { getdatatoprint } from "../../../../Redux/function";

function DeleteLectures() {
  const [openFromDialogDeleteLectures, setOpenFromDialogDeleteLectures] =
    React.useState(true);

  let devtechLectureList = getdatatoprint("c_l_course") || [];
  let devtechSubjectList = getdatatoprint("c_s_course") || [];

  const { functionWorkStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  //   Lectures Successfully Alert State
  const [addLecturesSuccessfullyAlert, setDeleteLecturesSuccessfullyAlert] =
    React.useState(false);

  //   Lectures Failed Alert State
  const [addLecturesFailedAlert, setDeleteLecturesFailedAlert] =
    React.useState(false);

  //   Lectures Error Alert State
  const [addLecturesErrorAlert, setDeleteLecturesErrorAlert] =
    React.useState(false);

  // Alert State handle by Effect
  React.useEffect(() => {
    if (!functionWorkStatus || !functionWorkStatus.status) {
      setDeleteLecturesSuccessfullyAlert(false);
      setDeleteLecturesFailedAlert(false);
      setDeleteLecturesErrorAlert(false);
    } else if (functionWorkStatus.status === "success") {
      setDeleteLecturesSuccessfullyAlert(true);
      setOpenFromDialogDeleteLectures(false);
    } else if (functionWorkStatus.status === "fail") {
      setDeleteLecturesFailedAlert(true);
    } else if (functionWorkStatus.status === "error") {
      setDeleteLecturesErrorAlert(true);
    }
  }, [functionWorkStatus]);

  // Form data stored in state
  const [inputBoxValue, setInputBoxValue] = React.useState({
    title: "",
    description: "",
    subDescription: "",
    descriptionHtml: "",
    image: "",
    video: "",
  });

  const [inputuserBoxValue, setInputuserBoxValue] = React.useState("");
  const [inputreasonBoxValue, setInputreasonBoxValue] = React.useState("");

  const setlectureform = () => {
    for (let i = 0; i < devtechLectureList.length; i++) {
      if (devtechLectureList[i]._id === inputuserBoxValue) {
        let obj = {
          title: devtechLectureList[i].title,
          description: devtechLectureList[i].description,
          descriptionHtml: devtechLectureList[i].descriptionHtml,
          subDescription: devtechLectureList[i].subDescription,
          image: devtechLectureList[i].image,
          video: devtechLectureList[i].video,
        };
        setSubjectName(devtechLectureList[i].subject);
        setInputBoxValue(obj);
        break;
      }
    }
  };

  // On submit post data
  const addlecturesformdata = (event) => {
    event.preventDefault();
    inputBoxValue.subject = subjectName;
    inputBoxValue.id = inputuserBoxValue;

    // Call fetch function
    dispatch(deleteLecturesFun(inputBoxValue));
  };

  const [subjectName, setSubjectName] = React.useState([]);

  const handleSubjectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjectName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Dialog open={openFromDialogDeleteLectures}>
      <DialogTitle>Delete Lecture</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete lecture for students - In lectures stor lecture video and notes
        </DialogContentText>
      </DialogContent>
      <Typography variant="div" noWrap component="div" style={outerBoxForForm}>
        <form
          className="welcome_signup_formOutsideBox"
          onSubmit={addlecturesformdata}
          style={{ marginBottom: "10px" }}
        >
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <NativeSelect
              id="Delete_subjectList"
              value={inputuserBoxValue}
              onChange={(e) => setInputuserBoxValue(e.target.value)}
              name="subject"
            >
              <option value="">Select Lecture</option>
              {devtechLectureList.map((lecture, index) => (
                <option key={index} value={lecture._id}>
                  {lecture.title}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <Button onClick={setlectureform}>Get Subject</Button>
          </Stack>

          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_title"> Title </InputLabel>
            <Input
              disabled
              name="title"
              value={inputBoxValue.title}
              id="add_lectures_title"
              endAdornment={
                <Tooltip title="Enter lectures title">
                  <IconButton style={{ width: "40px" }}>
                    <TitleIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_subDescription">
              Sub Description
            </InputLabel>
            <Input
              disabled
              name="subDescription"
              value={inputBoxValue.subDescription}
              id="add_lectures_subDescription"
              endAdornment={
                <Tooltip title="Enter lectures subDescription">
                  <IconButton style={{ width: "40px" }}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_description">
              Description
            </InputLabel>
            <Input
              disabled
              name="description"
              value={inputBoxValue.description}
              id="add_lectures_description"
              endAdornment={
                <Tooltip title="Enter lectures description">
                  <IconButton style={{ width: "40px" }}>
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_descriptionHtml">
              Description in Html
            </InputLabel>
            <Input
              disabled
              name="descriptionHtml"
              value={inputBoxValue.descriptionHtml}
              id="add_lectures_descriptionHtml"
              endAdornment={
                <Tooltip title="Enter lectures description in html">
                  <IconButton style={{ width: "40px" }}>
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_image">Lectures Image</InputLabel>
            <Input
              disabled
              name="image"
              type="url"
              value={inputBoxValue.image}
              id="add_lectures_image"
              endAdornment={
                <Tooltip title="Enter lectures image">
                  <IconButton style={{ width: "40px" }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="add_lectures_video">Lectures Video</InputLabel>
            <Input
              disabled
              name="video"
              type="url"
              value={inputBoxValue.video}
              id="add_lectures_video"
              endAdornment={
                <Tooltip title="Enter lectures video">
                  <IconButton style={{ width: "40px" }}>
                    <OndemandVideoIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="add_lectures">Select Multiple Subjects</InputLabel>
            <Select
              disabled
              labelId="add_lectures"
              id="add_lectures_checkbox"
              multiple
              value={subjectName}
              onChange={handleSubjectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{ border: "none", outline: "none" }}
            >
              {devtechSubjectList.map((subject, index) => (
                <MenuItem key={index} value={subject.title}>
                  <Checkbox checked={subjectName.indexOf(subject.title) > -1} />
                  <ListItemText primary={subject.title} />
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
              {functionWorkStatus.status === "loading" ? (
                <img src={freeLoadGif} alt="" style={{ width: "50px" }} />
              ) : (
                ""
              )}
              Delete Lectures
            </Button>
            <Button onClick={() => setOpenFromDialogDeleteLectures(false)}>
              Cancel
            </Button>
          </Stack>
        </form>

        {/* Lectures Successfully Alert */}
        <Collapse sx={{ width: "100%" }} in={addLecturesSuccessfullyAlert}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteLecturesSuccessfullyAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Lectures Delete<strong> Successfully </strong>
            </AlertTitle>
          </Alert>
        </Collapse>
        {/* Lectures Failed Alert */}
        <Collapse sx={{ width: "100%" }} in={addLecturesFailedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteLecturesFailedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Lectures Delete <strong> Failed </strong>
            </AlertTitle>
            Lectures already exists with <br /> same title <br /> -{" "}
            <strong>Use Other Title!</strong>
          </Alert>
        </Collapse>
        {/* Lectures Error Alert */}
        <Collapse sx={{ width: "100%" }} in={addLecturesErrorAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteLecturesErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Lectures Delete <strong> Failed </strong>
            </AlertTitle>
            <strong>Try after some time!</strong>
          </Alert>
        </Collapse>
      </Typography>
    </Dialog>
  );
}

export default DeleteLectures;

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
