import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>Ready to collaborate on ML projects</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-github"></i>
                            <a href="https://github.com/lord230" target="_blank" rel="noreferrer">github.com/lord230</a>
                        </div>
                    </div>
                    <div className="contact-form">
                        <p className="contact-message">
                            Interested in machine learning, AI, or want to discuss potential collaborations?
                            Feel free to reach out through GitHub or connect with me on professional platforms.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
