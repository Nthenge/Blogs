import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import "./style.css"

function app() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Home />} />
        <Route path = '/post/:id' element={<PostDetail />} />
        <Route path = '/about' element={<About />} />
        <Route path = '*' element={<NotFound />} />
        <Route path = '/create' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default app;