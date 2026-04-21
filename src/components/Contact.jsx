import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import PixelButton from './PixelButton';
import PixelCard from './PixelCard';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE/TEMPLATE/PUBLIC KEY
        const SERVICE_ID = 'service_dknwx93';
        const TEMPLATE_ID = 'template_jvruf7p';
        const PUBLIC_KEY = '13TJGAm1UXV99Y9Xn';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    return (
        <section id="contact" className="contact" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>CONTACT_</h2>
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    <div className="contact-info">
                        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem' }}><i className="fas fa-paper-plane" style={{ color: 'var(--accent-color)' }}></i> Let's Connect</h3>
                        <p className="contact-desc" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            I'm currently looking for new opportunities in Machine Learning.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="contact-methods" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="mailto:1amit1verma@gmail.com" className="contact-method-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '2px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)', fontFamily: 'var(--font-sans)' }}>
                                <div className="c-icon"><i className="fas fa-envelope" style={{ color: 'var(--accent-color)' }}></i></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Email</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>1amit1verma@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://github.com/lord230" target="_blank" rel="noreferrer" className="contact-method-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '2px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)', fontFamily: 'var(--font-sans)' }}>
                                <div className="c-icon"><i className="fab fa-github" style={{ color: 'var(--accent-color)' }}></i></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>GitHub</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@lord230</span>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="contact-method-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '2px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)', fontFamily: 'var(--font-sans)' }}>
                                <div className="c-icon"><i className="fab fa-linkedin-in" style={{ color: 'var(--accent-color)' }}></i></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>LinkedIn</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Connect with me</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <PixelCard isMajor={true} className="contact-form-wrapper">
                        <form ref={form} onSubmit={sendEmail} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="user_name" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Name</label>
                                <input type="text" name="user_name" id="user_name" required placeholder="John Doe" style={{ padding: '0.8rem', border: '2px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="user_email" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Email</label>
                                <input type="email" name="email" id="user_email" required placeholder="john@example.com" style={{ padding: '0.8rem', border: '2px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="message" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Message</label>
                                <textarea name="message" id="message" required placeholder="Your message here..." rows="5" style={{ padding: '0.8rem', border: '2px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'none' }}></textarea>
                            </div>
                            
                            <PixelButton type="submit" isPrimary={true} disabled={status === 'sending'} style={{ alignSelf: 'flex-start' }}>
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </PixelButton>

                            {status === 'success' && <p className="status-msg success" style={{ color: 'var(--secondary-accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>[OK] Message sent successfully!</p>}
                            {status === 'error' && <p className="status-msg error" style={{ color: 'red', fontSize: '0.8rem', fontWeight: 'bold' }}>[ERR] Failed to send. Please try again.</p>}
                        </form>
                        </PixelCard>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
