import React, { useEffect, useRef, useState } from 'react';
import NeuralNetwork from './NeuralNetwork';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, className, href, download }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2);
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            download={download}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring, display: 'inline-block' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={className}
        >
            {children}
        </motion.a>
    );
};

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
                        <h1 className="hero-title">
                            AMIT VERMA
                        </h1>
                        <p className="hero-subtitle">ML Engineer & AI Enthusiast</p>
                    </motion.div>

                    <motion.div className="hero-description" variants={itemVariants}>
                        <p>Building, Running & Fine-tuning Machine Learning Models</p>
                    </motion.div>

                    <motion.div className="hero-cgpa-info" variants={itemVariants}>
                        <span className="cgpa">CGPA: 8.1/10.0</span>
                        <span className="graduation">Expected: Apr 2026</span>
                    </motion.div>

                    <motion.div className="hero-buttons" variants={itemVariants}>
                        <MagneticButton href="#projects" className="btn btn-primary">View Projects</MagneticButton>
                        <MagneticButton href="#contact" className="btn btn-secondary">Get In Touch</MagneticButton>
                        <MagneticButton href="Resume_AV.pdf" className="btn btn-secondary" download>Download CV</MagneticButton>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    style={{ position: 'relative' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <NeuralNetwork />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
