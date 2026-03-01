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
                <h2 className="section-title">Projects</h2>

                {/* Major Projects Section */}
                <div className="projects-category major-category">
                    <h3 className="category-title"><i className="fas fa-star"></i> Major Projects</h3>
                    <div className="major-projects-grid">
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
                <div className="projects-category exploratory-category">
                    <h3 className="category-title"><i className="fas fa-flask"></i> Exploratory & Fun Projects</h3>
                    <p className="category-description">Coding experiments and learning adventures.</p>

                    {/* Tag Filter */}
                    <div className="project-filters" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                style={{
                                    padding: '0.4rem 1.2rem',
                                    borderRadius: '25px',
                                    border: '1px solid var(--primary-color)',
                                    background: activeFilter === tag ? 'var(--primary-color)' : 'transparent',
                                    color: activeFilter === tag ? '#fff' : 'var(--text-color)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem',
                                    fontWeight: activeFilter === tag ? '600' : '400'
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="exploratory-projects-grid">
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
