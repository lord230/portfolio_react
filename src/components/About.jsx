import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="about section-fade-in">
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title">About Me</h2>

                <div className="about-grid">
                    {/* Left Column: Bio & Info */}
                    <div className="about-left">
                        <div className="about-illustration">
                            {/* Simple CSS-based Creator Journey Graphic */}
                            <div className="illustration-node node-1"></div>
                            <div className="illustration-path path-1"></div>
                            <div className="illustration-node node-2"></div>
                            <div className="illustration-path path-2"></div>
                            <div className="illustration-node node-3"></div>
                        </div>
                        <div className="about-text-content">
                            <p className="about-bio">
                                Computer Science undergraduate specializing in <strong>Machine Learning, Deep Learning, and Computer Vision</strong>.
                                Experienced with research projects and practical applications in image processing and pattern recognition.
                                Skilled in back-end and full-stack development with a strong problem-solving mindset.
                            </p>
                            <div className="personal-info">
                                <div className="info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Kolkata, India</span>
                                </div>
                                <div className="info-item">
                                    <i className="fas fa-envelope"></i>
                                    <a href="mailto:1amit1verma@gmail.com">1amit1verma@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Skills */}
                    <div className="about-right">
                        <div className="skills-container">
                            <h3><i className="fas fa-code-branch"></i> Technical Arsenal</h3>
                            <div className="skill-categories">
                                <div className="skill-category">
                                    <h4>Programming & Tools</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag primary">Python</span>
                                        <span className="skill-tag">C/C++</span>
                                        <span className="skill-tag">JavaScript</span>
                                        <span className="skill-tag">MATLAB</span>
                                        <span className="skill-tag">Git</span>
                                        <span className="skill-tag">Linux</span>
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4>Frameworks & Libraries</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag primary">PyTorch</span>
                                        <span className="skill-tag primary">OpenCV</span>
                                        <span className="skill-tag">PyQt</span>
                                        <span className="skill-tag">Tkinter</span>
                                        <span className="skill-tag">Streamlit</span>
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4>Core Concepts</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag accent">Deep Learning</span>
                                        <span className="skill-tag accent">Computer Vision</span>
                                        <span className="skill-tag">Machine Learning</span>
                                        <span className="skill-tag">Image Processing</span>
                                        <span className="skill-tag">Pattern Recognition</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
