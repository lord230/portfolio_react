import React from 'react';
import { Link } from 'react-router-dom';

const MajorProjectCard = ({ project, id }) => {
    return (
        <div className="major-project-card" data-project={id}>
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
                        <a href={project.githubLink} target="_blank" className="project-link" rel="noreferrer">
                            <i className="fab fa-github"></i> GitHub
                        </a>
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
        </div>
    );
};

export default MajorProjectCard;
