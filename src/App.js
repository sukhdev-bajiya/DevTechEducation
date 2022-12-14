import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Welcome/Pages/Home/Home";
import Navbar from "./Welcome/Compenent/Navbar/Navbar";
import Signup from "./Welcome/Pages/Signup/Signup";
import Signin from "./Welcome/Pages/Signin/Signin";
import Courses from "./Welcome/Pages/Courses/Courses";
import ReferAndEarn from "./Welcome/Pages/ReferAndEarn/ReferAndEarn";
import EventsAndContests from "./Welcome/Pages/EventsAndContests/EventsAndContests";

// Student
import StudentNavbar from "./Student/Compenent/Navbar/Navbar";
import StudentProfile from "./Student/Pages/Profile/Profile";
import StudentDashboard from "./Student/Pages/Dashboard/Dashboard";
import StudentManagement from "./Student/Pages/Management/Management";
import StudentNotifications from "./Student/Pages/Notifications/Notifications";

// Teacher
import TeacherNavbar from "./Teacher/Compenent/Navbar/Navbar";
import TeacherProfile from "./Teacher/Pages/Profile/Profile";
import TeacherDashboard from "./Teacher/Pages/Dashboard/Dashboard";
import TeacherManagement from "./Teacher/Pages/Management/Management";
import TeacherNotifications from "./Teacher/Pages/Notifications/Notifications";

// Admin
import AdminNavbar from "./Admin/Compenent/Navbar/Navbar";
import AdminProfile from "./Admin/Pages/Profile/Profile";
import AdminDashboard from "./Admin/Pages/Dashboard/Dashboard";
import AdminManagement from "./Admin/Pages/Management/Management";
import AdminNotifications from "./Admin/Pages/Notifications/Notifications";
import Error404 from "./ErrorPage/Error404";

function App() {
  console.log(`Welcome to - 
    
    ||||||||   ||||||  ||       ||  ||||||||||  ||||||   |||||  ||    ||  
    ||     ||  ||       ||     ||       ||      ||      ||      ||    ||  
    ||     ||  ||||||    ||   ||        ||      ||||||  ||      ||||||||  
    ||     ||  ||         || ||         ||      ||      ||      ||    ||  
    ||||||||   ||||||      |||          ||      ||||||   |||||  ||    || `);

  //   console.log(`Welcome to -

  // ||||||||   ||||||  ||       ||  ||||||||||  ||||||   |||||  ||    ||
  // ||     ||  ||       ||     ||       ||      ||      ||      ||    ||
  // ||     ||  ||||||    ||   ||        ||      ||||||  ||      ||||||||
  // ||     ||  ||         || ||         ||      ||      ||      ||    ||
  // ||||||||   ||||||      |||          ||      ||||||   |||||  ||    || `);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar /> <Home />
          </>
        }
      />
      <Route
        path="/courses"
        element={
          <>
            <Navbar /> <Courses />
          </>
        }
      />
      <Route
        path="/referandearn"
        element={
          <>
            <Navbar /> <ReferAndEarn />
          </>
        }
      />
      <Route
        path="/eventsandcontests"
        element={
          <>
            <Navbar /> <EventsAndContests />
          </>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Student */}

      <Route
        path="/student/dashboard"
        element={
          <>
            <StudentNavbar />
            <StudentDashboard />
          </>
        }
      />
      <Route
        path="/student/profile"
        element={
          <>
            <StudentNavbar />
            <StudentProfile />
          </>
        }
      />
      <Route
        path="/student/management"
        element={
          <>
            <StudentNavbar />
            <StudentManagement />
          </>
        }
      />
      <Route
        path="/student/notifications"
        element={
          <>
            <StudentNavbar />
            <StudentNotifications />
          </>
        }
      />

      {/* Teacher */}

      <Route
        path="/teacher/dashboard"
        element={
          <>
            <TeacherNavbar />
            <TeacherDashboard />
          </>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <>
            <TeacherNavbar />
            <TeacherProfile />
          </>
        }
      />
      <Route
        path="/teacher/management"
        element={
          <>
            <TeacherNavbar />
            <TeacherManagement />
          </>
        }
      />
      <Route
        path="/teacher/notifications"
        element={
          <>
            <TeacherNavbar />
            <TeacherNotifications />
          </>
        }
      />

      {/* Admin */}

      <Route
        path="/admin/dashboard"
        element={
          <>
            <AdminNavbar />
            <AdminDashboard />
          </>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <>
            <AdminNavbar />
            <AdminProfile />
          </>
        }
      />
      <Route
        path="/admin/management"
        element={
          <>
            <AdminNavbar />
            <AdminManagement />
          </>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <>
            <AdminNavbar />
            <AdminNotifications />
          </>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
