export const projectInfo = {
    'life-number': {
        title: 'Life Number Calculator',
        description: 'A fascinating project exploring numerical patterns and life calculations based on numerology principles.',
        features: [
            'Interactive life number calculation based on birth date',
            'Personality analysis and characteristics',
            'Life path number interpretation',
            'Beautiful and intuitive user interface'
        ],
        techStack: ['Python', 'Streamlit', 'Numerology', 'Data Analysis'],
        challenges: 'Implementing accurate numerology algorithms and creating an engaging user experience.',
        solutions: 'Used mathematical formulas for life number calculations and Streamlit for a responsive web interface.'
    },
    'snake': {
        title: 'Snake Game',
        description: 'A classic snake game implementation with modern web technologies and enhanced gameplay features.',
        features: [
            'Classic snake gameplay mechanics',
            'Score tracking and high score system',
            'Responsive design for all devices',
            'Smooth animations and controls'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
        challenges: 'Implementing smooth snake movement and collision detection.',
        solutions: 'Used canvas for rendering and implemented efficient collision detection algorithms.'
    },
    'sorting': {
        title: 'Sorting Algorithm Visualizer',
        description: 'An educational tool that visualizes various sorting algorithms in real-time with step-by-step animations.',
        features: [
            'Multiple sorting algorithms (Bubble, Quick, Merge, etc.)',
            'Real-time visualization with adjustable speed',
            'Step-by-step algorithm explanation',
            'Performance comparison between algorithms'
        ],
        techStack: ['Python', 'Streamlit', 'Matplotlib', 'Algorithms'],
        challenges: 'Creating smooth animations and explaining complex algorithms visually.',
        solutions: 'Used Streamlit for the interface and implemented custom animation functions for each algorithm.'
    },
    'timetable': {
        title: 'Class Timetable Generator',
        description: 'An automated scheduling tool that generates conflict-free class timetables optimized for teachers and students.',
        features: [
            'Generates clash-free schedules automatically',
            'Custom input for subjects, teachers, and slots',
            'Optimizes class distribution and workload',
            'Exportable timetables for easy use'
        ],
        techStack: ['Python', 'Streamlit', 'Pandas', 'Algorithms'],
        challenges: 'Designing an algorithm that balances teacher availability, subject constraints, and time slots without conflicts.',
        solutions: 'Implemented constraint-based scheduling logic using Python and Pandas, integrated with Streamlit for an interactive interface.'
    },
    'rock-paper-scissors': {
        title: 'Flying Rock Paper Scissors',
        description: 'A browser-based simulation where rock, paper, and scissors emojis float around the screen, collide, and convert each other until one type dominates.',
        features: [
            'Floating rock, paper, and scissors entities',
            'Collision detection and battle resolution',
            'Dynamic statistics and percentage display',
            'Win detection with auto-restart',
            'Speed control (fast/slow) and restart button'
        ],
        techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
        challenges: 'Managing smooth animation and accurate collision detection for many entities.',
        solutions: 'Used Canvas for rendering, randomized velocities with boundary checks for natural floating motion, and simple distance-based collision logic to resolve fights.'
    },
    'gesture': {
        title: 'Gesture-based Cursor Control',
        description: 'A computer vision system that enables users to control their mouse cursor using hand gestures, designed especially for accessibility.',
        features: [
            'Real-time hand tracking and gesture recognition',
            'Customizable gesture mappings',
            'Smooth cursor movement',
            'Accessibility-focused design'
        ],
        techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Computer Vision'],
        challenges: 'Achieving accurate and responsive gesture recognition.',
        solutions: 'Implemented advanced hand tracking algorithms and optimized for real-time performance.'
    },
    'face-cursor': {
        title: 'Face Cursor Movement',
        description: 'A system that controls cursor movement using facial expressions and head tracking for hands-free computer interaction.',
        features: [
            'Facial landmark detection',
            'Head pose estimation',
            'Real-time cursor control',
            'Customizable sensitivity settings'
        ],
        techStack: ['Python', 'OpenCV', 'dlib', 'Facial Recognition'],
        challenges: 'Accurate head pose estimation and smooth cursor mapping.',
        solutions: 'Used dlib for facial landmark detection and implemented mathematical transformations for cursor mapping.'
    },
    'weather': {
        title: 'Weather Application',
        description: 'A comprehensive weather application that provides real-time weather data and forecasts with a beautiful user interface.',
        features: [
            'Real-time weather data from multiple APIs',
            '5-day weather forecast',
            'Location-based weather information',
            'Beautiful and responsive UI'
        ],
        techStack: ['Python', 'Weather API', 'HTML/CSS', 'JavaScript'],
        challenges: 'Integrating multiple weather APIs and creating an intuitive interface.',
        solutions: 'Used RESTful APIs for weather data and implemented a responsive design.'
    },
    'sspl': {
        title: 'SSPL Image/Video Filter App',
        description: 'A comprehensive PyQt application developed for DRDO with advanced image and video processing capabilities.',
        features: [
            'Advanced image and video filtering',
            'Deep learning-based denoising',
            'Pattern recognition algorithms',
            'Professional GUI interface'
        ],
        techStack: ['Python', 'PyQt', 'OpenCV', 'MATLAB', 'PyTorch'],
        challenges: 'Integrating multiple technologies and ensuring real-time performance.',
        solutions: 'Used multithreading for performance and modular architecture for maintainability.'
    },
    'rotation': {
        title: 'Point Rotation Visualizer',
        description: 'An interactive tool that demonstrates mathematical concepts of point rotation using trigonometric calculations.',
        features: [
            'Interactive point manipulation',
            'Real-time rotation calculations',
            'Mathematical formula display',
            'Educational visualizations'
        ],
        techStack: ['Python', 'Tkinter', 'Mathematics', 'Trigonometry'],
        challenges: 'Implementing smooth animations and accurate mathematical calculations.',
        solutions: 'Used Tkinter for the interface and implemented precise trigonometric functions.'
    },
    'mouse-gesture': {
        title: 'Mouse Gesture Recognition',
        description: 'An advanced system that recognizes mouse gestures and executes corresponding commands for enhanced productivity.',
        features: [
            'Custom gesture recognition',
            'Command execution system',
            'Gesture learning capabilities',
            'Productivity enhancement tools'
        ],
        techStack: ['Python', 'Computer Vision', 'Gesture Recognition', 'Automation'],
        challenges: 'Accurate gesture recognition and command mapping.',
        solutions: 'Implemented machine learning algorithms for gesture classification.'
    },
    'tumor': {
        title: 'Brain Tumor Detection with GradCAM',
        description: 'A medical AI application that classifies brain MRI scans and provides visual explanations using GradCAM technology.',
        features: [
            'Brain tumor classification (Glioma, Meningioma, Pituitary, No Tumor)',
            'GradCAM and GradCAM++ visualizations',
            'Pre-trained DenseNet121 model',
            'Medical-grade accuracy'
        ],
        techStack: ['Python', 'PyTorch', 'Tkinter', 'Medical Imaging', 'GradCAM'],
        challenges: 'Achieving high accuracy in medical diagnosis and implementing explainable AI.',
        solutions: 'Used transfer learning with DenseNet121 and implemented GradCAM for model interpretability.'
    },
    'clipperboard': {
        title: 'Clipperboard',
        description: 'An advanced clipboard management tool that enhances text processing and productivity.',
        features: [
            'Advanced clipboard management',
            'Text processing capabilities',
            'Multiple clipboard support',
            'Productivity tools'
        ],
        techStack: ['Python', 'Clipboard Management', 'Text Processing'],
        challenges: 'Efficient clipboard handling and text processing.',
        solutions: 'Implemented optimized algorithms for clipboard operations.'
    },
    'lan': {
        title: 'LAN Transfer',
        description: 'A fast and secure file transfer application designed for local network environments.',
        features: [
            'High-speed file transfer',
            'Secure data transmission',
            'Network discovery',
            'Cross-platform compatibility'
        ],
        techStack: ['Python', 'Networking', 'File Transfer', 'Security'],
        challenges: 'Ensuring fast and secure file transfer over local networks.',
        solutions: 'Implemented efficient networking protocols and encryption.'
    },
    'neural': {
        title: 'Custom C++ Neural Network',
        description: 'A from-scratch implementation of neural networks in C++ for educational and research purposes.',
        features: [
            'Complete neural network implementation',
            'Backpropagation algorithm',
            'Multiple layer support',
            'Educational codebase'
        ],
        techStack: ['C++', 'Neural Networks', 'Machine Learning', 'Mathematics'],
        challenges: 'Implementing complex neural network algorithms from scratch.',
        solutions: 'Used efficient C++ programming and mathematical optimization.'
    },
    'progress': {
        title: 'Progress Tracker',
        description: 'A personal progress tracking and goal management system for personal development.',
        features: [
            'Goal setting and tracking',
            'Progress visualization',
            'Personal development tools',
            'Data analytics'
        ],
        techStack: ['Python', 'Data Analysis', 'Visualization', 'Productivity'],
        challenges: 'Creating an intuitive interface for progress tracking.',
        solutions: 'Implemented user-friendly design and comprehensive analytics.'
    },
    'travel-planner': {
        title: 'Travel Planner',
        description: 'An algorithm-based travel planning tool that optimizes routes, time, and costs for efficient trip management.',
        features: [
            'Optimized travel route generation',
            'Customizable trip preferences',
            'Time and cost efficiency algorithms',
            'Interactive and user-friendly interface'
        ],
        techStack: ['Python', 'Algorithms', 'Streamlit', 'Graph Theory'],
        challenges: 'Balancing user preferences with algorithm efficiency.',
        solutions: 'Implemented graph-based optimization algorithms and allowed user input customization for flexibility.'
    },
    'mandelbrot': {
        title: 'Mandelbrot Set',
        description: 'A visualization of the Mandelbrot fractal with interactive zooming and coloring features.',
        features: [
            'Real-time fractal generation',
            'Interactive zoom and pan',
            'Customizable color schemes',
            'Efficient rendering for large zoom depths'
        ],
        techStack: ['Python', 'Tkinter', 'Matplotlib', 'Complex Numbers'],
        challenges: 'Efficiently rendering fractals with high zoom levels without performance issues.',
        solutions: 'Optimized the rendering loop and used escape-time algorithms for faster calculations.'
    },
    'sentiment': {
        title: 'Sentiment Analysis',
        description: 'A machine learning model that classifies text sentiment (positive, negative, neutral) with applications in reviews and social media.',
        features: [
            'Real-time sentiment classification',
            'Supports custom text input',
            'Visualization of sentiment distribution',
            'Trained on diverse datasets'
        ],
        techStack: ['Python', 'NLTK', 'Scikit-learn', 'Pandas'],
        challenges: 'Achieving high accuracy with imbalanced datasets.',
        solutions: 'Applied preprocessing, balanced datasets, and ensemble methods for robust sentiment classification.'
    }
};
