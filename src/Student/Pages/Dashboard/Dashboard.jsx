import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { getuserdata, getdatatoprint } from "../../../Redux/function.js";
import dayLogo from "../../../assets/images/logoday.png";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Input from "@mui/material/Input";
import { Tooltip } from "@mui/material";
import { FormControl, IconButton, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { buyaCourse } from "../../../Redux/action.js";

function Dashboard() {
  document.title = "Dev Tech Education || Student || Dashboard";

  const dispatch = useDispatch();

  const steps = ["Product Info", "Cart Item", "Make Order"];

  let userProfile = getuserdata().courses;
  let coursesList = getdatatoprint("c_c_course");
  let subjectsList = getdatatoprint("c_s_course");

  const [expanded, setExpanded] = React.useState(false);
  const [buyaCourseIndex, setBuyaCourseIndex] = React.useState(0);
  const [loading, setloading] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openCartandPaymentClose, setOpenCartandPaymentClose] =
    React.useState(false);

  const handleCartandPaymentClose = () => {
    setOpenCartandPaymentClose(false);
    setActiveStep(0);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      dispatch(buyaCourse({ title: coursesList[buyaCourseIndex].title }));
      setloading(true);
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setloading(false);
      }, 2000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleReset = () => {
    handleCartandPaymentClose();
    setActiveStep(0);
  };

  const [carddata, setCarddata] = useState({
    cardnumber: "",
    cardcvv: "",
    cardexdate: "2025-01-01",
    cardname: "",
  });

  const handlecarddata = (e) => {
    let { name, value } = e.target;
    setCarddata({ ...carddata, [name]: value });
  };

  const makepaymentfun = (event) => {
    event.preventDefault();
    handleNext();
  };

  const openBuyCoursOption = (index) => {
    let flag = userProfile.filter((cname) => {
      return cname === coursesList[index].title;
    });

    if (flag.length === 0) {
      setOpenCartandPaymentClose(true);
    } else {
      alert("Course already purchased");
    }
  };

  const handleClickOpenCartandPaymentClose = (index) => {
    setBuyaCourseIndex(index);
    openBuyCoursOption(index);
  };

  return (
    <>
      <div className="homePage_course">
        <div className="homePage_course_title">
          <span>All Courses</span>
        </div>
        <div className="homePage_course_list">
          {coursesList.map((course, index) => {
            return (
              <div className="homePage_course_listItem" key={index}>
                <div className="homePage_course_listItemImage">
                  <img src={course.image} alt="" />
                </div>
                <div className="homePage_course_listItemInfo">
                  <h4>{course.title}</h4>
                  <p>{course.subDescription}</p>
                </div>
                <div className="homePage_course_listItemBtn">
                  <button
                    onClick={() => handleClickOpenCartandPaymentClose(index)}
                  >
                    Buy Now
                  </button>
                  <button>Fee : ₹ {course.fee} </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="homePage_course">
        <div className="homePage_course_title">
          <span>Subjects</span>
        </div>
        <div style={{ margin: "25px 0 50px 0" }}>
          {subjectsList.map((subjec, index) => {
            return (
              <Accordion
                expanded={expanded === `subjec${index + 1}`}
                key={index}
                onChange={handleChange(`subjec${index + 1}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`subjec${index + 1}-content`}
                  id={`subjec${index + 1}-header`}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {index + 1}. {subjec.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {subjec.subDescription}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{subjec.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
      <div className="homePage_welcome_background">
        <img src={dayLogo} alt="Dev Tech Education" />
      </div>
      {/* Cart */}
      <Dialog
        open={openCartandPaymentClose}
        onClose={handleCartandPaymentClose}
        aria-labelledby="alert_dialogCartandPaymenttitle"
        aria-describedby="alert_dialogCartandPaymentdescription"
      >
        <DialogTitle
          id="alert_dialogCartandPaymenttitle"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Buy {coursesList[buyaCourseIndex].title} Course</span>
          {activeStep === steps.length ? (
            ""
          ) : (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              style={{ color: "red" }}
              onClick={handleCartandPaymentClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert_dialogCartandPaymentdescription">
            Purchase {coursesList[buyaCourseIndex].title} course and enjoy your
            learning with videos and notes.
          </DialogContentText>
        </DialogContent>

        <Box sx={{ width: "90%", alignSelf: "center", marginBottom: "10px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <h2 style={{ textAlign: "center", color: "green" }}>
                  Your Payment is Successfully Done
                </h2>
                <p style={{ textAlign: "center", color: "green" }}>
                  Happy Learning...
                </p>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Close</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ mt: 2, mb: 1 }}>
                {activeStep === 0 ? (
                  <Box>
                    <h4
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span> {coursesList[buyaCourseIndex].title}</span>
                      <span>₹ {coursesList[buyaCourseIndex].fee}.00</span>
                    </h4>
                    <h5> Subjects - </h5>
                    {coursesList[buyaCourseIndex].subject.map(
                      (subject, index) => (
                        <p key={index}>{subject}</p>
                      )
                    )}
                  </Box>
                ) : activeStep === 1 ? (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <img src={coursesList[buyaCourseIndex].image} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4> {coursesList[buyaCourseIndex].title}</h4>
                      <p> {coursesList[buyaCourseIndex].subDescription}</p>
                      <h4>₹ {coursesList[buyaCourseIndex].fee}.00</h4>
                    </div>
                  </Box>
                ) : (
                  <form onSubmit={makepaymentfun}>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="payment_cardnumber">
                        Card Number
                      </InputLabel>
                      <Input
                        required
                        type="number"
                        name="cardnumber"
                        onChange={handlecarddata}
                        value={carddata.cardnumber}
                        id="payment_cardnumber"
                        endAdornment={
                          <Tooltip title="Enter your 16 digit card number">
                            <IconButton style={{ width: "40px" }}></IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="payment_cardcvv">
                        Card CVV
                      </InputLabel>
                      <Input
                        required
                        type="number"
                        name="cardcvv"
                        onChange={handlecarddata}
                        value={carddata.cardcvv}
                        id="payment_cardcvv"
                        endAdornment={
                          <Tooltip title="Enter your 3 digit card cvv number">
                            <IconButton style={{ width: "40px" }}></IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="payment_cardexdate">
                        Card Ex Date
                      </InputLabel>
                      <Input
                        required
                        type="date"
                        name="cardexdate"
                        onChange={handlecarddata}
                        value={carddata.cardexdate}
                        id="payment_cardexdate"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="payment_cardname">
                        Card Holder Name
                      </InputLabel>
                      <Input
                        required
                        name="cardname"
                        onChange={handlecarddata}
                        value={carddata.cardname}
                        id="payment_cardname"
                        endAdornment={
                          <Tooltip title="Enter card holder name">
                            <IconButton style={{ width: "40px" }}></IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>

                    <Button type="submit">
                      {loading ? (
                        <img
                          src={freeLoadGif}
                          alt=""
                          style={{ width: "50px" }}
                        />
                      ) : (
                        ""
                      )}
                      Make Payment
                    </Button>
                  </form>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default Dashboard;

// const boxStyleLeft = {
//   width: "100%",
//   borderRight: "0px",
//   borderStyle: "double",
//   padding: "15px 0",
//   borderRadius: "10px",
//   minHeight: "250px",
// };

// const boxStyleRight = {
//   width: "100%",
//   borderLeft: "0px",
//   borderStyle: "double",
//   padding: "15px 0",
//   borderRadius: "10px",
//   minHeight: "250px",
// };
