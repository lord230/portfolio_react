import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Research from '../components/Research';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import MoreAbout from '../components/MoreAbout';

const Home = () => {
    // Scroll visibility observer
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.project-card, .skill-tag, .about-bio, .contact-message');
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Hero />
            <About />
            <Experience />
            <Research />
            <Projects />
            <Contact />
            <MoreAbout />
        </>
    );
};

export default Home;
