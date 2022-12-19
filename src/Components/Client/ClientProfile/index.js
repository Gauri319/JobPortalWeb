import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useNavigate } from 'react-router-dom'
import { TextField, Grid, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Loding from "../../common/Loding/Loding";
import Navbar from "../../common/NavBar";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Logo from '../../../assets/log.jpg';
import ClientHOC from "../../HOC/ClientHOC";


function ClientProfile() {
  const [clientData, setClientData] = useState(null);
  const [editState, setEditState] = useState(false);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  let userId = user.UserId;
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
      <Navbar />
      <ClientHOC/>
      {clientData ? (
        <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            margin:"30px auto"
          }}
        >
          <Grid maxWidth="md" container justifyContent="space-between" sx={{ marginBottom: "50px", background: "#fff" }}>
            <Grid item xs={6}>
              <Avatar alt="Remy Sharp" src={Logo}  sx={{ width: "150px", height: "150px" }} />
            </Grid>
            <Grid maxWidth="md" container xs={6} alignItems="flex-end" justifyContent="flex-end" columnSpacing={2} rowSpacing={2} >
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
              <Grid maxWidth="md" container columnSpacing={6} rowSpacing={1}>
                
                <Grid item xs={12}>
                  <h3>Company Name</h3>
                  <TextField
                    disabled={!editState}
                    required
                    value={clientData.companyName}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, companyName: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                    sx={{color:"yellow"}}
                  />
                </Grid>
                <Grid item xs={12} >
                <h3>About Company</h3>
                <TextareaAutosize
                       fullWidth
                       disabled={!editState}
                        aria-label="minimum height"
                        minRows={4}
                        value={clientData.aboutComapny}
                        style={{width:"100%",borderWidth:"0px 0px 1px 0px",outline:"none"}}
                        onChange={(e) => {
                          setClientData((p) => {
                                return { ...p, aboutComapny: e.target.value };
                            });
                        }}
                    />
                
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Company Email</h4>
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
                <h4>Contact Number</h4>
                  <TextField
                    disabled={!editState}
                    required
                    type="number"
                    inputProps={{ maxLength: 10 }}
                    value={clientData.Contactphone}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, Contactphone: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                <h4>Company location</h4>
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
                 <h4>Company website</h4>
                  <TextField
                      disabled={!editState}
                    sx={{border:"none",outline:"none"}}
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
                  <h4>Country</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.Country}
                    onChange={(e) => {
                      setClientData((p) => {
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
                  <h4>Company HR Name</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.HRname}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, HRname: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                 <h4>Company Size</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.Size}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, Size: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <h4>Hedquaters</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.Headquaters}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, Headquaters: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Company Branches</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.Branches}
                    onChange={(e) => {
                      setClientData((p) => {
                        return { ...p, Branches: e.target.value };
                      });
                    }}
                    size="small"
                    fullWidth
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <h4>Linkedin</h4>
                  <TextField
                    disabled={!editState}
                    value={clientData.socialMedia.linkedIn}
                    onChange={(e) => {
                      setClientData((p) => {
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
              </Grid>
            </div>
          </form>
        </div>
        </>
      ) : (
        <div><Loding /></div>
      )}
    </div>
  );
}

export default ClientProfile;
