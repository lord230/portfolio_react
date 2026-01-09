import React, { useEffect } from 'react';
import { projectInfo } from '../data/projects';

const ProjectModal = ({ projectId, onClose }) => {
    const project = projectInfo[projectId];

    useEffect(() => {
        if (projectId) {
            document.body.style.overflow = 'hidden';

            // Close on escape key
            const handleEsc = (e) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'auto';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [projectId, onClose]);

    if (!projectId || !project) return null;

    return (
        <div id="projectModal" className="modal" style={{ display: 'block' }} onClick={(e) => {
            if (e.target.className === 'modal') onClose();
        }}>
            <div className="modal-content">
                <div id="modalContent">
                    <div className="modal-header">
                        <h2 className="modal-title">{project.title}</h2>
                        <button className="close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-left">
                            <div className="modal-section">
                                <h3>Project Overview</h3>
                                <p className="modal-description">{project.description}</p>
                            </div>

                            <div className="modal-section">
                                <h3>Key Features</h3>
                                <ul>
                                    {project.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="modal-right">
                            <div className="modal-section">
                                <h3>Technology Stack</h3>
                                <div className="tech-stack">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-section">
                                <h3>Challenges & Solutions</h3>
                                <p><strong>Challenges:</strong></p>
                                <p>{project.challenges}</p>
                                <br />
                                <p><strong>Solutions:</strong></p>
                                <p>{project.solutions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
