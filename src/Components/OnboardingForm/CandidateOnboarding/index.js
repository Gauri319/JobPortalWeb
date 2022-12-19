import React from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/NavBar";
import { Box } from "@mui/system";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from "@mui/material";
import Personalnfo from "./Personalnfo";
import EducationalInfo from "./EducationalInfo";
import AdditionalInfo from "./AdditionalInfo";
import Loding from "../../common/Loding/Loding";



function CandidateONboarding() {
  let navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  const [candidateInfo, setCandidateInfo] = React.useState({
    Firstname: "",
    Lastname: "",
    BirthDate: "",
    location: "",
    Country: "",
    Gender: "",
    email: loggedInUser.email,
    phone: "",
    Degree: "",
    Branch: "",
    College: "",
    Percentage: "",
    Summery: "",
    salary: "",
    skills: [],
    domain: [],
    socialMedia: {
      linkedIn: "",
      github: "",
    },
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
    console.log(candidateInfo);
    const finalInfo = {
      ...candidateInfo,
      userId: userId,
      step: 2,
      user_type: userData.type,
    }

    try {
      const docRef = await setDoc(doc(db, "usersData", userId), {
        ...finalInfo,
      });
      setLoding(false)
      navigate("/candidate/profile");
    } catch (e) {
      alert("Error accured Please!try again");
      setLoding(false)
      console.error(e);
    }
    setCandidateInfo({
      Firstname: "",
      Lastname: "",
      BirthDate: "",
      location: "",
      Country: "",
      Gender: "",
      email: loggedInUser.email,
      phone: "",
      Degree: "",
      Branch: "",
      College: "",
      Percentage: "",
      Summery: "",
      salary: "",
      skills: [],
      domain: [],
      socialMedia: {
        linkedIn: "",
        github: "",
      },
    });
  }
  return (
    <div>
      <Navbar />
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
                    <Tab label="Personal Info" value="1" />
                    <Tab label="Educational Info" value="2" />
                    <Tab label="Additional Info" value="3" />
                  </TabList>
                </Box>
                <Box maxWidth="md" sx={{ margin: "30px auto", boxShadow: 3, backgroundColor: "var(--darkwhite)" }}>
                  <TabPanel value="1">
                    <Personalnfo candidateInfo={candidateInfo} setCandidateInfo={setCandidateInfo} value={value} setValue={setValue} />
                  </TabPanel>
                  <TabPanel value="2">
                    <EducationalInfo candidateInfo={candidateInfo} setCandidateInfo={setCandidateInfo} value={value} setValue={setValue} />
                  </TabPanel>
                  <TabPanel value="3">
                    <AdditionalInfo candidateInfo={candidateInfo} setCandidateInfo={setCandidateInfo} value={value} setValue={setValue} />
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

export default CandidateONboarding;

