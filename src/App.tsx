import React from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import PostsPage from './pages/postsPage/postsPage';
import PostDetailsPage from './pages/postDetailsPage/postDetailsPage';
import { useSelector } from 'react-redux';
import { AppState } from './reducers';

function App() {
  const favoriteCtrl = useSelector((state: AppState) => state.favoriteReducer);

  return (
    <React.Fragment>
      <nav className="navbar navbar-ligh bg-ligh">
        <a className="navbar-brand" href="#">
          Navbar <span className="badge bg-secondary">{favoriteCtrl.numberOfFavorites}</span>
        </a>

        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>
      <Routes>
        <Route path='/' element={<PostsPage />} />
        <Route path='/post/:postId' element={<PostDetailsPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
