import {
  FREE_LOADING,
  SIGNIN_LOADING,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  RESETPASSWORD_LOADING,
  RESETPASSWORD_ERROR,
  RESETPASSWORD_SUCCESS,
  RESETUSERNAME_LOADING,
  RESETUSERNAME_ERROR,
  RESETUSERNAME_SUCCESS,
  USER_PROFILE_UPDATE,
  ADD_USER_STATUS,
} from "./actionType";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const freeLoading = (payload) => ({
  type: FREE_LOADING,
  payload,
});

//
//
// Signup Functions
//
//

export const signupLoading = (payload) => ({
  type: SIGNUP_LOADING,
  payload,
});
export const signupError = (payload) => ({
  type: SIGNUP_ERROR,
  payload,
});
export const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const userSignUpFun = (data) => (dispatch) => {
  dispatch(signupLoading());
  fetch(`https://devtecheducation.onrender.com/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      return (
        dispatch(signupSuccess(res)),
        setTimeout(() => {
          dispatch(signupSuccess(null));
        }, 7000)
      );
    })
    .catch(() => dispatch(signupError()));
};

//
//
// Signin Functions
//
//

export const signinLoading = (payload) => ({
  type: SIGNIN_LOADING,
  payload,
});
export const signinError = (payload) => ({
  type: SIGNIN_ERROR,
  payload,
});
export const signinSuccess = (payload) => ({
  type: SIGNIN_SUCCESS,
  payload,
});

export const userSignInFun = (data) => (dispatch) => {
  dispatch(signinLoading());
  fetch(`https://devtecheducation.onrender.com/auth/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.userDeactive) {
        alert("User is not active, please contact your administrator");
        return dispatch(signinError(res));
      } else {
        return (
          cookies.set("devtechusercookie", res.token, { path: "/" }),
          dispatch(signinSuccess(res)),
          dispatch(getallstudentuserlistFun())
        );
      }
    })
    .catch(() => dispatch(signinError()));
};

//
//
// User already logged in
//
//

export const gotoDashboard = () => (dispatch) => {
  if (
    cookies.get("devtechusercookie") &&
    cookies.get("devtechusercookie") !== ""
  ) {
    fetch(`https://devtecheducation.onrender.com/auth/goto/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("devtechusercookie"),
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(signinSuccess(res)))
      .catch(() => dispatch(signinError()));
  }
};

//
//
// User profile update
//
//

export const userprofileupdating = (payload) => ({
  type: USER_PROFILE_UPDATE,
  payload,
});

export const updateUserProfileFun = (data) => (dispatch) => {
  dispatch(userprofileupdating({ status: "loading" }));
  fetch(`https://devtecheducation.onrender.com/auth/update/profile`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => dispatch(userprofileupdating(res)))
    .catch(() => dispatch(userprofileupdating({ status: "error" })));
};

//
//
// Reset Password Functions
//
//

export const resetPasswordLoading = (payload) => ({
  type: RESETPASSWORD_LOADING,
  payload,
});
export const resetPasswordError = (payload) => ({
  type: RESETPASSWORD_ERROR,
  payload,
});
export const resetPasswordSuccess = (payload) => ({
  type: RESETPASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFun = (data) => (dispatch) => {
  dispatch(resetPasswordLoading());
  fetch(`https://devtecheducation.onrender.com/auth/reset/password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetPasswordSuccess(res)))
    .catch(() => dispatch(resetPasswordError()));
};

export const resetAndUpdatePasswordFun = (data) => (dispatch) => {
  dispatch(resetPasswordLoading());
  fetch(`https://devtecheducation.onrender.com/auth/update/password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetPasswordSuccess(res)))
    .catch(() => dispatch(resetPasswordError()));
};

//
//
// Reset Username Functions
//
//

export const resetUsernameLoading = (payload) => ({
  type: RESETUSERNAME_LOADING,
  payload,
});
export const resetUsernameError = (payload) => ({
  type: RESETUSERNAME_ERROR,
  payload,
});
export const resetUsernameSuccess = (payload) => ({
  type: RESETUSERNAME_SUCCESS,
  payload,
});

export const resetUsernameFun = (data) => (dispatch) => {
  dispatch(resetUsernameLoading());
  fetch(`https://devtecheducation.onrender.com/auth/get/username`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetUsernameSuccess(res)))
    .catch(() => dispatch(resetUsernameError()));
};

//
//
//
//
//

export const getallstudentuserlistFun = () => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/user/getalluserlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        if (res.teacher) localStorage.setItem("c_t_user", res.teacher);
        if (res.student) localStorage.setItem("c_s_user", res.student);
        if (res.course) localStorage.setItem("c_c_course", res.course);
        if (res.lecture) localStorage.setItem("c_l_course", res.lecture);
        if (res.subject) localStorage.setItem("c_s_course", res.subject);
      }
    });
};

//
//
//
//
//

export const addnewUser = (payload) => ({
  type: ADD_USER_STATUS,
  payload,
});

export const addnewUserFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/user/add/newuser`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 5000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const deActiveUserFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/user/deactive`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 5000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const editUserFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/user/edit`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};

export const addNewCourseFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/add/course`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const editCourseFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/edit/course`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const deleteCourseFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/delete/course`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};

export const addNewSubjectFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/add/subject`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const editSubjectFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/edit/subject`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const deleteSubjectFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/delete/subject`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};

export const addNewLecturesFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/add/lectures`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const editLecturesFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/edit/lectures`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
export const deleteLecturesFun = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/delete/lectures`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        dispatch(getallstudentuserlistFun());
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};

export const buyaCourse = (data) => (dispatch) => {
  fetch(`https://devtecheducation.onrender.com/learn/buy/course`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("devtechusercookie"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "true") {
        localStorage.setItem("user", res.data);
      }
      dispatch(addnewUser(res));

      setTimeout(() => {
        dispatch(addnewUser(null));
      }, 3000);
    })
    .catch((err) => dispatch(addnewUser(err)));
};
