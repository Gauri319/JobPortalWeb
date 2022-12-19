import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import { signUp, Signin, GoogleSign } from "../Functions/Authentication";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseInitisize";
import Button1 from "../common/Button/Button";
import './index.css';
import { Link } from "react-router-dom";
import Loding from "../common/Loding/Loding";


function Sign({ authentication, type, message }) {
    // =====================================variables =======================================================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loding, setLoding] = useState(false);
    let navigate = useNavigate();
    
     const getUserType=async(email)=>{
        const userdata=JSON.parse(localStorage.getItem("userInfo"));
        const userId=userdata.UserId;
        const docRef = doc(db, "usersData",userId);
        const docData = await getDoc(docRef); 

        if (docData.exists()) {
            if(docData.data().email===userdata.email){
                if(docData.data().user_type===userdata.type){
                    nextStep(true);
                }
                else{
                    alert("Your are Not Allowed to Login as ",userdata.type)
                    setLoding(false);
                }
            }
            else{
                alert("Your are Not Sign Up Please! SignUp ");
                setLoding(false);

            }  
        }
        else{
            alert("Your are Not Sign Up Please! SignUp ");
            setLoding(false);

        }  
     }
    // =====================================Handle the signup and sign in of user=======================================================
    const handleAuth = async () => {
        setLoding(true)
        if (email !== "" && password !== "") {
            if (authentication === "SignUp") {
                const result = await (signUp(email, password, type));
                console.log(result);
                nextStep(result)
            }
            else {
                const result = await (Signin(email, password, type));
                getUserType(email);
            }
        }
        else {
            setLoding(false);
            alert("please enter a valid email and password");
            
        }
    }
    // =====================================Handle the Google signup and sign in of user=======================================================

    async function handleGoogleClick(e) {
        const result = await GoogleSign(type);
        nextStep(result)
    }
    // =====================================move the  user form authentication page to onbording page or profile page =======================================================

    function nextStep(result) {
       setLoding(false);
        if (result) {
            if (type === "Candidate") {
                if (authentication === "SignUp") {
                    navigate("/onboarding/candidate");
                }
                else {
                    navigate("/candidate/profile");
                }
            } else {
                if (authentication === "SignUp") {
                    navigate("/onboarding/client");
                }
                else {
                    navigate("/client/profile");
                }
            }
        }
    }
    // ================================================================************************=============================================================================


    return (
        <div>
            {
                loding ?
                    <Loding /> :
                    <div >
                        <Box maxWidth="sm"
                            sx={
                                {
                                    textAlign: 'center',
                                    margin: "7px auto",
                                    boxShadow: 3,
                                    borderRadius: '20px'
                                }
                            }>
                            <Grid container
                                justifyContent="center"
                                alignItems="center"
                                rowSpacing={2}
                                sx={
                                    {
                                        width: { md: "70%", xs: "100%" },
                                        textAlign: 'center',
                                        margin: "3px auto",
                                        padding: "30px 20px"

                                    }
                                }
                            >
                                <Grid item xs={12} lg={12}>
                                    <h1>
                                        <span>{message}</span>
                                    </h1>
                                    <p style={{ fontSize: "15px", color: "var(--darkgrey)" }}>{message}please Enter your details to get {authentication} your Account</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <AccountCircleIcon sx={{ fontSize: "150px", color: "var(--grey)" }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="standard-basic" type="text" label="Username" variant="standard" size="small" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="standard-basic" type="password" label="password" variant="standard" size="small" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: authentication == "SignUp" ? 'block' : 'none' }} >
                                    <TextField fullWidth id="standard-basic" type="password" label="Confirm password" variant="standard" size="small" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        (authentication === "SignUp") ?
                                            <h5>Already have an account ? <Link to={`/SignIn/${type}`}>SignIn</Link></h5>
                                            :
                                            <h5>Don't have an account ? <Link to={`/Signup/${type}`}>SignUp</Link></h5>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="sign-btn"><Button1 text={authentication} handleClick={handleAuth} /></div>
                                </Grid>
                                <Grid item xs={12}>
                                    <h5>--OR {authentication} with --</h5>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="google-btn"> <Button1 text={`${authentication} with Google`} icon={<GoogleIcon />} handleClick={handleGoogleClick} /></div>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
            }

        </div>
    )
}

export default Sign