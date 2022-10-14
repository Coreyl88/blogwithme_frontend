import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, InputLabel, TextField, Button } from '@mui/material';

const labelStyles = {marginBottom:1, marginTop:2, fontSize: "24px", fontWeight: "bold"}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();

  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getDetails = async () => {
    const res = await axios.get(`http://localhost:4000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data
    return data
  };

  useEffect(() => {
    getDetails().then(data => {
      setBlog(data.blog)
      setInputs({title: data.blog.title, description: data.blog.description, image: data.blog.image})
    });
  }, [id])

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:4000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
    }).catch(err => console.log(err));

    const data = await res.data
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(()=>navigate('/myblogs/'));
  };

  return (
    <div>
      {inputs &&
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
            Edit Your Blog
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
          
          <Button 
            sx={{margin: 1, borderRadius: 10}} 
            color="primary" variant='contained' 
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
  }</div>
  )
}

export default BlogDetail