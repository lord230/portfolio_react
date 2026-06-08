import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectInfo } from '../data/projects';
import './ProjectDetailPage.css';
import AmazonMLArchitecture from '../components/AmazonMLArchitecture';
import SentimentFusionArchitecture from '../components/SentimentFusionArchitecture';
import TumorArchitecture from '../components/TumorArchitecture';

/* ── tiny icon map so we don't need Font Awesome for every badge ── */
const techColors = {
    Python: '#3776ab',
    PyTorch: '#ee4c2c',
    Tkinter: '#2e86de',
    'Medical Imaging': '#6c5ce7',
    GradCAM: '#a29bfe',
    NLTK: '#00b894',
    'Scikit-learn': '#f9ca24',
    Pandas: '#130754',
    'Logistic Regression': '#fdcb6e',
    SVM: '#e17055',
    DenseNet121: '#74b9ff',
    'Transfer Learning': '#fd79a8',
};

const getTechColor = (tech) => techColors[tech] || '#6c757d';

/* ── stat bar for results ── */
const AccuracyStat = ({ text }) => {
    const match = text.match(/([0-9.]+)%/);
    const pct = match ? parseFloat(match[1]) : null;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setWidth(pct ?? 0), 300);
        return () => clearTimeout(t);
    }, [pct]);

    if (!pct) return <p className="pdp-result-text">{text}</p>;

    return (
        <div className="pdp-stat-wrap">
            <p className="pdp-result-text">{text}</p>
            <div className="pdp-stat-bar-bg">
                <div
                    className="pdp-stat-bar-fill"
                    style={{ width: `${width}%` }}
                />
                <span className="pdp-stat-label">{pct}%</span>
            </div>
        </div>
    );
};

const ProjectDetailPage = () => {
    const { id } = useParams();
    const project = projectInfo[id];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!project) {
        return (
            <div className="pdp-not-found">
                <div className="pdp-not-found-inner">
                    <span className="pdp-404-emoji">🔍</span>
                    <h2>Project not found</h2>
                    <p>The project you're looking for doesn't exist or has been removed.</p>
                    <Link to="/" className="pdp-btn pdp-btn-primary">← Back to Home</Link>
                </div>
            </div>
        );
    }

    /* split results into sentences for bullet display */
    const resultLines = project.results
        ? project.results.split(/\.\s+/).filter(Boolean)
        : [];

    return (
        <div className="pdp-root">

            {/* ── HERO ── */}
            <div className="pdp-hero">
                <div className="pdp-hero-glow" />
                <div className="pdp-container">
                    <Link to="/" className="pdp-back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to Projects
                    </Link>

                    <div className="pdp-hero-body">
                        <div className="pdp-hero-text">
                            <div className="pdp-project-type">Featured Project</div>
                            <h1 className="pdp-title">{project.title}</h1>
                            <p className="pdp-subtitle">{project.shortDescription}</p>

                            <div className="pdp-tech-row">
                                {project.techStack?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="pdp-tech-chip"
                                        style={{ '--chip-color': getTechColor(tech) }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="pdp-cta-row">
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="pdp-btn pdp-btn-primary"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.087 2.91.831.092-.646.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.337-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                    View on GitHub
                                </a>
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="pdp-btn pdp-btn-secondary"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── ARCHITECTURE VISUALIZATIONS ── */}
            {id === 'smart-pricing' && (
                <div className="pdp-container" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
                    <AmazonMLArchitecture />
                </div>
            )}
            {id === 'sentiment' && (
                <div className="pdp-container" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
                    <SentimentFusionArchitecture />
                </div>
            )}
            {id === 'tumor' && (
                <div className="pdp-container" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
                    <TumorArchitecture />
                </div>
            )}

            {/* ── CONTENT ── */}
            <div className="pdp-container pdp-content">

                {/* Overview */}
                {(project.description || project.shortDescription) && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">📋</span> Overview
                        </div>
                        <div className="pdp-glass-card">
                            <p className="pdp-body-text">{project.description || project.shortDescription}</p>
                        </div>
                    </section>
                )}

                {/* Problem Statement */}
                {project.problemStatement && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">🎯</span> Problem Statement
                        </div>
                        <div className="pdp-glass-card pdp-card-problem">
                            <p className="pdp-body-text">{project.problemStatement}</p>
                        </div>
                    </section>
                )}

                {/* Approach */}
                {project.approach && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">🧠</span> Approach
                        </div>
                        <div className="pdp-glass-card pdp-card-approach">
                            <p className="pdp-body-text">{project.approach}</p>
                        </div>
                    </section>
                )}

                {/* Execution Steps — numbered cards */}
                {project.executionSteps && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">⚙️</span> Execution Breakdown
                        </div>
                        <div className="pdp-steps-grid">
                            {project.executionSteps.map((step, i) => (
                                <div key={i} className="pdp-step-card">
                                    <div className="pdp-step-num">{String(i + 1).padStart(2, '0')}</div>
                                    <div className="pdp-step-body">
                                        <h3 className="pdp-step-title">{step.title}</h3>
                                        <p className="pdp-step-desc">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Challenges & Solutions — two columns */}
                {(project.challenges || project.solutions) && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">⚡</span> Challenges &amp; Solutions
                        </div>
                        <div className="pdp-side-by-side">
                            {project.challenges && (
                                <div className="pdp-glass-card pdp-card-challenge">
                                    <div className="pdp-card-badge challenge-badge">Challenge</div>
                                    <p className="pdp-body-text">{project.challenges}</p>
                                </div>
                            )}
                            {project.solutions && (
                                <div className="pdp-glass-card pdp-card-solution">
                                    <div className="pdp-card-badge solution-badge">Solution</div>
                                    <p className="pdp-body-text">{project.solutions}</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Results */}
                {project.results && (
                    <section className="pdp-section">
                        <div className="pdp-section-label">
                            <span className="pdp-label-icon">🏆</span> Results
                        </div>
                        <div className="pdp-glass-card pdp-card-results">
                            {resultLines.map((line, i) => (
                                <AccuracyStat key={i} text={line.endsWith('.') ? line : line + '.'} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer nav */}
                <div className="pdp-footer-nav">
                    <Link to="/" className="pdp-btn pdp-btn-secondary">← Back to Projects</Link>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="pdp-btn pdp-btn-primary">
                        View Source Code
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
