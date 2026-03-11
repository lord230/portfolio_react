import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import Footer from './components/Footer';
import ShootingStars from './components/ShootingStars';
import UFOCursor from './components/UFOCursor';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import About from './components/About';
import Experience from './components/Experience';
import Research from './components/Research';
import Projects from './components/Projects';
import MoreAbout from './components/MoreAbout';
import Contact from './components/Contact';
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
      <ScrollToTop />
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Experience />
              <Research />
              <Projects />
              <MoreAbout />
              <Contact />
            </>
          } />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
        </Routes>

        <Footer />
        <ShootingStars />
        <UFOCursor />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
