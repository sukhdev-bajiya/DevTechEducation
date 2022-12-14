import * as React from "react";
import logoday from "../../../assets/images/logoday.png";
import "./Navbar.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box style={{ position: "fixed", width: "100%", zIndex: "10" }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  src={logoday}
                  onClick={() => navigate("/")}
                  alt="DEV TECH EDUCATION"
                  className="navbar_Logo"
                />
              </Box>

              {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/courses");
                      }}
                    >
                      COURSES
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/referandearn");
                      }}
                    >
                      REFER & EARN
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/eventsandcontests");
                      }}
                    >
                      EVENTS & CONTESTS
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box> */}

              <Box
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  src={logoday}
                  onClick={() => navigate("/")}
                  alt="DEV TECH EDUCATION"
                  className="navbar_Logo"
                />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    return handleCloseNavMenu(), navigate("/courses");
                  }}
                >
                  {" "}
                  COURSES{" "}
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    return handleCloseNavMenu(), navigate("/referandearn");
                  }}
                >
                  {" "}
                  REFER & EARN{" "}
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    return handleCloseNavMenu(), navigate("/eventsandcontests");
                  }}
                >
                  {" "}
                  EVENTS & CONTESTS{" "}
                </Button> */}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Sign Up">
                  <Link to={"/signup"} style={{ textDecoration: "none" }}>
                    <IconButton>
                      <PersonAddAlt1Icon style={{ color: "white" }} />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Sign In">
                  <Link to={"/signin"} style={{ textDecoration: "none" }}>
                    <IconButton>
                      <ExitToAppIcon style={{ color: "white" }} />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box style={{ height: "65px" }}></Box>
    </Box>
  );
};
export default Navbar;
