import React from 'react';
import Navbar from '../common/NavBar';
import Sign from './Sign';
import { useParams } from "react-router-dom";

function Signup() {
  const { type } = useParams();

  return (
    <div>
      <Navbar />
      <Sign authentication="SignUp" type={type} message="Welcome!" />
    </div>
  )
}

export default Signup