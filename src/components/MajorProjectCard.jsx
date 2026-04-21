import React from 'react';
import { Link } from 'react-router-dom';
import PixelCard from './PixelCard';

const MajorProjectCard = ({ project, id }) => {
    return (
        <PixelCard isMajor={true} className={`major-project-card ${id}-card`}>
            <div className="project-visual-layer">
                <div className="abstract-shape">
                    {/* Placeholder for project-specific illustration logic */}
                    <i className={`fas fa-${id === 'smart-pricing' ? 'chart-line' : (id === 'tumor' ? 'brain' : 'comments')}`} style={{ fontSize: '5rem', color: 'var(--accent-color)' }}></i>
                </div>
            </div>
            <div className="major-project-content" style={{ fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="major-project-header">
                    <h3 className="major-project-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1rem', textShadow: '2px 2px 0px var(--accent-color)', wordBreak: 'break-word', overflowWrap: 'break-word'}}>{project?.title}</h3>
                    <div className="tech-stack-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {project?.techStack?.map((tech, index) => (
                            <span key={index} className="tech-badge" style={{ backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border-color)', padding: '0.2rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{tech}</span>
                        ))}
                    </div>
                </div>

                <p className="major-project-description" style={{ color: 'var(--text-secondary)' }}>{project.shortDescription}</p>

                <div className="major-project-footer" style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="project-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" className="project-link" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                                <i className="fab fa-github"></i> GitHub
                            </a>
                        )}
                        {project.demoLink && (
                            <a href={project.demoLink} target="_blank" className="project-link demo-link" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                                <i className="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        )}
                    </div>

                    <Link to={`/project/${id}`} className="read-more-btn" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.5rem 1rem', textDecoration: 'none', border: '2px solid var(--border-color)', fontFamily: 'var(--font-serif)', fontSize: '0.7rem' }}>
                        Read Case Study {'>'}
                    </Link>
                </div>
            </div>
        </PixelCard>
    );
};

export default MajorProjectCard;
