import {auth} from '../../config/firebaseInitisize'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";

export async function signUp(email, password,type) {
    console.log(email);
    console.log(password);
   const result=await(createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log("logged in");
        localStorage.setItem(
          "userInfo",
          JSON.stringify({email:email,type:type,UserId:user.uid})
        ); //store in Local storage
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage)
        return false
        // .).
      }))
     return result; 

  }
export async function Signin(email, password,type) {
  const result= await (signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({email:email,type:type,UserId:user.uid})
      ); //store in Local storage
      return true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      return false;
    }))
  return result;
}

export async  function GoogleSign(type) {
    const provider = new GoogleAuthProvider();
  const result= await (signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      localStorage.setItem(
        "userInfo",
        JSON.stringify({email:user.email,type:type,UserId:user.uid})
      ); //store in Local storage
      return true;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
      return false;
    }))
    return result;
}