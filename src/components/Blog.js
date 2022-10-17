import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Box, IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, image, userName, isUser, id }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    };
    const deleteRequest = async () => {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/blog/${id}`);
        const data = await res.data;
        return data;
    };

    const handleDelete = () => {
        deleteRequest()
        .then(() => navigate('/'))
        .then(() => navigate('/blogs'));
    };
    
  return (
    <div>
        {" "}
        <Card sx={{
                maxWidth: 345, 
                margin: 'auto', 
                marginTop: 2, 
                padding: 2, 
                boxShadow: "5px 5px 10px #ccc", 
                ":hover":{
                    boxShadow: "20px 20px 40px #ccc", 
                }, 
            }}
        >
            {isUser && (
                <Box display='flex'>
                    <IconButton onClick={handleEdit} sx={{marginLeft: 'auto'}}>
                        <ModeEditOutlineIcon color="warning"/>
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon color="error"/>
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "dodgerblue" }} aria-label="recipe">
                        {userName.charAt(0)}
                    </Avatar>
                }
                title={title}
            />
            <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
            />
            <CardContent>
                <hr />
                <br />
                <Typography variant="body2" color="text.secondary">
                    <b>{ userName }: </b>{description}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}

export default Blog