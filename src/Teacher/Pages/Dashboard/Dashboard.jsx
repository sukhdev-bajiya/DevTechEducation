import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import studentImage from "../../../assets/images/Dashboard/student.png";
import coursesImage from "../../../assets/images/Dashboard/courses.png";
import { getuserdata, getdatatoprint } from "../../../Redux/function";

function Dashboard() {
  document.title = "Dev Tech Education || Teacher || Dashboard";

  let userProfile = getuserdata();
  let studentsList = getdatatoprint("c_s_user") || [];
  let coursesList = getdatatoprint("c_c_course") || [];
  let subjectsList = getdatatoprint("c_s_course") || [];
  let lecturesList = getdatatoprint("c_l_course") || [];

  let activeStudents = studentsList.length;
  let inActiveStudents = 0;

  for (let i = 0; i < studentsList.length; i++) {
    if (studentsList[i].userDeactive) {
      inActiveStudents++;
      activeStudents--;
    }
  }

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={{ display: "grid", gap: "15px", padding: "15px" }}
      sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
    >
      <Box style={boxStyleLeft}>
        <h4 style={{ textAlign: "center" }}>Profile</h4>
        <Box
          style={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "1fr 2fr",
            margin: "10px 0",
            fontSize: "20px",
          }}
        >
          <AssignmentIndIcon style={{ fontSize: "150px" }} />

          <Box>
            <p>
              Name -
              <i>
                {userProfile.name} ({userProfile.role})
              </i>
            </p>
            <p>
              Number - <i>{userProfile.number}</i>
            </p>
            <p>
              Email - <i>{userProfile.email}</i>
            </p>
            <p>
              DoB - <i>{userProfile.dateofbirth}</i>
            </p>
          </Box>
        </Box>
      </Box>
      <Box style={boxStyleRight}>
        <h4 style={{ textAlign: "center" }}>Courses</h4>
        <Box
          style={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "2fr 1fr",
            margin: "10px",
            fontSize: "20px",
          }}
        >
          <Box style={{ textAlign: "center" }}>
            <p style={{ color: "#3175d0" }}>
              Total Courses - <b>{coursesList.length}</b>
            </p>
            <p style={{ color: "#3175d0" }}>
              Total Subjects - <b>{subjectsList.length}</b>
            </p>
            <p style={{ color: "#3175d0" }}>
              Total Lectures - <b>{lecturesList.length}</b>
            </p>
          </Box>
          <img src={coursesImage} alt="teacher" style={{ height: "150px" }} />
        </Box>
      </Box>
      <Box style={boxStyleLeft}>
        <h4 style={{ textAlign: "center" }}>Students</h4>
        <Box
          style={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "1fr 2fr",
            margin: "10px",
            fontSize: "20px",
          }}
        >
          <img src={studentImage} alt="student" style={{ height: "150px" }} />
          <Box style={{ textAlign: "center" }}>
            <p style={{ color: "#3175d0" }}>
              Total Students - <b>{studentsList.length}</b>
            </p>
            <p style={{ color: "green" }}>
              Active Students - <b>{activeStudents}</b>
            </p>
            <p style={{ color: "red" }}>
              InActive Students - <b>{inActiveStudents}</b>
            </p>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Typography>
  );
}

export default Dashboard;

const boxStyleLeft = {
  width: "100%",
  borderRight: "0px",
  borderStyle: "double",
  padding: "15px 0",
  borderRadius: "10px",
  minHeight: "250px",
};

const boxStyleRight = {
  width: "100%",
  borderLeft: "0px",
  borderStyle: "double",
  padding: "15px 0",
  borderRadius: "10px",
  minHeight: "250px",
};
