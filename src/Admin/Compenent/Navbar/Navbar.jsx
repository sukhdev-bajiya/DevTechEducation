import React from "react";
import "./Navbar.css";
import logoday from "../../../assets/images/logoday.png";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Tooltip } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  React.useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("user"));
    if (data === undefined || data === null || data.user.role !== "admin") {
      navigate("/signin");
    }
  });

  const userLogout = () => {
    cookies.set("devtechusercookie", "", { path: "/" });
    sessionStorage.clear();
    localStorage.clear();
    window.open("/", "_self"); // navigate("/");
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const studentNotifications = "new";

  const mobileMenuId = "primary_search_account_menu_mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/admin/notifications");
        }}
      >
        <IconButton
          size="large"
          aria-label={`show ${studentNotifications} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={studentNotifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/admin/management");
        }}
      >
        <IconButton size="large" color="inherit">
          <AutoStoriesIcon />
        </IconButton>
        <p>Courses</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/admin/profile")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary_search_account_menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={userLogout}>
        <IconButton
          size="large"
          aria-label="user logout"
          aria-controls="primary_search_account_menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box style={{ position: "fixed", width: "100%", zIndex: "10" }}>
        <AppBar position="static">
          <Toolbar>
            <img
              src={logoday}
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              alt="DEV TECH EDUCATION"
              className="navbar_Logo"
            />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Teacher, Student and Courses Management">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    navigate("/admin/management");
                  }}
                >
                  <AutoStoriesIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  aria-label={`show ${studentNotifications} new notifications`}
                  color="inherit"
                  onClick={() => {
                    navigate("/admin/notifications");
                  }}
                >
                  <Badge badgeContent={studentNotifications} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => navigate("/admin/profile")}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={userLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      <Box style={{ height: "65px" }}></Box>
    </Box>
  );
}
