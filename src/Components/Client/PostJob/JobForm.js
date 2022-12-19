import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
  InputLabel,
  FormHelperText,
  Checkbox,
  OutlinedInput,
  Box,
} from "@mui/material";
import uuid from 'uuidv4';
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { domainList, skillsList } from "../../../constants/";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function JobForm() {
  // title
  // skills=[]
  //domain = '
  //experience=''
  // budget=''
  // description=''
  // dueration=''
  // language=''uid
  //
  const [jobData, setJobData] = useState({
    companyname: "",

    description: "",
    size: "",
    city:"",
    type: "",
    experience: "",
    language: "",
    domain: "",
    state:"",
    active:"",
    qualification:"",
    skills: [],
  });
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData((p) => {
      return {
        ...p,
        skills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };
  const handleDomainChange = (event) => {
    setJobData((p) => {
      return { ...p, domain: event.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
    const uid = loggedInUser.UserId;
    const job_id = uuid();
    console.log(jobData);
    const docRef = await setDoc(doc(db, "jobs", job_id), {
      ...jobData,
      job_id,
      client_id: uid,
      // client_name: loggedInUser.displayName,
    });
    console.log("Document written with ID: ", docRef.id);
    setJobData(
      {companyname: "",
      description: "",
      size: "",
      city:"",
      type: "",
      experience: "",
      language: "",
      domain: "",
      state:"",
      active:"",
      qualification:"",
      skills: [],}
    )
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>

          <Grid container 
            maxWidth="90%"
            p={4}
            sx={{
              backgroundColor: "#FFFFFF",
              margin: "20px auto",
              fontSize: "15px",
              borderLeft:"0.5px dotted var(--grey)"
            }}
            columnSpacing={3}
          >
            <Grid item xs={12} md={12}>
              <h4>Job Position</h4>
              <FormControl
                width="100%"
                fullWidth
                variant="standard"
                required
                sx={{ minWidth: "100%" }}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Select
                </InputLabel>
                <Select
                  width="100%"
                  fullWidth
                  id="demo-simple-select-required"
                  value={jobData.domain}
                  label="Age *"
                  onChange={handleDomainChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {domainList.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sx={12} md={12}>
              <h4>Required Skills</h4>
              <FormControl
                width="100%"
                fullWidth
                variant="standard"
                required
                sx={{ minWidth: "100%" }}
              >
                <InputLabel id="demo-multiple-checkbox-label">
                  Select
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  width="100%"
                  value={jobData.skills}
                  onChange={handleSkillsChange}
                  // input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {skillsList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={jobData.skills.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <h4>Company Name</h4>
              <TextField
                required
                value={jobData.companyname}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      companyname: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                placeholder="Company Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>City</h4>
              <TextField
                required
                value={jobData.city}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      city: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                placeholder="Company city"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>State</h4>
              <TextField
                required
                value={jobData.state}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      state: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                placeholder="Company state"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>hiering Active</h4>
              <TextField
                required
                value={jobData.active}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      active: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                placeholder="Yes Or No"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <h4>Role and Responsibilities*</h4>
              <TextField
                required
                value={jobData.description}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      description: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <h4>Required Qualification</h4>
              <TextField
                required
                value={jobData.qualification}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      qualification: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Company Size*</h4>
              <TextField
                type="number"
                required
                value={jobData.size}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      size: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Job type</h4>
              <TextField
                required
                value={jobData.type}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      type: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                placeholder="fullTime/PartTime/Internship"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Experience</h4>
              <TextField
                required
                value={jobData.experience}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      experience: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Language</h4>
              <TextField
                required
                value={jobData.language}
                onChange={(e) => {
                  setJobData((p) => {
                    return {
                      ...p,
                      language: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="standard"
              />
            </Grid>


            <Grid item xs={12} textAlign="right">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
                sx={{ marginTop: "10px", width: "150px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
