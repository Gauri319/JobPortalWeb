import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { TextField, Grid,Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CandidateProfile() {
  const [candidateData, setCandidateData] = useState(null);
  const [editState, setEditState] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.uid;
  async function getProfile() {
    try {
      const docRef = doc(db, "usersData", userId);
      const docData = await getDoc(docRef);
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
      {candidateData ? (
        <div>
          <Grid container  justifyContent="space-around" sx={{marginBottom:"30px"}}>
            <Grid item xs={6} >
                 <Avatar alt="Remy Sharp" src={user.photoURL} sx={{width:"150px",height:"150px"}} />
            </Grid>
            <Grid container xs={6} alignItems="flex-end" justifyContent="flex-end" columnSpacing={12} rowSpacing={4} >
              <Grid item xs={12} sm={4} md={4} >
                <Button  variant="contained" color="secondary" onClick={saveProfile}>
                  {editState ? <>Save <AddCircleOutlineIcon/></> : <>Edit <EditIcon/></>}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button  variant="contained" color="secondary" onClick={logoutProfile}>Logout</Button>
              </Grid>

            </Grid>

          </Grid>
          <Grid container columnSpacing={12} rowSpacing={4}>
            <Grid item xs={12} md={6}>
              <label>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled={!editState}
                required
                value={candidateData.name}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, name: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                email<span style={{ color: "red" }}>*</span>
              </label>
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
              <label>
                Phone no.<span style={{ color: "red" }}>*</span>
              </label>
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
              <label>Education</label>
              <TextField
                disabled={!editState}
                value={candidateData.education}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, education: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Experience</label>
              <TextField
                disabled={!editState}
                value={candidateData.experience}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, experience: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>linkedIn</label>
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
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Twitter</label>
              <TextField
                disabled={!editState}
                value={candidateData.socialMedia?.twitter}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        twitter: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Github</label>
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
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Instagram</label>
              <TextField
                disabled={!editState}
                value={candidateData.socialMedia?.instagram}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        instagram: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="standard-basic"
                variant="standard"
              />
            </Grid>

            
          </Grid>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default CandidateProfile;
