import React, { useState } from 'react';
import { majorProjects, exploratoryProjects } from '../data/projects';
import MajorProjectCard from './MajorProjectCard';
import ExploratoryProjectCard from './ExploratoryProjectCard';
import ProjectModal from './ProjectModal';
import CodingProfiles from './CodingProfiles';
import { motion } from 'framer-motion';

const Projects = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const openModal = (id) => {
        setSelectedProjectId(id);
    };

    const closeModal = () => {
        setSelectedProjectId(null);
    };

    // Extract unique tags and create filter options
    const allTags = ['All', ...new Set(Object.values(exploratoryProjects).flatMap(p => p.techStack || []))];

    // Filter the projects based on the active tag
    const filteredExploratoryProjects = Object.entries(exploratoryProjects).filter(([id, project]) => {
        if (activeFilter === 'All') return true;
        return project.techStack?.includes(activeFilter);
    });

    return (
        <section id="projects" className="projects-section">
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '3rem' }}>PROJECTS</h2>

                {/* Major Projects Section */}
                <div className="projects-category major-category">
                    <h3 className="category-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '2rem' }}><i className="fas fa-star" style={{ color: 'var(--accent-color)'}}></i> MAJOR_</h3>
                    <div className="major-projects-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {Object.entries(majorProjects).map(([id, project]) => (
                            <MajorProjectCard
                                key={id}
                                id={id}
                                project={project}
                                onOpenModal={openModal}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Coding Profiles (between major & exploratory) ── */}
                <CodingProfiles />

                {/* Exploratory Projects Section */}
                <div className="projects-category exploratory-category" style={{ marginTop: '4rem' }}>
                    <h3 className="category-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1rem' }}><i className="fas fa-flask" style={{ color: 'var(--secondary-accent)'}}></i> EXPLORATORY_</h3>
                    <p className="category-description" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{'>'} side_quests && experiments</p>

                    {/* Tag Filter */}
                    <div className="project-filters" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                style={{
                                    padding: '0.4rem 1.2rem',
                                    border: '2px solid var(--border-color)',
                                    background: activeFilter === tag ? 'var(--text-primary)' : 'var(--bg-primary)',
                                    color: activeFilter === tag ? 'var(--bg-primary)' : 'var(--text-primary)',
                                    cursor: 'none',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    boxShadow: activeFilter === tag ? 'none' : '4px 4px 0px var(--accent-color)',
                                    transform: activeFilter === tag ? 'translate(4px, 4px)' : 'none',
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="exploratory-projects-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {filteredExploratoryProjects.map(([id, project]) => (
                            <ExploratoryProjectCard
                                key={id}
                                id={id}
                                project={project}
                                onOpenModal={openModal}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <ProjectModal projectId={selectedProjectId} onClose={closeModal} />
        </section>
    );
};

export default Projects;
