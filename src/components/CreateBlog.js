import React from 'react';
import { Box, Typography, TextField, InputLabel, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const labelStyles = {marginBottom:1, marginTop:2, fontSize: "24px", fontWeight: "bold"}

const CreateBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/create`, {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId"),
    }).catch(err => console.error(err));
    const data  = await res.data;
    return data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest()
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          border={3} 
          borderColor="radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2%)"
          borderRadius={10} 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          margin={"auto"}
          marginTop="20px" 
          display="flex" 
          flexDirection={"column"} 
          maxWidth={450}
          >
          <Typography 
            fontWeight={"bold"} 
            padding={3} color="grey" 
            variant='h2' 
            textAlign={"center"}
          >
            Create Your Blog
            </Typography>

          <InputLabel 
            sx={labelStyles}
          >
            Title
          </InputLabel>
          <TextField 
            name="title" 
            onChange={handleChange} 
            value={inputs.title} 
            margin='normal' 
          />
          <InputLabel 
            sx={labelStyles}
          >
            Description
          </InputLabel>

          <TextField 
            name="description" 
            onChange={handleChange} 
            value={inputs.description} 
            margin='normal'
          />
          <InputLabel 
            sx={labelStyles}
          >
            Image
          </InputLabel>

          <TextField 
            name="image" 
            onChange={handleChange} 
            value={inputs.image} 
            margin='normal'
          />
          <Button 
            sx={{margin: 1, borderRadius: 10}} 
            color="primary" variant='contained' 
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  
)}

export default CreateBlog