import React from "react";
import { getdatatoprint } from "../../../Redux/function";

import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

export default function ShowSubject(subject) {
  document.title = "Dev Tech Education || Student || Management";

  let lecturesList = getdatatoprint("c_l_course");

  let showLecturesList = [];

  for (let i = 0; i < subject.lectures.length; i++) {
    for (let j = 0; j < lecturesList.length; j++) {
      if (subject.lectures[i] === lecturesList[j].title) {
        showLecturesList.push(lecturesList[j]);
      }
    }
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      className="showSubjectDataContainer"
      style={{
        height: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3>Subject - {subject.title}</h3>
      <Box>
        {showLecturesList.map((lectures, index) => {
          return (
            <Accordion
              expanded={expanded === `lectures${index + 1}`}
              key={index}
              onChange={handleChange(`lectures${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`lectures${index + 1}-content`}
                id={`lectures${index + 1}-header`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {index + 1}. {lectures.title}
                </Typography>
                <Typography>{lectures.subDescription}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box className="showSubjectDataContainerInfoPartVideo">
                  <iframe
                    src={lectures.video}
                    title={lectures.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>

                <Typography>{lectures.description}</Typography>
                <Typography>{lectures.descriptionHtml}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
