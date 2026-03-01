import React from 'react';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
    reverse: false,
    max: 10,
    perspective: 1000,
    scale: 1.01,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
};

const ExploratoryProjectCard = ({ project, id, onOpenModal }) => {
    return (
        <Tilt options={defaultTiltOptions} className="exploratory-project-card magic-glow">
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

                {project?.techStack && (
                    <div className="exploratory-tech-stack" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {project.techStack.map((tech, index) => (
                            <span key={index} className="tech-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(10, 10, 10, 0.5)', color: 'var(--text-color)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px' }}>{tech}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="exploratory-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    className="read-story-btn"
                    onClick={() => onOpenModal(id)}
                    style={{
                        background: 'linear-gradient(135deg, var(--primary-color), #2a5298)',
                        border: 'none',
                        color: '#fff',
                        padding: '0.5rem 1.2rem',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; }}
                >
                    <i className="fas fa-book-open"></i> Read Story
                </button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" className="icon-link" title="Code" rel="noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    )}
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" className="icon-link" title="Demo" rel="noreferrer">
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    )}
                </div>
            </div>
        </Tilt>
    );
};

export default ExploratoryProjectCard;
