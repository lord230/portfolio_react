import React from 'react';
import { motion } from 'framer-motion';
import PixelCard from './PixelCard';

const Experience = () => {
    return (
        <section id="experience" className="experience" style={{ marginTop: '4rem' }}>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title"  style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>EXPERIENCE</h2>
                <div className="experience-content">
                    <PixelCard isMajor={true} className="experience-item">
                        <div className="experience-header" style={{ borderBottom: '2px dotted var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Software Intern</h3>
                            <span className="company" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', display: 'block', fontWeight: 'bold' }}>DRDO Project Executive Lab, SSPL Delhi</span>
                            <span className="duration" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>[ Feb 2025 – May 2025 ]</span>
                        </div>
                        <ul className="experience-details" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', listStyleType: 'square', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>Developed and integrated GUI components for a thermal sensor application using <strong style={{ color: 'var(--text-primary)', background: 'var(--accent-color)' }}>PyQt and OpenCV</strong>, incorporating video feed and controls.</li>
                            <li>Implemented simulation modules along with deep learning-based denoising models to enhance thermal image clarity.</li>
                            <li>Applied multiple video filters and upscaling techniques to convert low-bit thermal footage to higher-bit representations for improved visibility.</li>
                            <li>Engineered missile tracking functionality using computer vision and multithreaded processing to ensure real-time performance and responsiveness.</li>
                            <li>Collaborated with cross-functional teams to ensure alignment with project specifications and deadlines.</li>
                            <li>Tested and debugged software modules, significantly improving system reliability and robustness under simulated battlefield conditions.</li>
                        </ul>
                    </PixelCard>
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
