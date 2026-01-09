import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const [titleText, setTitleText] = useState('');
    const fullText = "AMIT VERMA";

    // Typing animation
    useEffect(() => {
        let i = 0;
        const speed = 150;
        const delay = 500;

        const type = () => {
            if (i < fullText.length) {
                setTitleText(fullText.substring(0, i + 1));
                i++;
                setTimeout(type, speed);
            }
        };

        const timeoutId = setTimeout(() => {
            type();
        }, delay);

        return () => clearTimeout(timeoutId);
    }, []);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const elements = document.querySelectorAll('.floating-element');

            elements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="floating-text">
                        <h1 className="hero-title">
                            <span className="typing-text">{titleText}</span>
                        </h1>
                        <p className="hero-subtitle typing-text-delayed">ML Engineer & AI Enthusiast</p>
                    </div>
                    <div className="hero-description">
                        <p className="typing-text-delayed-2">Building, Running & Fine-tuning Machine Learning Models</p>
                    </div>
                    <div className="hero-cgpa-info">
                        <span className="cgpa">CGPA: 8.0/10.0</span>
                        <span className="graduation">Expected: Apr 2026</span>
                    </div>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                        <a href="AV_RESUME.pdf" className="btn btn-secondary" download>Download CV</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-elements">
                        <div className="floating-element element-1">★</div>
                        <div className="floating-element element-2">✦</div>
                        <div className="floating-element element-3">✧</div>
                        <div className="floating-element element-4">✩</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
