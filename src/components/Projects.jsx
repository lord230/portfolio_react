import React, { useState } from 'react';
import { majorProjects, exploratoryProjects } from '../data/projects';
import MajorProjectCard from './MajorProjectCard';
import ExploratoryProjectCard from './ExploratoryProjectCard';
import ProjectModal from './ProjectModal';
import CodingProfiles from './CodingProfiles';

const Projects = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const openModal = (id) => {
        setSelectedProjectId(id);
    };

    const closeModal = () => {
        setSelectedProjectId(null);
    };

    return (
        <section id="projects" className="projects-section">
            <div className="container">
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
                    <div className="exploratory-projects-grid">
                        {Object.entries(exploratoryProjects).map(([id, project]) => (
                            <ExploratoryProjectCard
                                key={id}
                                id={id}
                                project={project}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ProjectModal projectId={selectedProjectId} onClose={closeModal} />
        </section>
    );
};

export default Projects;
