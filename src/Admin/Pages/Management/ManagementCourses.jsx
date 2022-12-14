import React from "react";
import "./Management.css";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import AddCourses from "./Courses/AddCourses";
import EditCoursesData from "./Courses/EditCoursesData";
import DeleteCourses from "./Courses/DeleteCourses";
import CoursesTable from "./Courses/CoursesTable";
import AddUnitSubject from "./UnitAndSubject/AddUnitSubject";
import EditUnitSubjectData from "./UnitAndSubject/EditUnitSubjectData";
import DeleteUnitSubject from "./UnitAndSubject/DeleteUnitSubject";
import UnitAndSubjectTable from "./UnitAndSubject/UnitAndSubjectTable";
import AddLectures from "./Lectures/AddLectures";
import EditLecturesData from "./Lectures/EditLecturesData";
import DeleteLectures from "./Lectures/DeleteLectures";
import LecturesTable from "./Lectures/LecturesTable";

export default function ManagementCoursesTabPages() {
  document.title = "Dev Tech Education || Admin || Management";

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const [managementCoursesvalue, setManagementCourses] = React.useState(0);

  const managementCourseshandleChange = (event, newValue) => {
    setManagementCourses(newValue);
  };
  const managementCourseshandleChangeIndex = (index) => {
    setManagementCourses(index);
  };

  const [openFormDialogFunIndex, setOpenFormDialogFunIndex] =
    React.useState(-1);
  const openFormDialogFun = (index) => {
    if (openFormDialogFunIndex === index) {
      setOpenFormDialogFunIndex(-1);
    } else {
      setOpenFormDialogFunIndex(index);
    }
  };
  const managementPropItem = [
    <DeleteCourses />,
    <EditCoursesData />,
    null,
    <AddCourses />,
    <DeleteUnitSubject />,
    <EditUnitSubjectData />,
    null,
    <AddUnitSubject />,
    <DeleteLectures />,
    <EditLecturesData />,
    null,
    <AddLectures />,
  ];

  return (
    <Box sx={{ bgcolor: "background.paper", minHeight: "70vh" }}>
      <AppBar
        position="static"
        color="default"
        style={{ position: "fixed", width: "100%", zIndex: "5" }}
      >
        <Tabs
          value={managementCoursesvalue}
          onChange={managementCourseshandleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="COURSES" {...managementCoursesProps(0)} />
          <Tab label="UNIT / SUBJECT" {...managementCoursesProps(1)} />
          <Tab label="LECTURES" {...managementCoursesProps(2)} />
        </Tabs>
      </AppBar>
      <Box style={{ height: "60px" }}></Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={managementCoursesvalue}
        onChangeIndex={managementCourseshandleChangeIndex}
      >
        <ManagementCoursesTabPanel
          value={managementCoursesvalue}
          index={0}
          dir={theme.direction}
        >
          <CoursesTable />
        </ManagementCoursesTabPanel>
        <ManagementCoursesTabPanel
          value={managementCoursesvalue}
          index={1}
          dir={theme.direction}
        >
          <UnitAndSubjectTable />
        </ManagementCoursesTabPanel>
        <ManagementCoursesTabPanel
          value={managementCoursesvalue}
          index={2}
          dir={theme.direction}
        >
          <LecturesTable />
        </ManagementCoursesTabPanel>
      </SwipeableViews>
      {managementFabs.map((fab, fabIndex) =>
        fab === null ? (
          ""
        ) : (
          <Zoom
            key={fabIndex}
            in={managementCoursesvalue === fabIndex}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                managementCoursesvalue === fabIndex
                  ? transitionDuration.exit
                  : 0
              }ms`,
            }}
            unmountOnExit
          >
            <SpeedDial
              ariaLabel={fab.ariaLabel}
              sx={{ position: "fixed", bottom: 16, left: 16 }}
              icon={<SpeedDialIcon />}
            >
              {fab.actions.map((action, actionIndex) => (
                <SpeedDialAction
                  onClick={() => openFormDialogFun(action.funIndex)}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </Zoom>
        )
      )}

      {openFormDialogFunIndex !== -1
        ? managementPropItem[openFormDialogFunIndex]
        : ""}
    </Box>
  );
}

const managementFabs = [
  {
    ariaLabel: "Management Admin Courses Menu Item",
    actions: [
      { icon: <DeleteOutlineIcon />, name: "Delete Courses", funIndex: 0 },
      { icon: <EditIcon />, name: "Edit Courses Data", funIndex: 1 },
      { icon: <PrintIcon />, name: "Print Courses List", funIndex: 2 },
      { icon: <AddIcon />, name: "Add Courses", funIndex: 3 },
    ],
  },
  {
    ariaLabel: "Management Admin Unit / Subject Menu Item",
    actions: [
      {
        icon: <DeleteOutlineIcon />,
        name: "Delete Unit / Subject",
        funIndex: 4,
      },
      { icon: <EditIcon />, name: "Edit Unit / Subject Data", funIndex: 5 },
      { icon: <PrintIcon />, name: "Print Unit / Subject List", funIndex: 6 },
      { icon: <AddIcon />, name: "Add Unit / Subject", funIndex: 7 },
    ],
  },
  {
    ariaLabel: "Management Admin Lectures Menu Item",
    actions: [
      { icon: <DeleteOutlineIcon />, name: "Delete Lectures", funIndex: 8 },
      { icon: <EditIcon />, name: "Edit Lectures Data", funIndex: 9 },
      { icon: <PrintIcon />, name: "Print Lectures List", funIndex: 10 },
      { icon: <AddIcon />, name: "Add Lectures", funIndex: 11 },
    ],
  },
];

function ManagementCoursesTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`managementCourses_action_tabpanel_${index}`}
      aria-labelledby={`managementCourses_action_tab_${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

ManagementCoursesTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function managementCoursesProps(index) {
  return {
    id: `managementCourses_action_tab_${index}`,
    "aria-controls": `managementCourses_action_tabpanel_${index}`,
  };
}
