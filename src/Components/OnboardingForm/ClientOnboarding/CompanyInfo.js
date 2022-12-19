
import React from 'react';
import { TextField, Grid } from "@mui/material";
import Button1 from "../../common/Button/Button";


function CompanyInfo({ clientInfo, setClientInfo, value, setValue }) {
    function handlenext() {
        if (clientInfo.companyName !== "" && clientInfo.website !== "" &&clientInfo.location !== "" && clientInfo.HRname !== ""&&clientInfo.email !== ""&& clientInfo.Contactphone!== "") {
            if (value < 3) {
                setValue(String(parseInt(value) + 1))
            }
            else (setValue(value))
        }
        // else{
        //     alert("Please! Fill the all required Fields")
        // }
    }
    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12}>  <h2>Company information</h2></Grid>
                 
            <Grid item md={6} xs={12}>
              <label>Company Name*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Company Name"
                variant="standard"
                size="small"
                required
                type="text"
                value={clientInfo.companyName}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, companyName: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>Comapny Website*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="url"
                variant="standard"
                size="small"
                type="url"
                required
                value={clientInfo.website}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, website: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>Company Location*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Type your company address"
                variant="standard"
                size="small"
                type="text"
                required
                value={clientInfo.location}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, location: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>Country</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Type your company address"
                variant="standard"
                size="small"
                required
                value={clientInfo.Country}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, Country: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>HR Name*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Write your name"
                variant="standard"
                size="small"
                required
                value={clientInfo.HRname}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, HRname: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>Email*</label>
              <TextField
                fullWidth
                disabled
                id="outlined-basic"
                placeholder="Contact@gmail.com"
                variant="standard"
                size="small"
                type="email"
                required
                value={clientInfo.email}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, email: e.target.value };
                  });
                }}
              />
            </Grid>
            
            <Grid item md={6} xs={12}>
              <label>Phone Number*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                type="number"
                variant="standard"
                size="small"
                required
                value={clientInfo.Contactphone}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, Contactphone: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <label>Linkedin</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="url"
                variant="standard"
                size="small"
                // value={clientInfo.socialMedia.linkedIn}
                onChange={(e) => {
                  setClientInfo((p) => {
                    console.log(p.socialMedia);
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        linkedIn: e.target.value,
                      },
                    };
                  });
                }}
              />
            </Grid>
            </Grid>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "30px" }}>
                <Button1 text="Next >" handleClick={() => {handlenext() }} />
            </div>
        </div>
    )    
}

export default CompanyInfo