import React from 'react';

const Experience = () => {
    return (
        <section id="experience" class="experience">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="experience-content">
                    <div className="experience-item">
                        <div className="experience-header">
                            <h3>Software Intern</h3>
                            <span className="company">DRDO Project Executive Lab, SSPL Delhi</span>
                            <span className="duration">Feb 2025 – May 2025</span>
                        </div>
                        <ul className="experience-details">
                            <li>Developed and integrated GUI components for a thermal sensor application using PyQt and OpenCV, incorporating video feed and controls.</li>
                            <li>Implemented simulation modules along with deep learning-based denoising models to enhance thermal image clarity.</li>
                            <li>Applied multiple video filters and upscaling techniques to convert low-bit thermal footage to higher-bit representations for improved visibility.</li>
                            <li>Engineered missile tracking functionality using computer vision and multithreaded processing to ensure real-time performance and responsiveness.</li>
                            <li>Collaborated with cross-functional teams to ensure alignment with project specifications and deadlines.</li>
                            <li>Tested and debugged software modules, significantly improving system reliability and robustness under simulated battlefield conditions.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
