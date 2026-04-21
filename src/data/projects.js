export const majorProjects = {
    'smart-pricing': {
        title: 'Amazon ML Challenge 2025: Smart Product Pricing Solution',
        shortDescription: 'An end-to-end multi-modal deep learning framework designed to predict product prices from textual descriptions and images.',
        description: 'An end-to-end multi-modal deep learning framework designed to predict product prices from textual descriptions and images. This project achieves robust price prediction by fusing semantic text embeddings from a Transformer with visual features from a Convolutional Neural Network.',
        techStack: ['Python', 'PyTorch', 'Transformers', 'EfficientNet-B0', 'MiniLM', 'Deep Learning'],
        problemStatement: 'Predicting product prices from textual descriptions and images natively handling highly skewed price distributions.',
        approach: 'The model (MiniLMEfficientNetModel) uses a dual-branch architecture. A Text Branch (MiniLM-L6-H384-uncased) encodes the product catalog content. An Image Branch (EfficientNet-B0 pretrained on ImageNet) extracts visual features from images. Both embeddings are projected to 256 dimensions, concatenated, and passed through a 3-layer MLP.',
        executionSteps: [
            {
                title: 'Multi-modal Fusion',
                description: 'Leverages both text and image data for accurate price prediction through a robust fusion head.'
            },
            {
                title: 'Log-Price Target',
                description: 'Predicts the log1p of the price to handle the highly skewed price distribution natively.'
            },
            {
                title: 'Mixed Precision & Learning Rates',
                description: 'Uses FP16 AutoCast for fast training and fine-tuned encoder pathways with separate learning rates for the text model, image model, and fusion head.'
            },
            {
                title: 'Dynamic Image Processing',
                description: 'Missing images are smoothly downloaded and processed during dataset instantiation dynamically.'
            }
        ],
        challenges: 'Skewed price distributions leading to outlier dominance, metric misalignment, and efficiently dealing with missing product images.',
        solutions: 'Applied log1p transformations, differential learning rates, and implemented on-the-fly image downloading during dataset instantiation dynamically.',
        results: 'Validation SMAPE: 20.68%, Training SMAPE: 18.59%. Loss Function: Smooth L1 Loss (with Differentiable SMAPE optimization).',
        githubLink: 'https://github.com/lord230/Amazon-ML',
        demoLink: null
    },
    'tumor': {
        title: 'Tumor Grad-CAM Classification',
        shortDescription: 'An advanced Hybrid Neural Network combining CNNs and Transformers to classify brain MRI scans with explicit Grad-CAM mappings.',
        description: 'This repository hosts an advanced Hybrid Neural Network designed for classifying brain classification variants utilizing Magnetic Resonance Imaging (MRI). By combining the spatial extraction reasoning inherent to Convolutional Neural Networks with the global context logic of Transformers, the model operates securely to output predictions confirmed utilizing explicit Grad-CAM mappings per case.',
        techStack: ['PyTorch', 'EfficientNet-B0', 'Swin Transformer', 'Grad-CAM', 'Tkinter', 'Medical Imaging'],
        problemStatement: 'Testing the accuracy variables demands broad and precise initial definitions minimizing data pooling contamination across more than 10,000 distinct samples, accurately classifying brain tumor variants.',
        approach: 'The structural foundation deploys multiple branches: A CNN Sub-Network (EfficientNet-B0) parsing hierarchical layers and a Transformer Sub-Network (Swin-Tiny) generating structural continuity. They are fused using a Channel Attention filter to align significance per component. Class selection directly references learnable vectors using a Prototype Memory Head.',
        executionSteps: [
            {
                title: 'CNN Sub-Network',
                description: 'Utilizes PyTorch\'s EfficientNet-B0 design template parsing hierarchical layers identifying defining edges, shapes, and features from the local scan context arrays.'
            },
            {
                title: 'Transformer Sub-Network',
                description: 'Incorporates Swin-Tiny mechanisms generating structural continuity across separated components of any given volume through critical self-attention systems.'
            },
            {
                title: 'Channel Attention Fusion Element',
                description: 'A structured Channel Attention filter mechanism aligns significance per component to effectively integrate vectors retaining significant variables and shedding artifact features.'
            },
            {
                title: 'Prototype Memory Head & GUI',
                description: 'Class selection directly references learnable vectors against a configurable temperature gradient via Cosine similarity. An interactive GUI platform provides direct analytical control allowing transparent evaluation.'
            }
        ],
        challenges: 'Limiting overfitting, effectively integrating CNN spatial features with Transformer global context, and securely confirming predictions for clinical trustworthiness.',
        solutions: 'Deployed multiple branches and a structured Channel Attention filter mechanism. Introduced an interactive GUI adjusting blend configurations to evaluate transparent Grad-CAM activation outputs directly.',
        results: 'Raw Accuracy Base: 99.03%, Precision Index (Macro): 98.84%, Recall Index (Macro): 98.95%, Integrated ROC AUC Index: 0.9986. Specific accuracies: Glioma (99.58%), Meningioma (98.04%), No Tumor (99.75%), Pituitary (98.43%).',
        githubLink: 'https://github.com/lord230/Tumor-GradCam',
        demoLink: null
    },
    'sentiment': {
        title: 'Sentiment Fusion',
        shortDescription: 'An advanced sentiment analysis and emotion detection system powered by state-of-the-art transformer models and Vector Databases.',
        description: 'Sentiment Fusion is an advanced sentiment analysis and emotion detection system powered by state-of-the-art transformer models and Vector Databases. It robustly captures nuances in text, such as sarcasm and mixed emotions, to deliver highly accurate and nuanced sentiment predictions.',
        techStack: ['Python', 'Transformers', 'FAISS', 'Vector Databases', 'PyTorch'],
        problemStatement: 'Providing rich, nuanced emotional context beyond simple Positive/Negative/Neutral classifications and handling complex textual nuances like sarcasm.',
        approach: 'The core models include SarcasmAwareSentimentTransformer and Robust_SentimentModel, built on top of xlm-roberta-base. The architecture incorporates a distinct sarcasm-detection head. To provide rich context, the system employs a FAISS Vector Database during inference.',
        executionSteps: [
            {
                title: 'Sarcasm-Aware Modeling',
                description: 'The probability of sarcasm modulates the primary [CLS] token via a dedicated gating mechanism (gate_proj), explicitly accounting for sarcastic tone when deriving the final sentiment logits.'
            },
            {
                title: 'Vector Context Extraction',
                description: 'Extracts a rich 1540-dimensional context vector consisting of the [CLS] token, mean-pooled sequence embeddings, and scaled sentiment/sarcasm probabilities.'
            },
            {
                title: 'FAISS Vector Indexing',
                description: 'The FAISS database is partitioned into three polarity-specific sub-indexes (positive, negative, neutral) for efficient retrieval.'
            },
            {
                title: 'Nuanced Emotion Retrieval',
                description: 'Routes the query vector to the matching sub-index to perform a nearest-neighbor search, retrieving the closest emotions and intensities (e.g., "Mild Joy", "Moderate Sarcasm").'
            }
        ],
        challenges: 'Capturing nuances like sarcasm and retrieving precise, nuanced emotions natively instead of basic broad polarity assignments.',
        solutions: 'Incorporated a distinct sarcasm-detection head and a gating mechanism. Used a FAISS Vector Database to perform nearest-neighbor searches mapping primary sentiment predictions to rich emotional profiles.',
        results: 'Validation Loss reached ~0.2284 by Epoch 15 showing robust convergence. Peak Performance (Epoch 14-17): Sentiment Accuracy ~94.40%, Sarcasm Accuracy ~75.95%, Overall Score ~0.8866.',
        githubLink: 'https://github.com/lord230/Sentiment_',
        demoLink: null
    }
};

export const exploratoryProjects = {
    'aimlverse': {
        title: 'AI ML Verse',
        description: 'An interactive online lab converting abstract AI math and models into visual, hands-on browser simulations.',
        domain: 'AI Education & Visualizations',
        whatILearned: 'Learned to translate complex AI math into interactive visual modules using React and Next.js.',
        keyConcepts: 'Machine Learning, Transformers, Data Visualization',
        githubLink: null,
        demoLink: 'https://www.aimlverse.in',
        techStack: ['Web Logic', 'Machine Learning'],
        idea: 'Build a platform that makes AI models visual and interactive, replacing boring static textbook diagrams.',
        backstory: 'I was tired of staring at Greek letters in ML textbooks pretending to understand them. So I built this to actually see what the math was doing. Turns out, visualizing self-attention is way cooler than reading about it!'
    },
    'life-number': {
        title: 'Life Number Calculator',
        description: 'A fascinating numerology app to calculate and check your Bhagyank and Moolank based on numerical patterns.',
        domain: 'Numerology & Algorithms',
        whatILearned: 'Learned how to implement mathematical logic into a user-friendly web interface using Streamlit.',
        keyConcepts: 'Algorithmic Logic, User Input Handling, Streamlit UI',
        githubLink: 'https://github.com/lord230/Lifenumber',
        demoLink: 'https://lord230.github.io/Lifenumber/',
        techStack: ['Maths Based', 'Web Logic'],
        idea: 'Translate traditional numerology (Bhagyank/Moolank) algorithms into a slick Python web app.',
        backstory: 'My relatives kept asking me about numerology and destiny. Instead of arguing about it, I wrote a Python script and hosted it as a GitHub webpage to calculate it for them automatically. Tech-support son level up!',
        maths: 'Digit sum operations (equivalent to modulo 9 arithmetic) to iteratively reduce dates and names into single fundamental digits.'
    },
    'snake': {
        title: 'Snake Game',
        description: 'A classic snake game implementation with modern web technologies and enhanced gameplay features.',
        domain: 'Game Development',
        whatILearned: 'Mastered the HTML5 Canvas API and game loop mechanics (updating state, rendering).',
        keyConcepts: 'Canvas API, Game Loops, Collision Detection',
        githubLink: 'https://github.com/lord230/snake_game',
        demoLink: 'https://lord230.github.io/snake_game/',
        techStack: ['Web Logic'],
        idea: 'Recreate the nostalgic Nokia Snake game mechanics entirely in the browser using HTML5 Canvas.',
        backstory: 'Because you can\'t call yourself a real CS student without building Snake at least once. I also highly utilized this to procrastinate on actual university assignments.'
    },
    'sorting': {
        title: 'Sorting Algorithm Visualizer',
        description: 'An educational tool that visualizes various sorting algorithms in real-time with step-by-step animations.',
        domain: 'Algorithms & Education',
        whatILearned: 'Deepened understanding of sorting algorithms by visualizing their step-by-step execution.',
        keyConcepts: 'Algorithm Complexity, State Management, Animation',
        githubLink: 'https://github.com/lord230/Sorting_visuals',
        demoLink: 'https://sortingvisual.streamlit.app/',
        techStack: ['Maths Based', 'Web Logic'],
        idea: 'Map array values to bar heights and animate swapping operations to visualize time complexity.',
        backstory: 'Watching arrays sort themselves is oddly therapeutic. Plus, I needed visual proof that Bubble Sort really is as terrible as my professors claimed it was.',
        maths: 'Algorithmic time and space complexities ranging from O(N log N) to O(N²), visualized through iterative index comparisons and matrix swaps.'
    },
    'rock-paper-scissors': {
        title: 'Flying Rock Paper Scissors',
        description: 'A fun, lightweight browser simulation built for time-pass where emojis collide and convert each other.',
        domain: 'Simulation & Emergent Behavior',
        whatILearned: 'Explored how simple rules (collision, conversion) can lead to complex and interesting group behaviors.',
        keyConcepts: 'Particle Systems, Collision Logic, Simulation',
        githubLink: 'https://github.com/lord230/flying_rock_paper_scissors',
        demoLink: 'https://lord230.github.io/flying_rock_paper_scissors/',
        techStack: ['Web Logic', 'Maths Based'],
        idea: 'Create a particle simulation where Rock, Paper, and Scissors objects hunt their prey and flee their predators.',
        backstory: 'Time pass ke liye bana diya hain maine bass aur kuch nahi. Seriously, I just wanted to watch a massive chaotic brawl of emojis fighting to the death on my screen.',
        maths: '2D Euclidean distance calculations for collision detection, combined with simple vector math for velocity tracking and bounding-box bouncing physics.'
    },
    'timetable': {
        title: 'Class Timetable Generator',
        description: 'An automated scheduling tool that generates conflict-free class timetables optimized for teachers and students.',
        domain: 'Optimization & Automation',
        whatILearned: 'Solved a constraint satisfaction problem to generate conflict-free schedules.',
        keyConcepts: 'Constraint Satisfaction, Pandas, Automation',
        githubLink: 'https://github.com/lord230/auto-scheduling',
        demoLink: 'https://class-c.streamlit.app/',
        techStack: ['Hackathons', 'Maths Based', 'Web Logic'],
        idea: 'Use constraint satisfaction algorithms and Pandas to crunch class requirements without teacher overlaps.',
        backstory: 'My college scheduling system was a chaotic mess, and my sleep schedule was suffering because of 8 AMs. So I coded a constraint solver to fix what the administration couldn\'t. Spoiler: didn\'t get out of the 8 AMs.',
        maths: 'Constraint satisfaction problem solving and combinatorial matrix optimization to generate conflict-free multi-dimensional schedules.'
    },
    'mandelbrot': {
        title: 'Mandelbrot Set',
        description: 'A visualization of the Mandelbrot fractal with interactive zooming and coloring features.',
        domain: 'Mathematics & Graphics',
        whatILearned: 'Understood the beauty of fractals and how efficient computation is needed for rendering complex math.',
        keyConcepts: 'Complex Numbers, Fractals, Performance Optimization',
        githubLink: 'https://github.com/lord230/Mandelbrot',
        demoLink: 'https://mandelbrot-seven.vercel.app/',
        techStack: ['Maths Based'],
        idea: 'Render the infinite complexity of the Mandelbrot set by checking the divergence of complex numbers.',
        backstory: 'I learned about fractals in a math lecture and wanted to zoom into infinity. 10 hours and a nearly fried CPU later, I had a colorful rendering and a very hot laptop.',
        maths: 'Iterative calculation of Z_{n+1} = Z_n² + C in the complex plane, using absolute value thresholds to test for divergence to infinity.'
    },
    'gesture': {
        title: 'Gesture-based Control',
        description: 'A computer vision system that enables users to control their mouse cursor using hand gestures, designed especially for accessibility.',
        domain: 'Computer Vision & Accessibility',
        whatILearned: 'Learned to use MediaPipe for real-time hand tracking and mapping coordinates to system actions.',
        keyConcepts: 'Computer Vision, MediaPipe, Human-Computer Interaction',
        githubLink: 'https://github.com/lord230/Hand-Gesture',
        demoLink: null,
        techStack: ['Machine Learning'],
        idea: 'Track hand landmarks and map pinch/swipe gestures to OS-level mouse control using MediaPipe.',
        backstory: 'I wanted to feel like Iron Man moving holograms around in mid-air. I only had a cheap webcam and Python, but hey, it actually worked! Tony Stark would be mildly impressed.'
    },
    'face-cursor': {
        title: 'Face Cursor Movement',
        description: 'A system that controls cursor movement using facial expressions and head tracking for hands-free computer interaction.',
        domain: 'Computer Vision & Interaction',
        whatILearned: 'Implemented head pose estimation to control the mouse cursor hands-free.',
        keyConcepts: 'Facial Landmarks, Pose Estimation, dlib',
        githubLink: 'https://github.com/lord230/face_cursor_movement',
        demoLink: null,
        techStack: ['Machine Learning'],
        idea: 'Calculate head pitch and yaw using dlib facial landmarks to drive the mouse cursor position.',
        backstory: 'Using a mouse requires moving your hand. Sometimes you\'re wrapped in a blanket on a winter night and moving your arm is just too much work. Peak laziness drives peak innovation.'
    },
    'weather': {
        title: 'Weather Prediction App',
        description: 'A desktop GUI built with Tkinter that models future temperatures (Keras) and predicts rain (Joblib) concurrently with built-in input validations.',
        domain: 'Deep Learning & Applied ML',
        whatILearned: 'Learned how to load and run trained Keras (.h5) and Joblib models inside a GUI app, and how to build a multi-model inference pipeline with input validation.',
        keyConcepts: 'Keras/TensorFlow, Joblib, Tkinter GUI, Deep Learning Inference, Input Validation, Multi-model Pipeline',
        githubLink: 'https://github.com/lord230/Weather_app',
        demoLink: null,
        techStack: ['Machine Learning'],
        idea: 'Run a deep learning model for temperature and a classical ML model for rain classification side-by-side.',
        backstory: 'I got rained on one too many times because a generic weather widget lied to me. I decided to train my own model to predict if I needed an umbrella or not.'
    },
    'lan': {
        title: 'LAN Transfer',
        description: 'A Python-based file transfer utility for sharing files and folders over a local network, featuring both GUI (Tkinter) and headless CLI versions.',
        domain: 'Networking',
        whatILearned: 'Understood socket programming and file transfer protocols over a local network.',
        keyConcepts: 'Sockets, TCP/IP, File I/O',
        githubLink: 'https://github.com/lord230/LAN-TRANSFER',
        demoLink: null,
        techStack: ['Networking'],
        idea: 'Establish direct TCP/IP socket connections between devices on the same local network for fast file I/O.',
        backstory: 'Moving project files between my laptop and PC via USB was feeling very 2012. Cloud sync was too slow. Built this because absolute impatience is a developer\'s greatest virtue.'
    },
    'clipperboard': {
        title: 'Clipperboard',
        description: 'A seamless Universal Clipboard Sync tool designed to work flawlessly across Mac, Windows, and Linux environments.',
        domain: 'Productivity Tools',
        whatILearned: 'Explored system clipboard access and managing improved workflows.',
        keyConcepts: 'System Integration, Clipboard API, Python Scripting',
        githubLink: 'https://github.com/lord230/Clipperboard',
        demoLink: null,
        techStack: ['Productivity'],
        idea: 'Create a background daemon that intercepts clipboard copy events and syncs the payload to connected devices.',
        backstory: 'I copied something on my Windows PC, tried to paste it on my Mac, and aggressively hammered Ctrl+V before realizing I am not in the Apple Ecosystem... so Clipperboard was born.'
    },
    'neural': {
        title: 'C++ Neural Network',
        description: 'A from-scratch implementation of neural networks in C++ for educational and research purposes.',
        domain: 'Machine Learning Fundamentals',
        whatILearned: 'Built a neural network from scratch to understand the math behind backpropagation.',
        keyConcepts: 'C++, Linear Algebra, Backpropagation',
        githubLink: 'https://github.com/lord230/custom_C-_Neural_network',
        demoLink: null,
        techStack: ['Machine Learning', 'Maths Based'],
        idea: 'Implement forward passes, loss calculation, gradients, and backpropagation in raw C++ without libraries.',
        backstory: 'PyTorch makes building neural networks too easy. I thought to myself, "Why not suffer a bit?" So I wrote one from scratch in pure C++ to truly appreciate the pain of raw calculus.',
        maths: 'Extensive use of matrix dot products, activation function calculus (derivatives for gradient descent), and the chain rule for backpropagation.'
    },
    'rotation': {
        title: 'Rotating 3D Shapes Visualizer',
        description: 'A Python desktop app rendering 3D shapes (Torus, Cube, Tetrahedron) in real-time using NumPy rotation matrices and perspective projection.',
        domain: 'Mathematics & Computer Graphics',
        whatILearned: 'Built a 3D-to-2D perspective projection pipeline from scratch using NumPy rotation matrices, and learned how GUI animation loops work in Tkinter.',
        keyConcepts: 'Rotation Matrices, Perspective Projection, Tkinter GUI, NumPy, Real-time Animation',
        githubLink: 'https://github.com/lord230/Rotating_shapes',
        demoLink: null,
        techStack: ['Maths Based'],
        idea: 'Project 3D vertices onto a 2D plane by continuously multiplying them against dynamic rotation matrices.',
        backstory: 'Linear algebra class was making my head spin. I decided the best coping mechanism was writing code to make 3D shapes spin on my screen instead.',
        maths: '3D rotation matrices (Euler angles) multiplied by 3D vectors mapping to affine transformations, followed by perspective division (Z-divide) to map (X,Y,Z) onto a 2D (X,Y) screen space.'
    }
};

export const projectInfo = {
    ...majorProjects,
    ...exploratoryProjects
};
