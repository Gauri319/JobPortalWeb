import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { TextField, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Loding from "../../common/Loding/Loding";
import Navbar from "../../common/NavBar";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import BLogo from '../../../assets/boyLogo.png'
import GLogo from '../../../assets/GirlLogo.png'
import CandidateHOC from "../../HOC/CandidateHOC";
function CandidateProfile() {
  const [candidateData, setCandidateData] = useState(null);
  const [editState, setEditState] = useState(false);
  console.log("user>>>>");
  let user = JSON.parse(localStorage.getItem("userInfo"));
  let userId = user.UserId;
  console.log("user>>>>", user);
  async function getProfile() {
    try {
      const docRef = doc(db, "usersData", userId);
      const docData = await getDoc(docRef);
      console.log("dat>>>",docData.data())
      if (docData.exists()) {
        setCandidateData({ ...docData.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  const saveProfile = async (e) => {
    if (editState) {
      e.preventDefault();
      try {
        await setDoc(doc(db, "usersData", userId), {
          ...candidateData,
        });
        alert("Profile Updated");
      } catch (e) {
        alert("Error occored");
        console.error("Error adding document: ", e);
      }
    }
    setEditState(!editState);
  };
  const navigate = useNavigate();
  const reRoute = () => {
    navigate("/");
  };
  const logoutProfile = () => {
    alert("Are you want to Logout?");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("real key");

    reRoute();
  };
  return (
    <div>
      <Navbar />
      <CandidateHOC/>
      {candidateData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            margin: "30px auto"
          }}
        >
          <Grid container maxWidth="md" justifyContent="space-around" sx={{ marginBottom: "30px" }}>
            <Grid item xs={6} >
              <Avatar alt="Remy Sharp" src={candidateData.Gender=="Male"?BLogo:GLogo} sx={{ width: "150px", height: "150px" }} />
            </Grid>
            <Grid container maxWidth="md" xs={6} alignItems="flex-end" justifyContent="flex-end" columnSpacing={12} rowSpacing={4} >
              <Grid item xs={12} sm={4} md={4} >
                {/* <Button1 text={editState ? "Save" : "Edit" }icon={editState ? <AddCircleOutlineIcon /> :  <EditIcon />} handleClick={saveProfile}/> */}
                <Button variant="contained" color="secondary" onClick={saveProfile}>
                  {editState ? <>Save <AddCircleOutlineIcon /></> : <>Edit <EditIcon /></>}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button variant="contained" color="secondary" onClick={logoutProfile}>Logout</Button>
              </Grid>

            </Grid>

          </Grid>
          <Grid container maxWidth="md" columnSpacing={4} rowSpacing={2}>
            <Grid item xs={12} md={6}>
              <h4>First Name</h4>
              <TextField
                disabled={!editState}
                required
                value={candidateData.Firstname}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Firstname: e.target.value };
                  });
                }}
                size="small"
                fullwidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Last Name</h4>
              <TextField
                disabled={!editState}
                required
                value={candidateData.Lastname}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Lastname: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Profile Title</h4>
              <TextField
                disabled={!editState}
                required
                value={candidateData.domain}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, domain: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} >
              <h4>About </h4>
              <TextareaAutosize
                fullWidth
                aria-label="minimum height"
                disabled={!editState}
                minRows={4}
                value={candidateData.Summery}
                style={{ width: "100%", borderWidth: "0px 0px 1px 0px", outline: "none" }}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Summery: e.target.value };
                  });
                }}
              />

            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Email</h4>
              <TextField
                disabled={true}
                required
                type="email"
                value={candidateData.email}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, email: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <h4>Mobile No.</h4>
              <TextField
                disabled={!editState}
                required
                type="number"
                inputProps={{ maxLength: 10 }}
                value={candidateData.phone}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, phone: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Address</h4>
              <TextField
                disabled={!editState}
                required
                type="text"
                inputProps={{ maxLength: 10 }}
                value={candidateData.location}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, location: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Country</h4>
              <TextField
                disabled={!editState}
                required
                type="text"
                inputProps={{ maxLength: 10 }}
                value={candidateData.Country}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Country: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Birth Date</h4>
              <TextField
                disabled={!editState}
                required
                type="date"
                inputProps={{ maxLength: 10 }}
                value={candidateData.BirthDate}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, BirthDate: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Gender</h4>
              <TextField
                disabled={!editState}
                required
                type="text"
                inputProps={{ maxLength: 10 }}
                value={candidateData.Gender}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Gender: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12}>
              <h3>*****Education Section****</h3>
            </Grid>

            <Grid item xs={12} md={6}>
              <h4>Degree</h4>
              <TextField
                disabled={!editState}
                value={candidateData.Degree}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Degree: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Branch</h4>
              <TextField
                disabled={!editState}
                value={candidateData.Branch}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Branch: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <h4>College Name</h4>
              <TextField
                disabled={!editState}
                value={candidateData.College}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, College: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Percentage</h4>
              <TextField
                disabled={!editState}
                value={candidateData.Percentage}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, Percentage: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <h3>*****Professional Section****</h3>
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Skills</h4>
              <TextField
                disabled={!editState}
                value={candidateData.skills}
                onChange={(e) => {
                  setCandidateData((p) => {
                     return {
                      ...p,
                      skills: typeof e.target.value === "string" ?e.target.value.split(",") :e.target.value,
                    }
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <h4>Expected Salary</h4>
              <TextField
                disabled={!editState}
                value={candidateData.salary}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, salary: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <h4>linkedIn</h4>
              <TextField
                disabled={!editState}
                value={candidateData.socialMedia?.linkedIn}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        linkedIn: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullwidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <h4>Github</h4>
              <TextField
                disabled={!editState}
                value={candidateData.socialMedia?.github}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return {
                      ...p,
                      socialMedia: { ...p.socialMedia, github: e.target.value },
                    };
                  });
                }}
                size="small"
                fullwidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div><Loding /></div>
      )}
    </div>
  );
}

export default CandidateProfile;
