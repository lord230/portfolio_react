import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// We discard UFOCursor and ShootingStars to replace with PixelCursor and CSS grid
import PixelCursor from './components/PixelCursor';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

// Components
import Footer from './components/Footer';
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
  const [loading, setLoading] = useState(true);

  // Use a strict 8-bit AI ML aesthetic (Navy on Ivory)
  useEffect(() => {
    document.body.setAttribute('data-theme', 'ml-retro');
    // Hide default cursor
    document.body.style.cursor = 'none';
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <div className="App">
          <PixelCursor />
          <Navbar />

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
        </div>
      )}
    </Router>
  );
}

export default App;
