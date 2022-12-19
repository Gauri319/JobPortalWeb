import React, { useEffect } from "react";
import Search from "../../../assets/svgFile/search.svg";
import {  TextField } from "@mui/material";
import Loding from "../../common/Loding/Loding";

function CandidateConversationSideBar({
  candidateConversation,
  setConversationMobileSidebar,
  allConversations,
  setSelectedConversation,
}) {
  useEffect(() => {
    candidateConversation();
  }, []);

  return (
    <div>
       <TextField
        placeholder="Search title or keywoard"
        sx={{
          border: "none",
          outline: "none",
          width: "100%",

          "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
        size="small"
        id="outlined-basic"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <img
              src={Search}
              alt="Search"
              style={{
                marginRight: "10px",
                maxWidth: "20px",
                width: { xs: "10%", md: "100%" },
                maxHeight: "20px",
                height: { xs: "10%", md: "100%" },
              }}
            />
          ),
        }}
      />

      {!allConversations ? (
        <div><Loding/></div>
      ) : allConversations && allConversations.length === 0 ? (
        <div>You do not have any conversion</div>
      ) : allConversations && allConversations.length > 0 ? (
        <div >
          {allConversations.map((conversation) => {
            return ( 
              <div
              onClick={() => {setSelectedConversation(conversation);setConversationMobileSidebar(false)}}
              style={{boxShadow:"0px 0px 3px var(--black)",margin:"10px",padding:"10px",maxHeight:"70px",overflow:"hidden"}}
              >
                <div style={{color:"var(--blue)",fontWeight:"600"}}>{conversation.client_name}</div>
                <div style={{marginLeft:"10px"}}>{conversation.last_message}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CandidateConversationSideBar;
