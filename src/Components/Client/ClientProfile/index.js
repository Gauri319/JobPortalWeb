import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useNavigate } from 'react-router-dom'
import { TextField, Grid, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ClientProfile() {
  const [clientData, setClientData] = useState(null);
  const [editState, setEditState] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.uid;
  async function getProfile() {
    try {
      const docRef = doc(db, "usersData", userId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        console.log("Document data:", docData.data());
        setClientData({ ...docData.data() });
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

  const saveProfile = async (e) => {
    if (editState) {
      e.preventDefault()
      try {
        await setDoc(doc(db, "usersData", userId), {
          ...clientData,
        });
        alert('Profile Updated')
      } catch (e) {
        alert("Error occored");
        console.error("Error adding document: ", e);
      }
    }
    setEditState(!editState);
  };

  return (
    <div>
      {clientData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Grid container justifyContent="space-between" sx={{ marginBottom: "50px", background: "#fff" }}>
            <Grid item xs={6}>
              <Avatar alt="Remy Sharp" src={user.photoURL} sx={{ width: "150px", height: "150px"}} />
            </Grid>
            <Grid container xs={6} alignItems="flex-end" justifyContent="flex-end" columnSpacing={2} rowSpacing={2} >
              <Grid item xs={12} sm={4} md={4} >
                <Button variant="contained" color="secondary" onClick={saveProfile}>
                  {editState ? <>Save <AddCircleOutlineIcon /></> : <>Edit <EditIcon /></>}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button variant="contained" color="secondary" onClick={logoutProfile}>Logout</Button>
              </Grid>

            </Grid>

          </Grid>
          <form>
            <div
              style={{
                
                margin: "auto",
                background: "#fff",
              }}
            >
              <Grid container columnSpacing={15} rowSpacing={7}>
                <Grid item xs={12} md={6}>
                  <label>Name*</label>
                  <TextField
                    disabled={!editState}
                    required
                    value={clientData.name}
                    onChange={(e) => {
                      setClientData((p) => {
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
                  <label>email*</label>
                  <TextField
                    disabled={true}
                    required
                    type="email"
                    value={clientData.email}
                    onChange={(e) => {
                      setClientData((p) => {
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
                  <label>Phone no.*</label>
                  <TextField
                    disabled={!editState}
                    required
                    type="number"
                    inputProps={{ maxLength: 10 }}
                    value={clientData.phone}
                    onChange={(e) => {
                      setClientData((p) => {
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
                  <label>Location*</label>
                  <TextField
                    disabled={!editState}
                    required
                    value={clientData.location}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, location: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                {/* website */}

                <Grid item xs={12} md={6}>
                  <label>Website</label>
                  <TextField
                    disabled={!editState}
                    value={clientData.website}
                    onChange={(e) => {
                      setClientData((p) => {
                        return {
                          ...p,
                          website: e.target.value,

                        };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                {/* //company */}
                <Grid item xs={12} md={6}>
                  <label>Company</label>
                  <TextField
                    disabled={!editState}
                    value={clientData.company}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, company: e.target.value };
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
          </form>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default ClientProfile;
