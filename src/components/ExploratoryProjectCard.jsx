import React from 'react';
import PixelCard from './PixelCard';
import PixelButton from './PixelButton';

const ExploratoryProjectCard = ({ project, id, onOpenModal }) => {
    return (
        <PixelCard isMajor={false} className="exploratory-project-card">
            <div className="exploratory-header" style={{ marginBottom: '1rem' }}>
                <h3 className="exploratory-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project?.title}</h3>
                <span className="exploratory-domain" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>{project?.domain}</span>
            </div>

            <div className="exploratory-body" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                <p className="learning-label" style={{ fontWeight: 'bold' }}>{'>'} What I Learned:</p>
                <p className="learning-text" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{project?.whatILearned}</p>

                <div className="key-concepts" style={{ marginBottom: '1rem' }}>
                    <i className="fas fa-lightbulb" title="Key Concepts" style={{ color: 'var(--accent-color)' }}></i>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>{project?.keyConcepts}</span>
                </div>

                {project?.techStack && (
                    <div className="exploratory-tech-stack" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {project.techStack.map((tech, index) => (
                            <span key={index} className="tech-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{tech}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="exploratory-footer" style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <PixelButton onClick={() => onOpenModal(id)} isPrimary={false} style={{ fontSize: '0.7rem' }}>
                    Read Story
                </PixelButton>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" className="icon-link" title="Code" rel="noreferrer" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                            <i className="fab fa-github"></i>
                        </a>
                    )}
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" className="icon-link" title="Demo" rel="noreferrer" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    )}
                </div>
            </div>
        </PixelCard>
    );
};

export default ExploratoryProjectCard;
