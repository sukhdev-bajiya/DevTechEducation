import React from "react";
import "./Management.css";

import DeleteStudent from "./Student/DeleteStudent";
import EditStudentData from "./Student/EditStudentData";
import AddStudent from "./Student/AddStudent";
import StudentTable from "./Student/StudentTable";

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
import ManagementCoursesTabPages from "./ManagementCourses";

export default function Management() {
  document.title = "Dev Tech Education || Teacher || Management";

  const theme = useTheme();
  const [managementValue, setManagementValue] = React.useState(0);

  const managementHandleChange = (event, newValue) => {
    setManagementValue(newValue);
  };

  const managementHandleChangeIndex = (index) => {
    setManagementValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
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
    null,
    null,
    null,
    null,
    <DeleteStudent />,
    <EditStudentData />,
    null,
    <AddStudent />,
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <AppBar
        position="static"
        color="default"
        style={{ position: "fixed", width: "100%", zIndex: "6" }}
      >
        <Tabs
          value={managementValue}
          onChange={managementHandleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="COURSES" {...managementTabProps(0)} />
          <Tab label="STUDENT" {...managementTabProps(1)} />
        </Tabs>
      </AppBar>
      <Box style={{ height: "60px" }}></Box>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={managementValue}
        onChangeIndex={managementHandleChangeIndex}
      >
        <ManagementTabPanel
          value={managementValue}
          index={0}
          dir={theme.direction}
        >
          <ManagementCoursesTabPages />
        </ManagementTabPanel>

        <ManagementTabPanel
          value={managementValue}
          index={1}
          dir={theme.direction}
        >
          <StudentTable />
        </ManagementTabPanel>
      </SwipeableViews>
      {managementFabs.map((fab, index) =>
        fab === null ? (
          ""
        ) : (
          <Zoom
            // key={fab.color}
            key={index}
            in={managementValue === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                managementValue === index ? transitionDuration.exit : 0
              }ms`,
            }}
            unmountOnExit
          >
            <SpeedDial
              ariaLabel={fab.ariaLabel}
              sx={{ position: "fixed", bottom: 16, left: 16 }}
              icon={<SpeedDialIcon />}
            >
              {fab.actions.map((action) => (
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
  null,
  {
    ariaLabel: "Management Admin Student Menu Item",
    actions: [
      { icon: <DeleteOutlineIcon />, name: "Delete Student", funIndex: 4 },
      { icon: <EditIcon />, name: "Edit Student Data", funIndex: 5 },
      { icon: <PrintIcon />, name: "Print Student List", funIndex: 6 },
      { icon: <AddIcon />, name: "Add Student", funIndex: 7 },
    ],
  },
];

function ManagementTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`management_action_tabpanel_${index}`}
      aria-labelledby={`management_action_tab_${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

ManagementTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function managementTabProps(index) {
  return {
    id: `management_action_tab_${index}`,
    "aria-controls": `management_action_tabpanel_${index}`,
  };
}
