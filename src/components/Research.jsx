import React from 'react';
import { motion } from 'framer-motion';
import PixelCard from './PixelCard';

const Research = () => {
    return (
        <section id="research" className="research" style={{ marginTop: '4rem' }}>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>RESEARCH_</h2>
                <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <PixelCard isMajor={false} className="research-card">
                        <div className="research-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 className="research-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', borderBottom: '2px dotted var(--border-color)', paddingBottom: '0.5rem' }}>AdaptiveSpatialNorm</h3>
                            <span className="research-date" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>[ Feb 2025 ]</span>
                            <p className="research-description" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Designed an adaptive spatial normalization method to dynamically normalize features in image data, enhancing model robustness and accuracy.</p>
                        </div>
                    </PixelCard>
                    <PixelCard isMajor={false} className="research-card">
                        <div className="research-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 className="research-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', borderBottom: '2px dotted var(--border-color)', paddingBottom: '0.5rem' }}>Normalization Techniques Comparison</h3>
                            <span className="research-date" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>[ Mar 2025 - Jul 2025 ]</span>
                            <p className="research-description" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Conducted a comparative study of traditional and modern de-noising techniques for image enhancement. Results accepted for presentation at the International Conference on Smart Systems and Artificial Intelligence (ICSSAI 2025).</p>
                        </div>
                    </PixelCard>
                </div>
            </motion.div>
        </section>
    );
};

export default Research;
