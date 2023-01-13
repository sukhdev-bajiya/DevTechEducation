import {
  FREE_LOADING,
  SIGNIN_LOADING,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  RESETPASSWORD_LOADING,
  RESETPASSWORD_SUCCESS,
  RESETUSERNAME_LOADING,
  RESETUSERNAME_SUCCESS,
  USER_PROFILE_UPDATE,
  ADD_USER_STATUS,
} from "./actionType";

const initState = {
  freeLoad: false,

  signupLoadingFlag: false,
  signupSuccessData: null,
  signupErrorFlag: false,

  signinLoadingFlag: false,
  signinSuccessData: JSON.parse(sessionStorage.getItem("user")) || null,
  signinErrorFlag: false,

  resetUsernameLoadingFlag: false,
  resetUsernameSuccessData: null,

  resetPasswordLoadingFlag: false,
  resetPasswordSuccessData: null,

  userProfileUpdate: { status: "null" },
  addUserStatus: null,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case FREE_LOADING:
      return {
        freeLoad: payload,
      };

    case SIGNUP_LOADING:
      return {
        signupLoadingFlag: true,
      };
    case SIGNUP_ERROR:
      return {
        signupLoadingFlag: false,
        signupErrorFlag: true,
      };
    case SIGNUP_SUCCESS:
      return {
        signupLoadingFlag: false,
        signupSuccessData: payload,
      };

    case SIGNIN_LOADING:
      return {
        signinLoadingFlag: true,
      };
    case SIGNIN_ERROR:
      return {
        signinLoadingFlag: false,
        signinErrorFlag: true,
      };
    case SIGNIN_SUCCESS:
      return {
        signinLoadingFlag: false,
        signinSuccessData: payload,
      };

    case RESETUSERNAME_LOADING:
      return {
        resetUsernameLoadingFlag: true,
      };

    case RESETUSERNAME_SUCCESS:
      return {
        resetUsernameLoadingFlag: false,
        resetUsernameSuccessData: payload,
      };

    case RESETPASSWORD_LOADING:
      return {
        resetPasswordLoadingFlag: true,
      };
    case RESETPASSWORD_SUCCESS:
      return {
        resetPasswordLoadingFlag: false,
        resetPasswordSuccessData: payload,
      };
    case USER_PROFILE_UPDATE:
      return {
        userProfileUpdate: payload,
      };
    case ADD_USER_STATUS:
      return {
        addUserStatus: payload,
      };
    default:
      return state;
  }
};
