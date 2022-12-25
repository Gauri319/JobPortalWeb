import React, { useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
function MessageArea({
  onSendMessage,
  selectedConversation,
  fetchAllOneToOneMessages,
  allMessages,
}) {
  const [messagetext, setMessage] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedId = loggedInUser.UserId;
  useEffect(() => {
    if (selectedConversation) {
      fetchAllOneToOneMessages();
    }
  }, [selectedConversation]);

  console.log(allMessages);
  const checkType = (message) => {
    if (message.sender_id === loggedId) {
      if (message.sender_role === "candidate") {
        return "#26D7AB";
      } else {
        return "#4715BA";
      }
    } else {
      return "#E8E7E7";
    }
  };
  return (
    <div style={{ width: "100%", minHeight: "600px", overflow: "auto", border: "1px dotted var(--black)", position: "relative" }}>
      {selectedConversation && allMessages ? (
        <div>
          <div style={{
             position: "absolute",
            bottom: "60px", display: "flex", flexDirection: "column-reverse",
            maxHeight:"520px",
            overflow:"auto"
            // alignItems: message.sender_id === loggedId ? "flex-end":"flex-start"
          }}>
            {allMessages.map((message) => {
              return (
                <div
                  style={{
                    borderRadius: message.sender_id === loggedId ? " 16px 0px 16px 16px" : "0px 16px 16px 16px",
                    width: "fit-content",
                    float:"right",
                    padding: "10px",
                    margin: "5px 10px",
                    alignSelf:message.sender_id === loggedId ?"flex-end":"flex-start",
                    marginLeft:
                      message.sender_id === loggedId ? "10px" : "0",
                    background: checkType(message),
                    color: message.sender_id === loggedId && "white",
                  }}
                  key={message.message_id}
                >
                  {message.message}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>select a conversation</div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(messagetext!==""){
            onSendMessage(messagetext);
          }
          setMessage("");
        }}
      >

        <Grid
          sx={{
            paddingBottom: "10px",
            alignItems: "center",
            position: "absolute",
            bottom: "0"
          }}
          container spacing={2} >
          <Grid item xs={10}>
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              value={messagetext}
              fullWidth
              id="outlined-basic"
              label="Your Message"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" sx={{ backgroundColor: "var(--blue)" }} type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default MessageArea;
