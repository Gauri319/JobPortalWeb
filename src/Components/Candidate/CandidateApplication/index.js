import React, { useEffect } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import ApplicationTable from "../../common/ApplicationTable";
import Loding from "../../common/Loding/Loding";
import Navbar from "../../common/NavBar";
import CandidateHOC from "../../HOC/CandidateHOC";
import { Box } from "@mui/material";
function CandidateApplication() {
  const [applications, setAllApplications] = React.useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  const candidateId = loggedInUser.UserId;
  const fetchAllApplications = async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("candidate_id", "==", candidateId)
      );

      const querySnapshot = await getDocs(q);
      let applications = [];
      querySnapshot.forEach((doc) => {
        applications.push(doc.data());

      });
      setAllApplications(applications);
      console.log(applications)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);
  return (
    <div>
      <Navbar/>
      <CandidateHOC/>
      <Box maxWidth="md" sx={{margin:"10px auto"}}>
      {applications && applications.length === 0 ? (
        <div>You Don't have  applications</div>
      ) : applications && applications.length > 0 ? (
        <div>
          <ApplicationTable
          // columns={["Job Title", "Client Name",'Budget','Status',"date"]}
            columns={[
              { label: "Job Title", key: "job_title" },
              { label: "Client Name", key: "client_name" },
              { label: "Budget", key: "project_bugdet" },
              { label: "Status", key: "interest_showen" },
              { label: "date", key: "createdAt" },
            ]} 
          
          rows={applications}
          />
        </div>
      ) : (
        <div><Loding/></div>
      )}</Box>
    </div>
  );
}

export default CandidateApplication;
