import React from 'react';

const ExploratoryProjectCard = ({ project, id }) => {
    return (
        <div className="exploratory-project-card">
            <div className="exploratory-header">
                <h3 className="exploratory-title">{project?.title}</h3>
                <span className="exploratory-domain">{project?.domain}</span>
            </div>

            <div className="exploratory-body">
                <p className="learning-label">What I Learned:</p>
                <p className="learning-text">{project?.whatILearned}</p>

                <div className="key-concepts">
                    <i className="fas fa-lightbulb" title="Key Concepts"></i>
                    <span>{project?.keyConcepts}</span>
                </div>
            </div>

            <div className="exploratory-footer">
                <a href={project.githubLink} target="_blank" className="icon-link" title="Code" rel="noreferrer">
                    <i className="fab fa-github"></i>
                </a>
                {project.demoLink && (
                    <a href={project.demoLink} target="_blank" className="icon-link" title="Demo" rel="noreferrer">
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ExploratoryProjectCard;
