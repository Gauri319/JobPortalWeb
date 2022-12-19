import { Button, Grid } from "@mui/material";
import "./CandidateJobs.css";
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import React,{useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function JobCard({ job, setOpenModal, setModalData, applyOnJob }) {
  const[hrname,sethrName]=useState('');
  const[country,setCountry]=useState('');

  const openDescription = () => {
    setModalData(job);
    setOpenModal(true);
  };

  async function getProfile() {
    try {
      const docRef = doc(db, "usersData", job.client_id);
      const docData = await getDoc(docRef);
    
      if (docData.exists()) {
        sethrName(docData.data().HRname);
        setCountry(docData.data().Country)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  getProfile();
  return (
    <div className="jobcard">
      <Grid container onClick={openDescription} columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12}><h1>{job.domain}</h1><span>{job.companyname} .</span><span>{job.city}.</span><span>{job.state}</span> <span> {country}</span></Grid>
        <Grid item xs={12} sx={{ overflow: "auto" }}></Grid>
        <Grid item xs={12}><span><WorkIcon/></span>{job.type}</Grid>
        <Grid item xs={12}><span><ApartmentIcon/></span>{job.size}+ Employees</Grid>
        <Grid item xs={12}><span><AccountCircleIcon/></span>{hrname} Recruting for this job</Grid>
        <Grid item xs={12}><span><TaskAltIcon/></span>Actively Recruting</Grid>
        <Grid item xs={12}><span><SchoolIcon/></span>{job.qualification}</Grid>
        <Grid item xs={12}><span style={{fontWeight:"600"}}>Language:</span>{job.language}</Grid>
        <Grid item xs={12}><span style={{fontWeight:"600"}}>Experience:</span>{job.experience}+</Grid>
        <Grid item xs={12} sm={12}  sx={{ overflow: "auto" }}>
          <Grid container ><span style={{fontWeight:"600"}}>Skills:</span>
            {job.skills?.map((skill) => {
              return <Grid textAlign="center" sx={{ margin: "5px", padding: "5px" }}>{skill}</Grid>;
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}><span style={{fontWeight:"600"}}>Role and Responsiblities:</span>{job.description}+</Grid>
        <Grid item xs={12} textAlign="right"><Button variant="contained" color="secondary">Easy Apply</Button></Grid>
      </Grid>
    </div>
  );
}

export default JobCard;
// {
//   budget: "4";
//   description: "job";
//   domain: "Web Development";
//   duration: "9";
//   experience: "1";
//   language: "english";
//   skills: ["React"];
//   title: "frontend";
// }
