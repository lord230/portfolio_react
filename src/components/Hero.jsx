import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { motion } from 'framer-motion';
import PixelButton from './PixelButton';

const Hero = () => {
    // container variants for staggering
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="floating-text" variants={itemVariants}>
                        <h1 className="hero-title" style={{ color: 'var(--text-primary)', textShadow: '4px 4px 0px var(--accent-color)'}}>
                            AMIT VERMA
                        </h1>
                        <p className="hero-subtitle" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)'}}>
                            {'>'} ML Engineer & AI Enthusiast_
                        </p>
                    </motion.div>

                    <motion.div className="hero-description" variants={itemVariants}>
                        <p style={{ fontFamily: 'var(--font-sans)', backgroundColor: 'var(--bg-secondary)', padding: '1rem', border: '2px solid var(--border-color)', display: 'inline-block' }}>
                            Building, Running & Fine-tuning Machine Learning Models
                        </p>
                    </motion.div>

                    <motion.div className="hero-cgpa-info" variants={itemVariants} style={{ margin: '1rem 0', fontFamily: 'var(--font-sans)' }}>
                        <span className="cgpa">[{'CGPA: 8.1/10.0'}] </span>
                        <span className="graduation">[{'Expected: Apr 2026'}]</span>
                    </motion.div>

                    <motion.div className="hero-buttons" variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#projects" style={{ textDecoration: 'none' }}><PixelButton isPrimary={true}>View Projects</PixelButton></a>
                        <a href="#contact" style={{ textDecoration: 'none' }}><PixelButton isPrimary={false}>Get In Touch</PixelButton></a>
                        <a href="Resume_AV.pdf" download style={{ textDecoration: 'none' }}><PixelButton isPrimary={false}>Download CV</PixelButton></a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    style={{ position: 'relative' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                >
                    <div style={{ position: 'relative', zIndex: 1, border: '4px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '1rem', boxShadow: '8px 8px 0px var(--accent-color)' }}>
                        <NeuralNetwork />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
