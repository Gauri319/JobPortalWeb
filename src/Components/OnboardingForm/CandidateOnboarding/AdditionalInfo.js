import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import React from 'react';
import { TextField, Grid } from "@mui/material";
import { skillsList } from "../../../constants/index";
import Button1 from "../../common/Button/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import TextareaAutosize from '@mui/material/TextareaAutosize';

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
function AdditionalInfo({ candidateInfo, setCandidateInfo, value, setValue }) {
  // ===============================================================================================================================
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setCandidateInfo((p) => {
      return {
        ...p,
        skills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };
  // ===============================================================================================================================

  const handleDomainChange = (event) => {
    setCandidateInfo((p) => {
      return { ...p, domain: event.target.value };
    });
  };
  // ===============================================================================================================================
  return (
    <div>
      <Grid container rowSpacing={4} columnSpacing={3}>
        <Grid item xs={12}>  <h2>Additional information</h2></Grid>
        <Grid item xs={12} md={12}>
          <label>Summary</label>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="About Your"
            style={{ width: "100%" }}
            variant="outlined"
            onChange={(e) => {
              setCandidateInfo((p) => {
                return { ...p, Summery: e.target.value };
              });
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>Experience</label>
          <TextField
            value={candidateInfo.experience}
            onChange={(e) => {
              setCandidateInfo((p) => {
                return { ...p, experience: e.target.value };
              });
            }}
            size="small"
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Expected CTC</label>
          <TextField
            value={candidateInfo.salary}
            type="number"
            onChange={(e) => {
              setCandidateInfo((p) => {
                return { ...p, salary: e.target.value };
              });
            }}
            size="small"
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>linkedIn</label>
          <TextField
            value={candidateInfo.socialMedia.linkedIn}
            type="url"
            onChange={(e) => {
              setCandidateInfo((p) => {
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
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Github</label>
          <TextField
            value={candidateInfo.socialMedia.github}
            type="url"
            onChange={(e) => {
              setCandidateInfo((p) => {
                return {
                  ...p,
                  socialMedia: { ...p.socialMedia, github: e.target.value },
                };
              });
            }}
            size="small"
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <lable>
            Skills<span style={{ color: "red" }}>*</span>
          </lable>
          <FormControl required sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={candidateInfo.skills}
              onChange={handleSkillsChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {skillsList.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={candidateInfo.skills.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <lable>
            Interested Domains<span style={{ color: "red" }}>*</span>
          </lable>
          <FormControl fullWidth required sx={{ minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-required-label">
              Select
            </InputLabel>
            <Select
              sx={{ width: "85%" }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={candidateInfo.domain}
              label="Age *"
              onChange={handleDomainChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="FrontEnd Devloper">FrontEnd Devloper</MenuItem>
              <MenuItem value="BackEnd Devloper">BackEnd Devloper</MenuItem>
              <MenuItem value="FullStack Devloper">Full stack Devloper</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>

      </Grid>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
        <Button1 text="< Previous" handleClick={() => { value > 1 ? setValue(String(parseInt(value) - 1)) : setValue(value) }} />
        <Button1 text="Submit" type="submit" />
      </div>
    </div>
  )
}

export default AdditionalInfo