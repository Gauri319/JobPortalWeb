
import React from 'react';
import Navbar from '../common/NavBar';
import Sign from './Sign';
import { useParams } from "react-router-dom";

function SignIn() {
  const { type } = useParams();
  return (
    <div>
      <Navbar />
      <Sign authentication="SignIn" type={type} message="Welcome back!"/>
    </div>
  )
}

export default SignIn