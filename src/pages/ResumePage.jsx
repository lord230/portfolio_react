import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PixelButton from '../components/PixelButton';
import './ResumePage.css';

const ResumePage = () => {
    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="resume-page">
            <div className="resume-container">
                {/* Header Controls */}
                <div className="resume-header-row">
                    <h1 className="resume-title">RESUME_</h1>
                    <div className="resume-actions">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <PixelButton isPrimary={false}>
                                Back to Home
                            </PixelButton>
                        </Link>
                        <a href="/Resume_AV.pdf" download="Amit_Verma_Resume.pdf" style={{ textDecoration: 'none' }}>
                            <PixelButton isPrimary={true}>
                                Download PDF
                            </PixelButton>
                        </a>
                    </div>
                </div>

                {/* Retro Window displaying the Resume */}
                <div className="resume-window">
                    <div className="resume-window-header">
                        <div className="resume-window-title">AMIT_VERMA_CV.EXE</div>
                        <div className="resume-window-controls">
                            <span className="window-btn-mock"></span>
                            <span className="window-btn-mock" style={{ marginLeft: '4px' }}></span>
                            <span className="window-btn-mock" style={{ marginLeft: '4px', backgroundColor: 'var(--accent-color)' }}></span>
                        </div>
                    </div>
                    <div className="resume-viewer-container">
                        <iframe
                            src="/Resume_AV.pdf#toolbar=0&navpanes=0"
                            title="Amit Verma Resume"
                            className="resume-iframe"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;
