import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { domainList, skillsList } from "../../../constants";
import {
  Grid,
  FormControl,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  Select,
} from "@mui/material";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useEffect } from "react";
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


function JobSearch({ filter, setFilter,setFiltered }) {
  const fetchAllJobs = async () => {
    const q = query(collection(db, "jobs"));
    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(filter.selectedDomain!=null){
         if(doc.data().domain===filter.selectedDomain){
         
          jobs.push(doc.data());
         }
      }
    });
    setFiltered(jobs);
  };
  useEffect(() => {
    fetchAllJobs();
  }, [filter.selectedDomain]);
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter((p) => {
      return {
        ...p,
        selectedSkills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} columnSpacing={4} rowSpacing={4}>
          <Autocomplete
            
            value={filter.selectedDomain}
            onChange={(event, newValue) => {
              setFilter((p) => {
                return { ...p, selectedDomain: newValue };
              });
            }}
            inputValue={filter.selectedDomain}
            onInputChange={(event, newInputValue) => {
              setFilter((p) => {
                return { ...p, selectedDomain: newInputValue };
              });
            }}
            id="controllable-states-demo"
            options={domainList}
            renderInput={(params) => (
              <TextField {...params} placeholder="Domain" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: "100%" }}>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filter.selectedSkills}
              onChange={handleSkillsChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(",")}
              MenuProps={MenuProps}
            >
              {skillsList.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={filter.selectedSkills.indexOf(name) > -1}
                  />
                  <ListItemText primary={name}  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobSearch;
