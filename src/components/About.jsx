import React from 'react';
import { motion } from 'framer-motion';
import PixelCard from './PixelCard';

const About = () => {
    return (
        <section id="about" className="about section-fade-in" style={{ marginTop: '4rem' }}>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>ABOUT_ME</h2>

                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
                    {/* Left Column: Bio & Info */}
                    <div className="about-left" style={{ borderLeft: '4px solid var(--border-color)', paddingLeft: '2rem' }}>
                        <div className="about-text-content">
                            <motion.p
                                className="about-bio"
                                style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                {'>'} INIT USER_PROFILE...<br /><br />
                                Computer Science undergraduate specializing in <strong style={{ color: 'var(--accent-color)', background: 'var(--text-primary)', padding: '0 5px' }}>Machine Learning, Deep Learning, and Computer Vision</strong>.<br /><br />
                                Experienced with research projects and practical applications in image processing and pattern recognition.
                                Skilled in back-end and full-stack development with a strong problem-solving mindset.
                            </motion.p>
                            <div className="personal-info" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>
                                <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent-color)' }}></i>
                                    <span>[Kolkata, India]</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <i className="fas fa-envelope" style={{ color: 'var(--accent-color)' }}></i>
                                    <a href="mailto:1amit1verma@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>[1amit1verma@gmail.com]</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Skills */}
                    <div className="about-right">
                        <PixelCard isMajor={true} className="skills-container">
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '2rem', borderBottom: '2px dotted var(--border-color)', paddingBottom: '0.5rem' }}><i className="fas fa-code-branch" style={{ color: 'var(--accent-color)' }}></i> TECH_ARSENAL</h3>
                            <div className="skill-categories" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="skill-category">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'black', marginBottom: '1rem' }}>Programming & Tools</h4>
                                    <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['Python', 'C/C++', 'JavaScript', 'MATLAB', 'Git', 'Linux'].map(skill => (
                                            <span key={skill} className="skill-tag" style={{ border: '2px solid var(--border-color)', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 'bold', background: 'var(--bg-card)', color: 'black' }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Frameworks & Libraries</h4>
                                    <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['PyTorch', 'OpenCV', 'PyQt', 'Tkinter', 'Streamlit'].map(skill => (
                                            <span key={skill} className="skill-tag" style={{ border: '2px solid var(--border-color)', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 'bold', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="skill-category">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Core Concepts</h4>
                                    <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['Deep Learning', 'Computer Vision', 'Machine Learning', 'Image Processing', 'Pattern Recognition'].map(skill => (
                                            <span key={skill} className="skill-tag" style={{ border: '2px solid var(--border-color)', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 'bold', background: 'var(--accent-color)', color: 'var(--text-primary)' }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PixelCard>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
