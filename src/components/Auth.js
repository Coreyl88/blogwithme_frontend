import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from '../store';
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [isSignup, setIsSignup] = useState(false)

  const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const sendRequest = async (type="login") => {
    const res = await axios.post(`process.env.REACT_APP_API_KEY/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    }).catch(err=>console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    if (isSignup) {
      sendRequest("register")
      .then((data)=>localStorage.setItem("userId", data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data));
    } else {
      sendRequest()
      .then((data)=>localStorage.setItem("userId", data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth= {400}
          display="flex" 
          flexDirection={"column"} 
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}          
          >
          <Typography 
            variant="h2" 
            padding={3} 
            textAlign="center"
            >
              {isSignup ? "Register" : "Login"}
          </Typography>

          { isSignup && 
          <TextField 
            name="name" 
            onChange={handleChange} 
            value={inputs.name} 
            placeholder="Username" 
            margin="normal" 
          />}{" "}

          <TextField 
            type={"email"} 
            name="email" 
            onChange={handleChange} 
            value={inputs.email} 
            placeholder="Email" 
            margin="normal" 
          />

          <TextField 
            type={"password"} 
            name="password" 
            onChange={handleChange} 
            value={inputs.password} 
            placeholder="Password" 
            margin="normal" 
          />

          <Button 
            type="submit" 
            variant="contained" 
            sx={{borderRadius:3, marginTop:3}} 
            color="primary"
            >
            Submit
          </Button>

          <Button 
            onClick={()=>setIsSignup(!isSignup)} 
            sx={{borderRadius:3, marginTop:3}} 
            color="primary">
            {isSignup ? "Login" : "Register"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;