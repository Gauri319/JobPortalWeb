import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import JobInfoModal from "./JobInfoModal";
import uuid from "uuidv4";
import Navbar from "../../common/NavBar";
import { Box } from "@mui/material";
import Loding from "../../common/Loding/Loding";
import CandidateHOC from "../../HOC/CandidateHOC";

function CandidateJobs() {
  const [openModal, setOpenModal] = useState(false);
  const [ModalData, setModalData] = useState(null);
  const [filter, setFilter] = React.useState({
    selectedDomain: null,
    selectedSkills: [],
  });
  const [allJobs, setAllJobs] = useState(null);
  const [filterd, setFiltered] = useState(null);
  const fetchAllJobs = async () => {
    const q = query(collection(db, "jobs"));
    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(doc.data().domain!=filter.selectedDomain){
        jobs.push(doc.data());
       }
    });
    setAllJobs(jobs);
  };
  useEffect(() => {
    fetchAllJobs();
  }, [filter.selectedDomain]);
  
  console.log("fil>>>",filterd);
  const applyOnJob = async (job) => {
    console.log("Modal job",job)
    const application_id = uuid();
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
    await setDoc(doc(db, "applications", application_id), {
      job_id: job.job_id,
      application_id,
      createdAt: new Date(),
      client_id: job.client_id,
      interest_showen: "candidate",
      job_title: job?.domain ? job.domain : "title",
      qualification:job.qualification,
      experience:job.experience,
      client_name: job?.companyname ? job.companyname : "companyname",
      candidate_name: loggedInUser?.email
        ? loggedInUser.email
        : "candidate",
      candidate_id: loggedInUser?.UserId ? loggedInUser.UserId : "candidate",
      project_bugdet: job?.size ? job.size : "size",
    });
  };
  return (
    <div> 
      <Navbar />
      <CandidateHOC/>
      <Box maxWidth="md" sx={{margin:"30px auto"}}>
        <JobSearch filter={filter} setFilter={setFilter} setFiltered={setFiltered} />
        {
          filterd&&filterd.length>0?
          filterd.map((item) => {
            return (
              <JobCard
                applyOnJob={applyOnJob}
                setOpenModal={setOpenModal}
                setModalData={setModalData}
                key={item.job_id}
                job={item}
              />
            ); 
          }):""
        }
        {allJobs && allJobs.length === 0 ? (
          <div>no job :</div>
        ) : allJobs && allJobs.length > 0 ? (
          <div>
            {allJobs.map((item) => {
              return (
                <JobCard
                  applyOnJob={applyOnJob}
                  setOpenModal={setOpenModal}
                  setModalData={setModalData}
                  key={item.job_id}
                  job={item}
                />
              );
            })}
          </div>
        ) : (
          <div><Loding/></div>
        )}

      </Box>

      <JobInfoModal
        applyOnJob={applyOnJob}
        ModalData={ModalData}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
}

export default CandidateJobs;
