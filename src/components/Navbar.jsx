import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const scrollToSection = (e, id) => {
        // If not on home page, navigate to home then scroll
        if (location.pathname !== '/') {
            return;
        }

        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
        }
    };

    // Helper to determine if we should use simple anchor or Link
    const NavHashLink = ({ to, children }) => {
        // If we are on home page, use anchor scrolling
        if (location.pathname === '/') {
            return <a href={to} className="nav-link" onClick={(e) => scrollToSection(e, to)} style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>[{children}]</a>;
        } else {
            // If on other pages, link to home with hash
            return <Link to={`/${to}`} className="nav-link" onClick={closeMenu} style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>[{children}]</Link>;
        }
    };

    return (
        <nav className="navbar" style={{ borderBottom: '3px solid var(--border-color)', backgroundColor: 'var(--blur-bg)'}}>
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <span className="logo-text" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textShadow: '2px 2px 0px var(--accent-color)' }}>AV</span>
                </Link>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <NavHashLink to="#home">Home</NavHashLink>
                    </li>
                    <li className="nav-item">
                        <NavHashLink to="#about">About</NavHashLink>
                    </li>
                    <li className="nav-item">
                        <NavHashLink to="#experience">Experience</NavHashLink>
                    </li>
                    <li className="nav-item">
                        <NavHashLink to="#research">Research</NavHashLink>
                    </li>
                    <li className="nav-item">
                        <Link to="/blogs" className="nav-link" onClick={closeMenu} style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>[Blog]</Link>
                    </li>
                    <li className="nav-item">
                        <NavHashLink to="#projects">Projects</NavHashLink>
                    </li>
                    <li className="nav-item">
                        <NavHashLink to="#contact">Contact</NavHashLink>
                    </li>
                </ul>
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar" style={{ backgroundColor: 'var(--text-primary)' }}></span>
                    <span className="bar" style={{ backgroundColor: 'var(--text-primary)' }}></span>
                    <span className="bar" style={{ backgroundColor: 'var(--text-primary)' }}></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
