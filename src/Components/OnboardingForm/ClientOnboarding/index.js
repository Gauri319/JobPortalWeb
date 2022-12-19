import React from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/NavBar";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from "@mui/material";
import Loding from "../../common/Loding/Loding";
import { Box } from "@mui/system";
import CompanyInfo from "./CompanyInfo";
import AdditionalInfo from "./AdditionalInfo";

function ClientOnboarding() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  const [clientInfo, setClientInfo] = React.useState({
    HRname: "",
    email: loggedInUser.email,
    Contactphone: "",
    companyName: "",
    location: "",
    Country: "",
    website: "",
    aboutComapny:"",
    Type:"",
    Size:"",
    Headquaters:"",
    Branches:"",
    socialMedia: { linkedIn: "" },
  });
  const [value, setValue] = React.useState('1');
  const [loding, setLoding] = React.useState(false);

  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitInfo = async (e) => {
    setLoding(true);
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    let userId = userData.UserId;
    e.preventDefault();
    console.log(clientInfo);
    const finaInfo = {
      ...clientInfo,
      userId: userId,
      step: 2,
      user_type:userData.type 
    };
    try {
       await setDoc(doc(db, "usersData", userId), {
        ...finaInfo,
      });
      console.log("value saved");
      setLoding(false)
      navigate("/client/profile");
    } catch (e) {
      alert("Somthing is wrong please!try again");
      setLoding(false);
      console.error("Error adding document: ", e);
    }

    setClientInfo({
      HRname: "",
      email: loggedInUser.email,
      Contactphone: "",
      companyName: "",
      location: "",
      Country: "",
      website: "",
      aboutComapny:"",
      Type:"",
      Size:"",
      Headquaters:"",
      Branches:"",
      socialMedia: { linkedIn: "" },
    });
  };
  return (
    <div className="main-container">
      <Navbar/>
      {
        loding?
        <Loding/>:
        <div>
        <form onSubmit={(e) => submitInfo(e)}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <ThemeProvider theme={theme}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: "15px auto" }}>
                  <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="ComaPany Info" value="1" />
                    <Tab label="Additional Info" value="2" />
                  </TabList>
                </Box>
                <Box maxWidth="md" sx={{ margin: "30px auto", boxShadow: 3, backgroundColor: "var(--darkwhite)" }}>
                  <TabPanel value="1">
                   <CompanyInfo clientInfo={clientInfo} setClientInfo={setClientInfo} value={value} setValue={setValue} />
                  </TabPanel>
                  <TabPanel value="2">
                    <AdditionalInfo clientInfo={clientInfo} setClientInfo={setClientInfo} value={value} setValue={setValue}/>
                  </TabPanel>
                </Box>
              </TabContext>
            </ThemeProvider>
          </Box>
        </form>
      </div>
      }
    </div>
  );
}

export default ClientOnboarding;

