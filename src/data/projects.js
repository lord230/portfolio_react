export const majorProjects = {
    'tumor': {
        title: 'Brain Tumor Detection with GradCAM',
        shortDescription: 'A medical AI application that classifies brain MRI scans into four categories and provides visual heatmap explanations using GradCAM — bridging the gap between deep learning accuracy and clinical trustworthiness.',
        description: 'This project addresses one of the most critical challenges in medical AI: making deep learning models interpretable enough for real clinical use. Using a fine-tuned DenseNet121 architecture trained on over 3,000 labeled MRI scans, the system classifies tumors into four categories — Glioma, Meningioma, Pituitary, and No Tumor — while simultaneously generating GradCAM heatmaps that overlay precisely where the model is "looking" on each scan. The result is packaged in a desktop GUI built with Tkinter, allowing medical staff to upload scans, receive predictions with confidence scores, and see highlighted regions of interest — all without any ML expertise required.',
        techStack: ['Python', 'PyTorch', 'DenseNet121', 'GradCAM', 'Tkinter', 'Medical Imaging', 'Transfer Learning'],
        problemStatement: 'Brain tumor diagnosis from MRI scans requires trained radiologists and is time-intensive, error-prone, and expensive at scale. While deep learning models can match or exceed radiologist accuracy, they operate as "black boxes" — clinicians cannot see why a prediction was made, making adoption in hospitals nearly impossible. There was a need for a system that is both highly accurate AND explainable, so medical professionals can verify, trust, and act on the AI\'s output.',
        approach: 'Rather than training a model from scratch (which would require massive compute and data), I leveraged Transfer Learning with DenseNet121 — a convolutional network pre-trained on ImageNet. Only the final classification layers were retrained on the MRI dataset. To address the interpretability gap, GradCAM (Gradient-weighted Class Activation Mapping) was integrated post-training. GradCAM computes gradients of the predicted class score with respect to the last convolutional layer, producing a coarse localization map of the discriminative regions. These heatmaps are then alpha-blended onto the original MRI, giving a medically meaningful visualization.',
        executionSteps: [
            {
                title: 'Dataset Collection & Exploration',
                description: 'Sourced the Brain Tumor MRI Dataset from Kaggle — 3,264 labeled MRI images across 4 classes: Glioma (926), Meningioma (937), Pituitary (901), and No Tumor (500). Performed exploratory analysis to assess class distribution and image quality.'
            },
            {
                title: 'Data Preprocessing & Augmentation',
                description: 'Resized all images to 224×224 pixels (DenseNet input size). Applied augmentation: random horizontal flips, rotations (±15°), brightness/contrast jitter, and normalization using ImageNet mean/std. This reduced overfitting significantly on the minority class.'
            },
            {
                title: 'Model Architecture & Transfer Learning',
                description: 'Loaded DenseNet121 with pre-trained ImageNet weights. Froze all convolutional layers to preserve low-level feature detectors. Replaced the final fully-connected layer with a custom 4-class classifier head (Linear → ReLU → Dropout(0.5) → Linear → Softmax).'
            },
            {
                title: 'Training & Fine-Tuning',
                description: 'Trained for 25 epochs with Adam optimizer (lr=1e-4, weight decay=1e-5) and CrossEntropyLoss. Used a ReduceLROnPlateau scheduler. In the final 5 epochs, unfroze the last two Dense blocks for fine-tuning at a lower lr (1e-5). Best model checkpoint saved based on validation accuracy.'
            },
            {
                title: 'GradCAM Explainability Integration',
                description: 'Implemented GradCAM by registering forward and backward hooks on the last convolutional layer. For each prediction, computed gradients of the predicted class score w.r.t. the feature maps, averaged them (global average pooling), and used them to weight the activation maps. The resulting heatmap is resized and overlaid on the MRI using a jet colormap for intuitive visualization.'
            },
            {
                title: 'Desktop GUI Development',
                description: 'Built a Tkinter-based interface with an image upload button, a preview panel, a prediction readout showing class label + confidence percentage, and a side-by-side view of the original scan vs GradCAM overlay. Designed to require zero ML knowledge to operate.'
            },
            {
                title: 'Evaluation & Validation',
                description: 'Evaluated on a held-out test set (20% split). Computed accuracy, precision, recall, and F1-score per class. Generated confusion matrix to identify misclassification patterns. GradCAM outputs were visually reviewed by a domain-familiar reviewer to confirm heatmap relevance.'
            }
        ],
        challenges: 'The primary challenge was class imbalance — the "No Tumor" class had roughly half the samples of the tumor classes, causing early models to be biased. Real-time GradCAM generation introduced latency (~1.5s per scan on CPU), which was noticeable in the GUI. Additionally, Meningioma and Glioma share visual similarities in MRI texture, making them the hardest pair to distinguish.',
        solutions: 'Class imbalance was addressed with weighted random sampling during training and class-weighted CrossEntropyLoss, improving minority class recall from 71% to 94%. GUI latency was reduced by caching the GradCAM computation and running it in a separate thread so the UI stayed responsive. For the Meningioma/Glioma confusion, fine-tuning the last two Dense blocks significantly improved inter-class discrimination.',
        results: 'Achieved 98% overall accuracy on the test set. Per-class F1-scores: Glioma 0.98, Meningioma 0.96, Pituitary 0.99, No Tumor 0.99. GradCAM heatmaps accurately highlighted tumor regions in 95%+ of correctly classified scans. The GUI enables a full diagnosis workflow — upload, predict, explain — in under 3 seconds.',
        githubLink: 'https://github.com/lord230/tumore_detection_v1',
        demoLink: null
    },
    'sentiment': {
        title: 'Sentiment Analysis Engine',
        shortDescription: 'A classical NLP pipeline that classifies text as positive, negative, or neutral — trained on a 50,000-sample dataset with TF-IDF feature extraction and multiple ML classifiers, deployed as a real-time web app.',
        description: 'This project implements a complete, end-to-end sentiment analysis pipeline without relying on pre-trained language models like BERT. Starting from raw, noisy text (product reviews, tweets, comments), the system applies a multi-stage preprocessing pipeline, extracts TF-IDF features, and benchmarks five different ML classifiers. The best-performing model (Logistic Regression) is serialized and served through a lightweight Flask API, with a React front-end for real-time predictions. The project demonstrates that classical ML — when paired with rigorous preprocessing and proper feature engineering — can achieve strong results, often faster and more interpretably than transformer-based approaches.',
        techStack: ['Python', 'NLTK', 'Scikit-learn', 'Pandas', 'Flask', 'TF-IDF', 'Logistic Regression', 'SVM'],
        problemStatement: 'Organizations generate and consume enormous volumes of user-generated text — reviews, survey responses, social media mentions — but manually reading and categorizing sentiment is impossible at scale. Existing off-the-shelf solutions are either too expensive, too slow, or too opaque. There was a need for a fast, understandable, and deployable sentiment classifier that could be customized to specific domains without retraining a large language model.',
        approach: 'Chose a classical ML approach over deep learning deliberately — it offers faster inference, lower memory footprint, interpretable feature weights, and easier debugging. The pipeline: raw text → cleaning → tokenization → stop-word removal → lemmatization → TF-IDF vectorization → classification. Five models were benchmarked (Naive Bayes, Logistic Regression, Linear SVM, SGD Classifier, Random Forest). Logistic Regression with TF-IDF bigrams won on both accuracy and F1-score. The final model is exposed via a Flask REST API and consumed by a simple React UI.',
        executionSteps: [
            {
                title: 'Dataset Acquisition',
                description: 'Used the IMDB Movie Reviews dataset (50,000 reviews, balanced 50/50 positive/negative) as the primary training corpus. Supplemented with a sample of Twitter Sentiment140 data for cross-domain evaluation. Total labeled samples: ~55,000.'
            },
            {
                title: 'Text Cleaning & Normalization',
                description: 'Removed HTML tags, URLs, email addresses, punctuation, and special characters using regex. Converted all text to lowercase. Handled contractions (e.g., "don\'t" → "do not") and expanded common abbreviations. Filtered out reviews with fewer than 5 words.'
            },
            {
                title: 'Tokenization & Stop-Word Removal',
                description: 'Tokenized text using NLTK\'s word_tokenize. Removed English stop words from NLTK\'s corpus — but retained negation words (not, never, no) as they reverse sentiment polarity. Applied NLTK\'s WordNetLemmatizer to reduce words to their base forms (running → run, better → good).'
            },
            {
                title: 'Feature Engineering with TF-IDF',
                description: 'Fit a TF-IDF vectorizer on the training set with unigrams + bigrams (ngram_range=(1,2)), capping vocabulary at 50,000 features and using sublinear TF scaling. Bigrams proved crucial — "not good" and "not bad" carry opposite sentiments, invisible to unigram-only models.'
            },
            {
                title: 'Model Training & Benchmarking',
                description: 'Trained and 5-fold cross-validated: Multinomial Naive Bayes, Logistic Regression (C=1.0), Linear SVM (C=0.5), SGD Classifier, and Random Forest (100 trees). Logistic Regression achieved the best CV accuracy (88.4%) and highest F1 on the test set. Random Forest was the slowest with marginal accuracy gain.'
            },
            {
                title: 'Hyperparameter Tuning',
                description: 'Ran GridSearchCV over Logistic Regression\'s C (0.01, 0.1, 1, 10) and solver (liblinear, lbfgs). Also tuned TF-IDF\'s max_df (0.8, 0.9, 1.0) and min_df (1, 2, 5). Best config: C=1, solver=liblinear, max_df=0.9, min_df=2 — pushed test accuracy from 85% to 88.7%.'
            },
            {
                title: 'API Deployment & Frontend',
                description: 'Serialized the trained pipeline (vectorizer + model) using joblib. Built a Flask REST API with a /predict endpoint accepting JSON text input. Deployed with Gunicorn. Front-end is a minimal React app with a textarea, real-time confidence bar, and positive/negative/neutral label with color coding.'
            }
        ],
        challenges: 'Sarcasm and irony are fundamentally difficult for bag-of-words models — "Great, another Monday" reads as positive without context. The dataset was domain-specific (movie reviews), causing accuracy to drop to 76% when tested on tweets, which use slang, abbreviations, and emoji. Class imbalance wasn\'t an issue in IMDB, but was a major concern in the Twitter subset (60% negative).',
        solutions: 'For sarcasm, added a feature layer that flags high positive-word density paired with low overall review score as a potential sarcasm signal — a lightweight heuristic that improved cross-domain F1 by 4%. Domain shift was mitigated by mixing 15% Twitter data into the training set and using subword-level bigrams for slang robustness. Twitter class imbalance was handled with SMOTE oversampling on the TF-IDF feature matrix.',
        results: 'Achieved 88% accuracy on IMDB test set. Cross-domain accuracy on Twitter: 79% (up from 76% baseline). F1-score: 0.89 (positive), 0.88 (negative). Inference latency: ~2ms per prediction via the Flask API, suitable for real-time use. Model size: 18MB (vectorizer + classifier combined), deployable on a free-tier server.',
        githubLink: 'https://github.com/lord230/sentiment-analysis',
        demoLink: null
    }
};

export const exploratoryProjects = {
    'life-number': {
        title: 'Life Number Calculator',
        description: 'A fascinating project exploring numerical patterns and life calculations based on numerology principles.',
        domain: 'Numerology & Algorithms',
        whatILearned: 'Learned how to implement mathematical logic into a user-friendly web interface using Streamlit.',
        keyConcepts: 'Algorithmic Logic, User Input Handling, Streamlit UI',
        githubLink: 'https://github.com/lord230/Lifenumber',
        demoLink: 'https://lord230.github.io/Lifenumber/'
    },
    'snake': {
        title: 'Snake Game',
        description: 'A classic snake game implementation with modern web technologies and enhanced gameplay features.',
        domain: 'Game Development',
        whatILearned: 'Mastered the HTML5 Canvas API and game loop mechanics (updating state, rendering).',
        keyConcepts: 'Canvas API, Game Loops, Collision Detection',
        githubLink: 'https://github.com/lord230/snake_game',
        demoLink: 'https://lord230.github.io/snake_game/'
    },
    'sorting': {
        title: 'Sorting Algorithm Visualizer',
        description: 'An educational tool that visualizes various sorting algorithms in real-time with step-by-step animations.',
        domain: 'Algorithms & Education',
        whatILearned: 'Deepened understanding of sorting algorithms by visualizing their step-by-step execution.',
        keyConcepts: 'Algorithm Complexity, State Management, Animation',
        githubLink: 'https://github.com/lord230/Sorting_visuals',
        demoLink: 'https://sortingvisual.streamlit.app/'
    },
    'rock-paper-scissors': {
        title: 'Flying Rock Paper Scissors',
        description: 'A browser-based simulation where rock, paper, and scissors emojis float around the screen, collide, and convert each other until one type dominates.',
        domain: 'Simulation & Emergent Behavior',
        whatILearned: 'Explored how simple rules (collision, conversion) can lead to complex and interesting group behaviors.',
        keyConcepts: 'Particle Systems, Collision Logic, Simulation',
        githubLink: 'https://github.com/lord230/flying_rock_paper_scissors',
        demoLink: 'https://lord230.github.io/flying_rock_paper_scissors/'
    },
    'timetable': {
        title: 'Class Timetable Generator',
        description: 'An automated scheduling tool that generates conflict-free class timetables optimized for teachers and students.',
        domain: 'Optimization & Automation',
        whatILearned: 'Solved a constraint satisfaction problem to generate conflict-free schedules.',
        keyConcepts: 'Constraint Satisfaction, Pandas, Automation',
        githubLink: 'https://github.com/lord230/auto-scheduling',
        demoLink: 'https://class-c.streamlit.app/'
    },
    'mandelbrot': {
        title: 'Mandelbrot Set',
        description: 'A visualization of the Mandelbrot fractal with interactive zooming and coloring features.',
        domain: 'Mathematics & Graphics',
        whatILearned: 'Understood the beauty of fractals and how efficient computation is needed for rendering complex math.',
        keyConcepts: 'Complex Numbers, Fractals, Performance Optimization',
        githubLink: 'https://github.com/lord230/Mandelbrot',
        demoLink: 'https://lord230.github.io/Mandelbrot/'
    },
    'gesture': {
        title: 'Gesture-based Control',
        description: 'A computer vision system that enables users to control their mouse cursor using hand gestures, designed especially for accessibility.',
        domain: 'Computer Vision & Accessibility',
        whatILearned: 'Learned to use MediaPipe for real-time hand tracking and mapping coordinates to system actions.',
        keyConcepts: 'Computer Vision, MediaPipe, Human-Computer Interaction',
        githubLink: 'https://github.com/lord230/Hand-Gesture',
        demoLink: null
    },
    'face-cursor': {
        title: 'Face Cursor Movement',
        description: 'A system that controls cursor movement using facial expressions and head tracking for hands-free computer interaction.',
        domain: 'Computer Vision & Interaction',
        whatILearned: 'Implemented head pose estimation to control the mouse cursor hands-free.',
        keyConcepts: 'Facial Landmarks, Pose Estimation, dlib',
        githubLink: 'https://github.com/lord230/face_cursor_movement',
        demoLink: null
    },
    'weather': {
        title: 'Weather Prediction App',
        description: 'A Python desktop application (Tkinter) that combines a Deep Learning model (Keras/TensorFlow) for future temperature prediction and a traditional ML model (Joblib) for rain classification — all in one GUI. The user inputs five recent temperatures plus humidity and wind speed; the app validates the data (blocks inputs where any two temps differ by more than 5°C) and runs both models in parallel to display a predicted temperature and a yes/no rain forecast.',
        domain: 'Deep Learning & Applied ML',
        whatILearned: 'Learned how to load and run trained Keras (.h5) and Joblib models inside a GUI app, and how to build a multi-model inference pipeline with input validation.',
        keyConcepts: 'Keras/TensorFlow, Joblib, Tkinter GUI, Deep Learning Inference, Input Validation, Multi-model Pipeline',
        githubLink: 'https://github.com/lord230/Weather_app',
        demoLink: null
    },
    'lan': {
        title: 'LAN Transfer',
        description: 'A fast and secure file transfer application designed for local network environments.',
        domain: 'Networking',
        whatILearned: 'Understood socket programming and file transfer protocols over a local network.',
        keyConcepts: 'Sockets, TCP/IP, File I/O',
        githubLink: 'https://github.com/lord230/LAN-TRANSFER',
        demoLink: null
    },
    'clipperboard': {
        title: 'Clipperboard',
        description: 'An advanced clipboard management tool that enhances text processing and productivity.',
        domain: 'Productivity Tools',
        whatILearned: 'Explored system clipboard access and managing improved workflows.',
        keyConcepts: 'System Integration, Clipboard API, Python Scripting',
        githubLink: 'https://github.com/lord230/Clipperboard',
        demoLink: null
    },
    'neural': {
        title: 'C++ Neural Network',
        description: 'A from-scratch implementation of neural networks in C++ for educational and research purposes.',
        domain: 'Machine Learning Fundamentals',
        whatILearned: 'Built a neural network from scratch to understand the math behind backpropagation.',
        keyConcepts: 'C++, Linear Algebra, Backpropagation',
        githubLink: 'https://github.com/lord230/custom_C-_Neural_network',
        demoLink: null
    },
    'rotation': {
        title: 'Rotating 3D Shapes Visualizer',
        description: 'A Python desktop app that lets you visualize and interact with rotating 3D shapes — Torus, Cube, and Tetrahedron — rendered in real-time using rotation matrices and perspective projection. The GUI (Tkinter + NumPy) lets you adjust rotation speed, shape scale, and toggle rotation per axis (X/Y/Z), with a built-in "How it Works" window explaining the linear algebra behind the renderer.',
        domain: 'Mathematics & Computer Graphics',
        whatILearned: 'Built a 3D-to-2D perspective projection pipeline from scratch using NumPy rotation matrices, and learned how GUI animation loops work in Tkinter.',
        keyConcepts: 'Rotation Matrices, Perspective Projection, Tkinter GUI, NumPy, Real-time Animation',
        githubLink: 'https://github.com/lord230/Rotating_shapes',
        demoLink: null
    }
};

export const projectInfo = {
    ...majorProjects,
    ...exploratoryProjects
};
