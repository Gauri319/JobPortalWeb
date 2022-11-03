import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseInitisize";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseInitisize";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import background from "./images/background.png"

function Signup({ type }) {
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  console.log(type);
  async function getProfile({ userId, token, user, type }) {
    try {
      const docRef = doc(db, "usersData", userId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        console.log("Document data:", docData.data());
        const constDocData = docData.data();
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, userInfo: { ...constDocData } })
        ); //store in Local storage

        if (constDocData.step === 2) {
          if (type === "client") {
            if (constDocData.user_type === "candidate") {
              alert("You are not allowed to login as client");
              return;
            } else {
              setTimeout(() => {
                navigate("/client/profile");
              }, 2000);
             
            }
          } else {
            if (constDocData.user_type === "client") {
              alert("You are not allowed to login as candidate");
              return;
            } else {
            setTimeout(() => {
              navigate("/candidate/profile");
            }, 2000);
            }
          }
        } else {
          if (type === "client") {
            navigate("/onboarding/client");
          } else {
            navigate("/onboarding/candidate");
          }
        }
      } else {
        if (type === "client") {
          navigate("/onboarding/client");
        } else {
          navigate("/onboarding/candidate");
        }
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result, "result");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, "token", token);
        localStorage.setItem("user", JSON.stringify(user)); //store in Local storage
        localStorage.setItem("token", token); //store in Local storage
        getProfile({ userId: user.uid, token, user, type });

        // ...
      })
      .catch((error) => {
        
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        alert(errorMessage);
        GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="wrapper-container" >
      <div className="image-container"> 
        <img src={background} alt="sideImage"/>    
      </div>
      <Box
        mt={2}
        sx={{
          boxShadow:3,
          borderRadius: '16px',
          padding:"90px 10px",
          margin:"auto",
          backgroundColor:"#F5F5F8",
          width:{ lg: '60%', md:'75%',sm:'60%',xs:'85%'},
          height:"600px"
        }}
      >
        <Grid container direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={6}
          sx={
            {
              textAlign:"center",
              width:"100%",
          }
          }
          >
          <Grid item xs={12}>
            <h1>
              Welcome <span>{type}</span>
            </h1>
          </Grid>
          <Grid item xs={12}>
            <AccountCircleIcon sx={{fontSize:"150px",color:"#8B8B8F"}}/>
          </Grid>
          <Grid item xs={12}>
            <h1>Sign IN</h1>
          </Grid>
          <Grid item xs={12}>
               <Button onClick={signIn}  variant="contained" sx={{backgroundColor:"#6119EF",boxShadow:3, borderRadius: '16px'}}><GoogleIcon /> SignUp with Google</Button>
          </Grid>
        </Grid>

      </Box>
    </div>
    )
}

export default Signup;
