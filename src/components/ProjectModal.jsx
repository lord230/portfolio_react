import React, { useEffect, useRef } from 'react';
import { projectInfo } from '../data/projects';

const ProjectModal = ({ projectId, onClose }) => {
    const modalRef = useRef();
    const project = projectInfo[projectId];

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (projectId) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [projectId, onClose]);

    if (!projectId || !project) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <h2 className="modal-title">{project.title}</h2>

                {/* Tech Stack Badge */}
                {project.techStack && (
                    <div className="modal-tech-stack">
                        {project.techStack.map((tech, index) => (
                            <span key={index} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                )}

                <div className="modal-body">
                    {/* Backstory & Idea for Exploratory Projects */}
                    {project.idea && (
                        <div className="modal-section premium-card idea-card">
                            <h3 className="section-header"><i className="fas fa-lightbulb"></i> The Idea</h3>
                            <p>{project.idea}</p>
                        </div>
                    )}

                    {project.backstory && (
                        <div className="modal-section premium-card backstory-card">
                            <h3 className="section-header"><i className="fas fa-user-graduate"></i> Student Backstory</h3>
                            <p className="italic-text">"{project.backstory}"</p>
                        </div>
                    )}

                    {project.maths && (
                        <div className="modal-section premium-card math-card">
                            <h3 className="section-header"><i className="fas fa-square-root-alt"></i> The Math Behind It</h3>
                            <p className="mono-text">{project.maths}</p>
                        </div>
                    )}

                    {/* Problem Statement & Approach - Mainly for Major Projects */}
                    {project.problemStatement && (
                        <div className="modal-section premium-card problem-card">
                            <h3 className="section-header"><i className="fas fa-exclamation-circle"></i> Problem Statement</h3>
                            <p>{project.problemStatement}</p>
                        </div>
                    )}

                    {project.approach && (
                        <div className="modal-section premium-card approach-card">
                            <h3 className="section-header"><i className="fas fa-brain"></i> My Approach</h3>
                            <p>{project.approach}</p>
                        </div>
                    )}

                    {/* Execution Steps - Accordion Style */}
                    {project.executionSteps && (
                        <div className="modal-section premium-card execution-card">
                            <h3 className="section-header"><i className="fas fa-cogs"></i> Execution Breakdown</h3>
                            <div className="execution-steps">
                                {project.executionSteps.map((step, index) => (
                                    <div key={index} className="execution-step">
                                        <details>
                                            <summary>
                                                <span className="step-number">{index + 1}</span>
                                                {step.title}
                                                <i className="fas fa-chevron-down arrow"></i>
                                            </summary>
                                            <div className="step-content">
                                                <p>{step.description}</p>
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Challenges & Solutions */}
                    {project.challenges && (
                        <div className="modal-section premium-card challenges-card">
                            <h3 className="section-header"><i className="fas fa-mountain"></i> Challenges & Solutions</h3>
                            <p><strong>Challenge:</strong> {project.challenges}</p>
                            {project.solutions && <p><strong>Solution:</strong> {project.solutions}</p>}
                        </div>
                    )}

                    {/* Results - For Major Projects */}
                    {project.results && (
                        <div className="modal-section premium-card results-card">
                            <h3 className="section-header"><i className="fas fa-chart-line"></i> Results</h3>
                            <p>{project.results}</p>
                        </div>
                    )}

                    {/* Legacy Description Fallback if new fields aren't there */}
                    {!project.problemStatement && project.description && !project.idea && (
                        <div className="modal-section premium-card description-card">
                            <h3 className="section-header"><i className="fas fa-info-circle"></i> Description</h3>
                            <p>{project.description}</p>
                        </div>
                    )}

                    {/* Legacy Features Fallback */}
                    {project.features && (
                        <div className="modal-section premium-card features-card">
                            <h3 className="section-header"><i className="fas fa-star"></i> Key Features</h3>
                            <ul className="modal-features-list">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

                <div className="modal-footer">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" className="btn btn-primary" rel="noreferrer">
                            <i className="fab fa-github"></i> View Code
                        </a>
                    )}
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" className="btn btn-secondary" rel="noreferrer">
                            <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
