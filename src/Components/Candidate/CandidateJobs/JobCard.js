import { Button, Grid } from "@mui/material";
import React from "react";
import "./CandidateJobs.css";
function JobCard({ job, setOpenModal, setModalData, applyOnJob }) {
  const openDescription = () => {
    setModalData(job);
    setOpenModal(true);
  };

  return (
    <div className="jobcard">
      <Grid container onClick={openDescription} columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}><h2>{job.title}</h2></Grid>
        <Grid item xs={6} sx={{ overflow: "auto" }}><h3>Description:</h3>{job.description}</Grid>
        <Grid item xs={6}><h3>Duration:</h3>{job.duration}</Grid>
        <Grid item xs={6}><h3>Domain:</h3>{job.domain}</Grid>
        <Grid item xs={6}><h3>Experience:</h3>{job.experience}</Grid>
        <Grid item xs={6}><h3>Language: </h3>{job.language}</Grid>
        <Grid item xs={12} sm={6}  sx={{ overflow: "auto" }}>
          <Grid container ><h3>Skills:</h3>
            {job.skills?.map((skill) => {
              return <Grid textAlign="center" sx={{ margin: "5px", padding: "5px" }} xs={2}>{skill}</Grid>;
            })}
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign="right"><Button variant="contained" color="secondary" onClick={() => applyOnJob(job)}>Apply</Button></Grid>
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
