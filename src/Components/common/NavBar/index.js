import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../../assets/Slogo.png";
import { textTransform } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WorkIcon from "@mui/icons-material/Work";


 

const pages = ["Home", "Clients login", "Candidates login", "Articles"];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [signin, setSignin] = React.useState("");
  const [signup, setSignup] = React.useState("");
  const handleSignUpChange = (event) => {
    setSignup(event.target.value);
    navigate(`/Signup/${event.target.value}`);
  };
  const handleSignInChange = (event) => {
    setSignin(event.target.value)
    navigate(`/SignIn/${event.target.value}`);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToClientSignIn = () => {
    navigate("/signIn/client");
  };
  const goToCandidateSignIn = () => {
    navigate("/signIn/candidate");
  };

  const handleNavBtnClick = (page) => {
   if(page==='Home'){
    navigate("/");
   }
  };
  return (

    <AppBar position="static" style={{ background: '#ffffff', "fontWeight": 900 }} >
      <Container
        variant="div"
        sx={{
          background: "white",
          display: "flex",
          width: "100%",
          color: "#000",
          justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        <Toolbar
          sx={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
          disableGutters
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              sx={{ width: "50px", height: "50px" }}
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
               <Button
                key="Home"
                onClick={() => handleNavBtnClick("Home")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
              >
                Home
              </Button>
              <Button
                key="Jobs"
                // onClick={() => handleNavBtnClick("Jobs")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
               
              >
                Jobs
              </Button>
              <Button
                key="Articles"
                // onClick={() => handleNavBtnClick("Articles")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
                
              >
                Articles
              </Button>
              <Button
                key="signup"
                // onClick={() => handleNavBtnClick("Articles")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
                
              >
            <FormControl fullWidth sx={{border:"none",outline:"none",width:"100px"}} variant="standard">
              <InputLabel id="demo-simple-select-label">SignUp</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={signup}
                onChange={handleSignUpChange}
              >
                <MenuItem value={"Candidate"}>Candidate</MenuItem>
                <MenuItem value={"Company"}>Company</MenuItem>
              </Select>
            </FormControl></Button>

            <Button
                key="login"
                // onClick={() => handleNavBtnClick("Articles")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
                
              >
            <FormControl fullWidth  sx={{border:"none",outline:"none",width:"100px"}} variant="standard">
              <InputLabel id="demo-simple-select-label">Login</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={signin}
                onChange={handleSignInChange}
              >
                <MenuItem value={"Candidate"}>Candidate</MenuItem>
                <MenuItem value={"Company"}>Company</MenuItem>
              </Select>
            </FormControl></Button>
            </Menu>
          </Box>
          <Box sx={{ width: "20%" }}>
            <img
              src={Logo}
              alt="logo"
              style={{ maxWidth: "100px", width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              width: { sm: "0%", md: "80%" },
              display: { xs: "none", md: "flex" },
              justifyContent: " space-between",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
          
             <Button
                key="Home"
                onClick={() => handleNavBtnClick("Home")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
              >
                Home
              </Button>
              <Button
                key="Jobs"
                // onClick={() => handleNavBtnClick("Jobs")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
               
              >
                Jobs
              </Button>
              <Button
                key="Articles"
                // onClick={() => handleNavBtnClick("Articles")}
                sx={{ my: 2,fontWeight: "520", color: "#000", display: "block" }}
                
              >
                Articles
              </Button>
            <FormControl fullWidth sx={{border:"none",outline:"none",width:"100px"}} variant="standard">
              <InputLabel id="demo-simple-select-label">SignUp</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={signup}
                onChange={handleSignUpChange}
              >
                <MenuItem value={"Candidate"}>Candidate</MenuItem>
                <MenuItem value={"Company"}>Company</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth  sx={{border:"none",outline:"none",width:"100px"}} variant="standard">
              <InputLabel id="demo-simple-select-label">Login</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={signin}
                onChange={handleSignInChange}
              >
                <MenuItem value={"Candidate"}>Candidate</MenuItem>
                <MenuItem value={"Company"}>Company</MenuItem>
              </Select>
            </FormControl>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;