import React, { useEffect } from "react";

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
      {!allConversations ? (
        <div>laoding</div>
      ) : allConversations && allConversations.length === 0 ? (
        <div>nodata</div>
      ) : allConversations && allConversations.length > 0 ? (
        <div>
          {allConversations.map((conversation) => {
            return (
              <div
              onClick={() => {setSelectedConversation(conversation);setConversationMobileSidebar(false)}}
              style={{border:"0.5px solid rgb(137, 139, 140)", borderRadius:"25px",margin:"10px",padding:"10px"}}
              >
                <div style={{color:"#740EB8"}}><h4>{conversation.client_name}</h4></div>
                <div style={{marginLeft:"10px"}}><p>{conversation.last_message}</p></div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CandidateConversationSideBar;
