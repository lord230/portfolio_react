import React from 'react';

const Research = () => {
    return (
        <section id="research" class="research">
            <div className="container">
                <h2 className="section-title">Research Projects</h2>
                <div className="research-grid">
                    <div className="research-card">
                        <div className="research-content">
                            <h3 className="research-title">AdaptiveSpatialNorm</h3>
                            <span className="research-date">Feb 2025</span>
                            <p className="research-description">Designed an adaptive spatial normalization method to dynamically normalize features in image data, enhancing model robustness and accuracy.</p>
                        </div>
                    </div>
                    <div className="research-card">
                        <div className="research-content">
                            <h3 className="research-title">Normalization Techniques Comparison</h3>
                            <span className="research-date">Mar 2025 - Jul 2025</span>
                            <p className="research-description">Conducted a comparative study of traditional and modern de-noising techniques for image enhancement. Results accepted for presentation at the International Conference on Smart Systems and Artificial Intelligence (ICSSAI 2025).</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Research;
