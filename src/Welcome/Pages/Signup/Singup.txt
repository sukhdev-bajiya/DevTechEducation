import React from 'react'
import './Signup.css'
import logonight from '../../../assets/images/logonight.png'
import successImg from '../../../assets/images/success.png'
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif"

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { userSignUpFun } from '../../../Redux/action'
import { NativeSelect, Tooltip } from '@mui/material';


// Sign Up Page Return Part

export default function SignUp() {
    document.title = "Dev Tech Education || Student || SIGN UP"

    const { signupLoadingFlag, signupErrorFlag, signupSuccessData } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputBoxValue, setInputBoxValue] = React.useState({
        name: "",
        password: "",
        email: "",
        number: "",
        dateofbirth: "",
        securityAnswer1: "",
        securityAnswer2: "",
        securityQuestion1: "What is your favorite movie?",
        securityQuestion2: "Who is your favorite actor, musician, or artist?"
    });
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [buttonDisable, setButtonDisable] = React.useState(true);

    // Password show and hide button part
    const [valuesPasswordViewPart, setvaluesPasswordViewPart] = React.useState(false);
    const handleClickShowPassword = () => {
        setvaluesPasswordViewPart(!valuesPasswordViewPart)
    };
    const [valuesPasswordConfirmViewPart, setvaluesPasswordConfirmViewPart] = React.useState(false);
    const handleClickShowPasswordConfirm = () => {
        setvaluesPasswordConfirmViewPart(!valuesPasswordConfirmViewPart)
    };

    const signupformdata = (event) => {
        event.preventDefault();
        inputBoxValue.role = "student"
        dispatch(userSignUpFun(inputBoxValue))
        setPasswordConfirm("")
        setInputBoxValue({
            name: "",
            password: "",
            email: "",
            number: "",
            dateofbirth: "",
            securityAnswer1: "",
            securityAnswer2: "",
            securityQuestion1: "What is your favorite movie?",
            securityQuestion2: "Who is your favorite actor, musician, or artist?"
        })
    }

    // Key press input part
    const handleOnChangeInputBoxValue = (e) => {
        const { name, value } = e.target;
        setInputBoxValue({ ...inputBoxValue, [name]: value });

        if (inputBoxValue.name.length > 3 && inputBoxValue.password.length > 7 && inputBoxValue.number.length === 10 && inputBoxValue.dateofbirth !== "" && inputBoxValue.securityAnswer1.length > 2 && inputBoxValue.securityAnswer2.length > 2) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    };

    const outerBoxForForm = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        margin: "50px auto",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "play",
        alignItems: "center",
        gap: "50px"
    };

    return (
        <Typography
            variant="div"
            noWrap
            component="div"
            style={outerBoxForForm}
            sx={{ width: { xs: "90%", sm: "50%" }, overflow: "hidden" }}
        >
            <Link to={"/"}><img src={logonight} alt="" className='welcome_signup_logo' /></Link>
            <form className='welcome_signup_formOutsideBox' onSubmit={signupformdata}>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_name"> Name </InputLabel>
                    <Input
                        required
                        onChange={handleOnChangeInputBoxValue}
                        name="name"
                        value={inputBoxValue.name}
                        id="welcome_signin_name"
                        endAdornment={
                            <Tooltip title="Enter your full name and name length is more then 3">
                                <IconButton style={{ width: "40px" }}>
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_email"> Email </InputLabel>
                    <Input
                        required
                        type='email'
                        onChange={handleOnChangeInputBoxValue}
                        name="email"
                        value={inputBoxValue.email}
                        id="welcome_signin_email"
                        endAdornment={
                            <Tooltip title="Enter your email address">
                                <IconButton style={{ width: "40px" }}>
                                    <MailIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_number"> Number </InputLabel>
                    <Input
                        required
                        type='number'
                        onChange={handleOnChangeInputBoxValue}
                        name="number"
                        value={inputBoxValue.number}
                        id="welcome_signin_number"

                        endAdornment={
                            <Tooltip title="Enter your phone number">
                                <IconButton style={{ width: "40px" }}>
                                    <PhoneIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    {inputBoxValue.number === "" || inputBoxValue.number.length === 10 ? "" : <p style={{ color: "red", textAlign: 'start' }}>Enter 10 digit number</p>}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_dateofbirth"> Date Of Birth </InputLabel>
                    <Input
                        required
                        type='date'
                        onChange={handleOnChangeInputBoxValue}
                        name="dateofbirth"
                        value={inputBoxValue.dateofbirth}
                        id="welcome_signin_dateofbirth"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_password">Password</InputLabel>
                    <Input
                        required
                        name="password"
                        value={inputBoxValue.password}
                        id="welcome_signup_password"
                        type={valuesPasswordViewPart ? "text" : "password"}
                        onChange={handleOnChangeInputBoxValue}
                        endAdornment={
                            <Tooltip title="Enter 8 digit password">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    style={{ width: "40px" }}
                                >
                                    {valuesPasswordViewPart ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_passwordConfirm">Confirm Password</InputLabel>
                    <Input
                        required
                        name="confirmPassword"
                        value={passwordConfirm}
                        id="welcome_signup_passwordConfirm"
                        type={valuesPasswordConfirmViewPart ? "text" : "password"}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        endAdornment={
                            <Tooltip title="Enter same as password">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowPasswordConfirm}
                                    style={{ width: "40px" }}
                                >
                                    {valuesPasswordConfirmViewPart ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    {passwordConfirm === "" || inputBoxValue.password === passwordConfirm ? "" : <p style={{ color: "red", textAlign: 'start' }}>Enter the same password</p>}
                    {/* {inputBoxValue.password === passwordConfirm ? <p style={{ color: "green", textAlign: 'start' }}>Hello</p> : <p style={{ color: "red", textAlign: 'start' }}>By</p>} */}

                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel variant="standard" htmlFor="welcome_signup_securityQuestion1"> Security Question</InputLabel>
                    <NativeSelect
                        id="welcome_signup_securityQuestion1"
                        value={inputBoxValue.securityQuestion1}
                        onChange={handleOnChangeInputBoxValue}
                        name='securityQuestion1'
                    >
                        {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                    </NativeSelect>
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_securityAnswer1"> Security Question Answer</InputLabel>
                    <Input
                        required
                        onChange={handleOnChangeInputBoxValue}
                        name="securityAnswer1"
                        value={inputBoxValue.securityAnswer1}
                        id="welcome_signup_securityAnswer1"
                        endAdornment={
                            <Tooltip title="Answer length is more then 3">
                                <IconButton style={{ width: "40px" }}>
                                    <QuestionMarkIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel variant="standard" htmlFor="welcome_signup_securityQuestion2"> Security Question</InputLabel>
                    <NativeSelect
                        id="welcome_signup_securityQuestion2"
                        value={inputBoxValue.securityQuestion2}
                        onChange={handleOnChangeInputBoxValue}
                        name='securityQuestion2'
                    >
                        {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                    </NativeSelect>
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_securityAnswer2"> Security Question Answer</InputLabel>
                    <Input
                        required
                        onChange={handleOnChangeInputBoxValue}
                        name="securityAnswer2"
                        value={inputBoxValue.securityAnswer2}
                        id="welcome_signup_securityAnswer21"
                        endAdornment={
                            <Tooltip title="Answer length is more then 3">
                                <IconButton style={{ width: "40px" }}>
                                    <QuestionMarkIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>

                <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                    <Button type='submit' disabled={buttonDisable}>{signupLoadingFlag ? <img src={freeLoadGif} alt="" style={{ width: "50px" }} /> : signupErrorFlag ? "Enter veiled data" : "Sign Up"} </Button>
                </Stack>
            </form>
            <Box><p>You Have Already An Account ? <Link to="/signin" className='welcome_signin_createOne'>Sign In</Link> </p></Box>

            {signupSuccessData === null || signupSuccessData === undefined ? "" :
                signupSuccessData.success ? <Box className='alertBoxSuccess'>
                    <Box className='alertBoxSuccess_successImg'>
                        <img src={successImg} alt="" />
                    </Box>
                    <Box className='alertBoxSuccess_message'>
                        <h2>User Registered Successfully!</h2>
                        <p>Your Username Is</p>
                        <h1>{signupSuccessData.user.username}</h1>
                    </Box>
                    <Box className='alertBoxSuccess_button'>
                        <Button onClick={() => navigate("/signin")}>Done</Button>
                    </Box>
                </Box> : alert(signupSuccessData.message)}

        </Typography>
    );
}

const forgotPasswordQuestionsList = [
    "What is your favorite movie?",
    "What is the first and last name of your first boyfriend or girlfriend?",
    "Which phone number do you remember most from your childhood?",
    "What was your favorite place to visit as a child?",
    "Who is your favorite actor, musician, or artist?",
    "What is the name of your favorite pet?",
    "In what city were you born?",
    "What high school did you attend?",
    "What is the name of your first school?",
    "What is your mother's maiden name?",
    "What street did you grow up on?",
    "What was the make of your first car?",
    "When is your anniversary?",
    "What is your favorite color?",
    "What is your father's middle name?",
    "What is the name of your first grade teacher?",
    "What was your high school mascot?",
    "Which is your favorite web browser?",
    "what is your favorite website?",
    "what is your favorite forum?",
    "what is your favorite online platform?",
    "what is your favorite social media website?"
]