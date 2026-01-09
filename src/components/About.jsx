import React from 'react';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="about-bio">
                            Computer Science undergraduate specializing in Machine Learning, Deep Learning, and Computer Vision.
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
                                <span>1amit1verma@gmail.com</span>
                            </div>
                        </div>
                        <div className="skills">
                            <h3>Technical Skills</h3>
                            <div className="skill-categories">
                                <div className="skill-category">
                                    <h4>Programming Languages</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag">Python</span>
                                        <span className="skill-tag">C/C++</span>
                                        <span className="skill-tag">JavaScript</span>
                                        <span className="skill-tag">MATLAB</span>
                                        <span className="skill-tag">PyQt</span>
                                        <span className="skill-tag">PyTorch</span>
                                        <span className="skill-tag">OpenCV</span>
                                        <span className="skill-tag">Tkinter</span>
                                        <span className="skill-tag">Streamlit</span>
                                        <span className="skill-tag">Git</span>
                                        <span className="skill-tag">GitHub</span>
                                        <span className="skill-tag">Linux</span>
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4>Concepts</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag">Deep Learning</span>
                                        <span className="skill-tag">Computer Vision</span>
                                        <span className="skill-tag">Machine Learning</span>
                                        <span className="skill-tag">Image Processing</span>
                                        <span className="skill-tag">Pattern Recognition</span>
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4>Languages</h4>
                                    <div className="skill-tags">
                                        <span className="skill-tag">English</span>
                                        <span className="skill-tag">Hindi</span>
                                        <span className="skill-tag">Bengali</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
