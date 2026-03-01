import React from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
    reverse: false,  // reverse the tilt direction
    max: 15,         // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective
    scale: 1.02,     // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,     // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit
    axis: null,      // What axis should be disabled. Can be X or Y.
    reset: true,     // If the tilt effect has to be reset on exit
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit
};

const MajorProjectCard = ({ project, id }) => {
    return (
        <Tilt options={defaultTiltOptions} className={`major-project-card ${id}-card magic-glow`} data-project={id}>
            <div className="project-visual-layer">
                <div className="abstract-shape">
                    {/* Placeholder for project-specific illustration logic */}
                    <i className={`fas fa-${id === 'smart-pricing' ? 'chart-line' : (id === 'tumor' ? 'brain' : 'comments')}`} style={{ fontSize: '5rem', color: 'var(--accent-color)' }}></i>
                </div>
            </div>
            <div className="major-project-content">
                <div className="major-project-header">
                    <h3 className="major-project-title">{project?.title}</h3>
                    <div className="tech-stack-container">
                        {project?.techStack?.map((tech, index) => (
                            <span key={index} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                </div>

                <p className="major-project-description">{project.shortDescription}</p>

                <div className="major-project-footer">
                    <div className="project-links">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" className="project-link" rel="noreferrer">
                                <i className="fab fa-github"></i> GitHub
                            </a>
                        )}
                        {project.demoLink && (
                            <a href={project.demoLink} target="_blank" className="project-link demo-link" rel="noreferrer">
                                <i className="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        )}
                    </div>

                    <Link to={`/project/${id}`} className="read-more-btn">
                        Read Case Study <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </Tilt>
    );
};

export default MajorProjectCard;
