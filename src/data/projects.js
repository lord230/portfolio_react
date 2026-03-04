export const majorProjects = {
    'smart-pricing': {
        title: 'Smart Product Pricing (ML Challenge 2025)',
        shortDescription: 'A multi-modal deep learning regression system that predicts product prices using text and images, built for the Amazon ML Challenge 2025.',
        description: 'This competition-grade multimodal deep learning engineering project predicts product prices by learning semantic meaning from text (title, description, quantity) and visual cues from images, then fuses them into a unified representation. This approach mirrors how real-world pricing systems are built in large e-commerce platforms.',
        techStack: ['Python', 'Deep Learning', 'Hugging Face', 'Transformers', 'MiniLM', 'EfficientNet-B0', 'PyTorch', 'Hackathons'],
        problemStatement: 'In modern e-commerce, predicting product prices relies on multiple data modalities. Relying solely on one modality leads to inaccurate pricing. Real-world pricing systems require a multi-modal approach that learns both semantic textual meaning and visual product cues simultaneously.',
        approach: 'Designed an end-to-end multimodal regression model combining a Text Encoder (nreimers/MiniLM-L6-H384-uncased) and an Image Encoder (EfficientNet-B0 pretrained on ImageNet). I projected both embeddings into 256D representations, concatenated them, and passed them through a fusion network (512 → 256 → 64 → 1) with GELU, BatchNorm, and Dropout. Prices were skewed, so I applied a log1p target transformation to reduce outlier dominance and stabilize gradients. I utilized a two-phase training strategy, optimizing first for smooth L1 (stable training) and then Differentiable SMAPE (metric alignment), paired with differential learning rates to prevent overwriting pretrained knowledge.',
        executionSteps: [
            {
                title: 'Text Encoding',
                description: 'Used a MiniLM sentence transformer to capture semantic meaning, product attributes, and contextual pricing signals, generating a 384-dimensional embedding.'
            },
            {
                title: 'Image Encoding',
                description: 'Employed an EfficientNet-B0 CNN to capture visual quality, brand cues, packaging richness, and category signals, generating a 1280-dimensional image embedding.'
            },
            {
                title: 'Multi-Modal Fusion',
                description: 'Projected both embeddings to 256D, concatenated them, and reduced dimensionality through dense network layers, implementing mixed precision training and cosine warm restarts for memory and speed optimization.'
            },
            {
                title: 'Strategic Metric Optimization',
                description: 'Implemented log-target transformation on prices to stabilize gradients. The training utilized a two-phase optimization (Smooth L1 followed by SMAPE loss) with differential learning rates for individual encoder networks and fusion head.'
            }
        ],
        challenges: 'Skewed price distributions leading to outlier dominance, unstable gradients, and metric misalignment when optimizing directly for competition metrics on a multimodal network.',
        solutions: 'Applied log1p transformations, differential learning rates (e.g., Text Encoder 5e-6, Fusion Head 1e-5), and a two-phase training strategy shifting from Smooth L1 to differentiable SMAPE to perfectly align with leaderboard constraints.',
        results: 'Achieved 20.68% SMAPE on the validation set and 18.59% SMAPE on final training, exhibiting excellent generalization without overfitting, resulting in a competitive score for a multi-modal regression task.',
        githubLink: 'https://github.com/lord230/Amazon-ML',
        demoLink: null
    },
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
        githubLink: 'https://github.com/lord230/Tumor-GradCam.git',
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
