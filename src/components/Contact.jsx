import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

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
        <section id="contact" className="contact">
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-grid">
                    <div className="contact-info">
                        <h3><i className="fas fa-paper-plane"></i> Let's Connect</h3>
                        <p className="contact-desc">
                            I'm currently looking for new opportunities in Machine Learning.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="contact-methods">
                            <a href="mailto:1amit1verma@gmail.com" className="contact-method-card">
                                <div className="c-icon"><i className="fas fa-envelope"></i></div>
                                <div>
                                    <h4>Email</h4>
                                    <span>1amit1verma@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://github.com/lord230" target="_blank" rel="noreferrer" className="contact-method-card">
                                <div className="c-icon"><i className="fab fa-github"></i></div>
                                <div>
                                    <h4>GitHub</h4>
                                    <span>@lord230</span>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="contact-method-card">
                                <div className="c-icon"><i className="fab fa-linkedin-in"></i></div>
                                <div>
                                    <h4>LinkedIn</h4>
                                    <span>Connect with me</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form ref={form} onSubmit={sendEmail} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="user_name">Name</label>
                                <input type="text" name="user_name" id="user_name" required placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_email">Email</label>
                                <input type="email" name="email" id="user_email" required placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" required placeholder="Your message here..." rows="5"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary send-btn" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane"></i>
                            </button>

                            {status === 'success' && <p className="status-msg success"><i className="fas fa-check-circle"></i> Message sent successfully!</p>}
                            {status === 'error' && <p className="status-msg error"><i className="fas fa-exclamation-circle"></i> Failed to send. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
