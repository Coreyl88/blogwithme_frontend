import Header from "./components/Header";
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  },[dispath]);

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          { !isLoggedIn ? (
              <Route path="/auth" element={<Auth />} /> 
            ):(
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/create" element={<CreateBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
