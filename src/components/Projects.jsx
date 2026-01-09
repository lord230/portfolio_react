import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

const Projects = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const openModal = (id) => {
        setSelectedProjectId(id);
    };

    const closeModal = () => {
        setSelectedProjectId(null);
    };

    // Helper to render project cards to reduce repetition
    const renderProjectCard = (id, title, description, githubLink, demoLink = null) => (
        <div className="project-card" data-project={id}>
            <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
                <div className="project-links">
                    <a href={githubLink} target="_blank" className="project-link" rel="noreferrer">
                        <i className="fab fa-github"></i> GitHub
                    </a>
                    {demoLink && (
                        <a href={demoLink} target="_blank" className="project-link streamlit-link" rel="noreferrer">
                            <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    )}
                    <button className="project-info-btn" onClick={() => openModal(id)}>
                        <i className="fas fa-info-circle"></i> Info
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <section id="projects" className="projects">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {renderProjectCard(
                        'travel-planner',
                        'Travel Planner',
                        'Algorithm-based travel planner that optimizes routes and schedules for efficient trip management.',
                        'https://github.com/lord230/travel'
                    )}
                    {renderProjectCard(
                        'mandelbrot',
                        'Mandelbrot Set',
                        'Interactive Mandelbrot fractal visualization using Python and Tkinter/Matplotlib.',
                        'https://github.com/lord230/Mandelbrot'
                    )}
                    {renderProjectCard(
                        'sentiment',
                        'Sentiment Analysis',
                        'Machine learning model for analyzing text sentiment (positive, negative, neutral) with real-world applications in social media and reviews.',
                        'https://github.com/lord230/sentiment-analysis'
                    )}
                    {renderProjectCard(
                        'progress',
                        'Progress Tracker',
                        'Personal progress tracking and goal management system.',
                        'https://github.com/lord230/Progress'
                    )}
                    {renderProjectCard(
                        'sorting',
                        'Sorting Algorithm Visualizer',
                        'Animated multiple sorting algorithms using Tkinter and Streamlit for educational demonstration.',
                        'https://github.com/lord230/Sorting_visuals',
                        'https://sortingvisual.streamlit.app/'
                    )}
                    {renderProjectCard(
                        'timetable',
                        'Class Timetable Generator',
                        'An automated timetable generator using Python and Streamlit to create optimized schedules for classes.',
                        'https://github.com/lord230/auto-scheduling',
                        'https://class-c.streamlit.app/'
                    )}
                    {renderProjectCard(
                        'neural',
                        'Custom C++ Neural Network',
                        'From-scratch implementation of neural networks in C++.',
                        'https://github.com/lord230/custom_C-_Neural_network'
                    )}
                    {renderProjectCard(
                        'lan',
                        'LAN Transfer',
                        'Fast and secure file transfer application for local networks.',
                        'https://github.com/lord230/LAN-TRANSFER'
                    )}
                    {renderProjectCard(
                        'clipperboard',
                        'Clipperboard',
                        'Advanced clipboard management and text processing tool.',
                        'https://github.com/lord230/Clipperboard'
                    )}
                    {renderProjectCard(
                        'rock-paper-scissors',
                        'Flying Rock Paper Scissors',
                        'Flying rock paper scissors game made for Fun.',
                        'https://github.com/lord230/flying_rock_paper_scissors',
                        'https://lord230.github.io/flying_rock_paper_scissors/'
                    )}
                    {renderProjectCard(
                        'tumor',
                        'Brain Tumor Detection with GradCAM',
                        'Developed a Tkinter-based desktop application using PyTorch and a pre-trained DenseNet121 model to classify MRI brain scans into tumor types with GradCAM visualizations.',
                        'https://github.com/lord230/tumore_detection_v1'
                    )}
                    {renderProjectCard(
                        'mouse-gesture',
                        'Mouse Gesture Recognition',
                        'Advanced mouse gesture detection and command execution system.',
                        'https://github.com/lord230/Mouse_Gesture'
                    )}
                    {renderProjectCard(
                        'rotation',
                        'Point Rotation Visualizer',
                        'Interactive live rotation of points using trigonometric calculations (Tkinter).',
                        'https://github.com/lord230/Rotating_shapes'
                    )}
                    {renderProjectCard(
                        'weather',
                        'Weather App',
                        'Real-time weather application with beautiful UI and accurate forecasts.',
                        'https://github.com/lord230/Weather_app'
                    )}
                    {renderProjectCard(
                        'face-cursor',
                        'Face Cursor Movement',
                        'Control cursor movement using facial expressions and head tracking.',
                        'https://github.com/lord230/face_cursor_movement'
                    )}
                    {renderProjectCard(
                        'gesture',
                        'Gesture-based Cursor Control',
                        'Built a real-time hand tracking system using OpenCV to enable gesture-based control of the mouse cursor, especially for those with physical disabilities.',
                        'https://github.com/lord230/Hand-Gesture'
                    )}
                    {renderProjectCard(
                        'snake',
                        'Snake Game',
                        'Created a pathfinding game using HTML, CSS, and JavaScript.',
                        'https://github.com/lord230/snake_game',
                        'https://lord230.github.io/snake_game/'
                    )}
                    {renderProjectCard(
                        'life-number',
                        'Life Number',
                        'A fascinating project exploring numerical patterns and life calculations.',
                        'https://github.com/lord230/Lifenumber',
                        'https://lord230.github.io/Lifenumber/'
                    )}
                </div>
            </div>

            <ProjectModal projectId={selectedProjectId} onClose={closeModal} />
        </section>
    );
};

export default Projects;
