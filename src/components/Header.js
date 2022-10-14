import React from 'react'
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state=>state.isLoggedIn);

  const [value, setValue] = useState();

  return (
    <AppBar position="sticky" elevation={15} sx={{ background: "radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2%)"}}>
      <Toolbar>
        <Typography variant='h4'>Blog-With-Me</Typography>

        { isLoggedIn && (
        <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="Blogs"/>
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
            <Tab LinkComponent={Link} to="/blogs/create" label="Create Blogs"/>
          </Tabs>
        </Box>)}

        <Box display="flex" marginLeft="auto">

          { !isLoggedIn && (
            <>
              {" "}
              <Button 
                LinkComponent={Link} 
                to="/auth" 
                variant= "contained" 
                sx={{margin: 1, borderRadius: 10}} 
                color="primary"
                >Login
              </Button>

              <Button 
                LinkComponent={Link} 
                to="/auth" 
                variant= "contained" 
                sx={{margin: 1, borderRadius: 10}} 
                color="primary"
                >Register
              </Button>
            </>
          )}

          { isLoggedIn && (
          <Button
            onClick={()=>dispath(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant= "contained" 
            sx={{margin: 1, borderRadius: 10}} 
            color="primary"
          >
            Logout
          </Button>
          )}
        </Box>
      </Toolbar>  
    </AppBar>
  )
}

export default Header