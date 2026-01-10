import React, { useEffect, useRef, useState } from 'react';
import NeuralNetwork from './NeuralNetwork';


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
                        <span className="cgpa">CGPA: 8.1/10.0</span>
                        <span className="graduation">Expected: Apr 2026</span>
                    </div>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                        <a href="AV_RESUME.pdf" className="btn btn-secondary" download>Download CV</a>
                    </div>
                </div>
                <div className="hero-visual" style={{ position: 'relative' }}>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <NeuralNetwork />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
