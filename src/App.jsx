import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import Footer from './components/Footer';
import ShootingStars from './components/ShootingStars';
import './index.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Loading animation (simple fade in on mount)
  useEffect(() => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
        </Routes>

        <Footer />
        <ShootingStars />
      </div>
    </Router>
  );
}

export default App;
