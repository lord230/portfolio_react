import React from 'react';

const MoreAbout = () => {
    return (
        <section id="about-me" className="about-me" style={{ marginTop: '4rem', marginBottom: '4rem', borderTop: '2px dotted var(--border-color)', paddingTop: '4rem' }}>
            <div className="container">
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>MORE_ABOUT_ME</h2>
                <div className="about-me-content">
                    <div className="about-me-text" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ marginBottom: '1.5rem' }}>{'>'} I am a passionate Computer Science student with a deep interest in Machine Learning, Deep Learning, and Computer Vision. My journey in technology began with curiosity and has evolved into a commitment to creating innovative solutions that make a difference.</p>

                        <p style={{ marginBottom: '1.5rem' }}>{'>'} Throughout my academic journey at Techno India University, I've worked on various projects ranging from computer vision applications to neural network implementations. My experience at <strong style={{ color: 'var(--accent-color)'}}>DRDO</strong> has given me valuable insights into real-world applications of AI and computer vision in defense technology.</p>

                        <p style={{ marginBottom: '1.5rem' }}>{'>'} I believe in continuous learning and staying updated with the latest technologies. When I'm not coding or working on ML projects, you can find me gaming, exploring new technologies, or contributing to open-source projects.</p>

                        <p style={{ marginBottom: '1.5rem' }}>{'>'} My goal is to leverage my skills in machine learning and computer vision to create solutions that have a positive impact on society, whether it's through medical AI applications, accessibility tools, or educational software.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoreAbout;
