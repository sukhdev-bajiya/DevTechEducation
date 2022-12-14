import React from "react";
import "./Management.css";
import { getuserdata, getdatatoprint } from "../../../Redux/function";

import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ShowSubject from "./ShowSubject";

export default function Management() {
  document.title = "Dev Tech Education || Student || Management";

  let userProfile = getuserdata().courses;

  let coursesList = getdatatoprint("c_c_course");
  let subjectsList = getdatatoprint("c_s_course");

  let showCoursesList = [];

  for (let i = 0; i < userProfile.length; i++) {
    for (let j = 0; j < userProfile.length; j++) {
      if (userProfile[i] === coursesList[j].title) {
        showCoursesList.push(coursesList[j]);
      }
    }
  }

  const [expanded, setExpanded] = React.useState(false);
  const [openSubjectListIndex, setOpenSubjectListIndex] = React.useState(-1);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setOpenSubjectListIndexFindByTitle = (title) => {
    for (let i = 0; i < subjectsList.length; i++) {
      if (subjectsList[i].title === title) {
        setOpenSubjectListIndex(i);
        break;
      }
    }
  };

  return (
    <>
      <div
        className="homePage_course"
        style={{ height: "100vh", justifyContent: "flex-start" }}
      >
        <div className="homePage_course_title">
          <span>My Course</span>
        </div>
        <div style={{ margin: "25px 0 50px 0" }}>
          {showCoursesList.map((course, index) => {
            return (
              <Accordion
                expanded={expanded === `course${index + 1}`}
                key={index}
                onChange={handleChange(`course${index + 1}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`course${index + 1}-content`}
                  id={`course${index + 1}-header`}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {index + 1}. {course.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {course.subDescription}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <p style={{ fontSize: "20px", fontStyle: "italic" }}>
                    Subjects -{" "}
                  </p>
                  {course.subject.map((subject, index) => (
                    <Box
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>
                        {index + 1}- {subject}
                      </h3>
                      <Button
                        onClick={() =>
                          setOpenSubjectListIndexFindByTitle(subject)
                        }
                      >
                        Open Subject
                      </Button>
                    </Box>
                  ))}

                  <br />
                  <h4 style={{ textAlign: "center" }}>About Course</h4>
                  <Typography style={{ display: "flex", gap: "15px" }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{ width: "150px" }}
                    />
                    <span>{course.description}</span>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>

      {openSubjectListIndex !== -1 ? (
        <>
          <Box
            onClick={() => {
              setOpenSubjectListIndex(-1);
            }}
            className="backToCourse"
          >
            Back To Course
          </Box>
          <ShowSubject {...subjectsList[openSubjectListIndex]} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
