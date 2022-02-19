import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import PostsPage from './pages/postsPage/postsPage';
import PostDetailsPage from './pages/postDetailsPage/postDetailsPage';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<PostsPage />} />
        <Route path='/post/:postId' element={<PostDetailsPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
