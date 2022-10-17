import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem('userId');
  const sendRequest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/blog/user/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user))
  }, [])
  console.log(user)
  
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index) => (
        <Blog
          id={blog._id}
          key={index}
          isUser={true}
          title={blog.title} 
          description={blog.description} 
          image={blog.image} 
          userName={user.name}
        />
      ))}
    </div>
  )
}

export default UserBlogs