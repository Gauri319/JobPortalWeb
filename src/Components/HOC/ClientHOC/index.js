// import { Button, Grid } from "@mui/material";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function ClientHOC({ children }) {
//   const navigate = useNavigate();
//   const reRoute = (path) => {
//     navigate(path);
//   };
//   return (
//     <div>
//       <Grid container spacing={0} mr={6}>
//         {routes.map((route, index) => {
//           return (
//             <Grid item xs={2}  key={index}>
//               <Button onClick={() => reRoute(route.path)}>{route.name}</Button>
//             </Grid>
//           );
//         })}
//       </Grid>
//       <div style={{ margin: "60px auto", maxWidth: "1100px", width: "90%" }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default ClientHOC;

import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const routes = [ 
  {
    icon: <WorkIcon />,
    name: "Jobs",
    path: "/client/jobs",
  },
  {
    icon: <AccountCircleIcon />,
    name: "Profile",
    path: "/client/profile",
  },
  {
    icon: <QuestionAnswerIcon />,
    name: "Conversation",
    path: "/client/conversation",
  },
  {
    icon: <TextSnippetIcon />,
    name: "Applicants",
    path: "/client/applicants",
  },
];

function ClientHOC({ children }) {
  const navigate = useNavigate();
  const reRoute = (path) => {
    navigate(path);
  };

  const s1 = {
    color: "var(--white)",
    "&:hover": {
      color: "var(--white)",
    },
    width: "20px",
    display: "flex",
    flexDirection: { lg: "row", sm: "column", xs: "column" },
    fontSize: { lg: "15px", sm: "16px", xs: "11px" },
    textTransform: { lg: "uppercase", sm: "lowercase", xs: "lowercase" },
    wordWrap: "break-word",
  };

  return (
    <div>
      <Box sx={{backgroundColor:"var(--blue)",  margin:"20px auto" }}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              columnSpacing={2}
            >
              {routes.map((route, index) => {
                return (
                  <Grid
                    item
                    xs={3}
                    lg={2}
                    key={index}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button sx={s1} onClick={() => reRoute(route.path)}>
                      {route.icon} {route.name}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
      </Box>
      <div style={{ margin: "30px auto", maxWidth: "1100px", width: "90%" }}>
        {children}
      </div>
    </div>
  );
}

export default ClientHOC;
