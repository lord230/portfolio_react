export const majorProjects = {
    'smart-pricing': {
        title: 'Amazon ML Challenge 2025: Smart Product Pricing Solution',
        shortDescription: 'An end-to-end multimodal deep learning system that reads product listings like a human and looks at photos like a connoisseur — then outputs a price prediction faster than you can say "add to cart".',
        description: 'A dual-branch Transformer + CNN fusion system for predicting Amazon product prices from both text and images. The model combines MiniLM-L6-H384 (22M params, BERT\'s lean sibling) for semantic text embeddings and EfficientNet-B0 (compound-scaled CNN, ImageNet pretrained) for visual features. Both 384-D and 1280-D embeddings are projected to 256-D, concatenated into a 512-D fusion vector, and passed through a 3-layer BatchNorm + GELU MLP. Training uses log1p price targets, Smooth L1 loss, FP16 mixed precision, differential learning rates, and Cosine Annealing with Warm Restarts.',
        techStack: ['Python', 'PyTorch', 'MiniLM-L6-H384', 'EfficientNet-B0', 'Transformers', 'Mixed Precision', 'Deep Learning'],
        problemStatement: 'Amazon product prices span from $2 phone cases to $50,000 servers — a distribution so skewed that naive regression models panic and predict garbage. The challenge: predict prices accurately from multimodal listings (text + image) while handling missing images, outlier prices, and the gap between "Rolex Watch" in text vs. a cheap knockoff in the photo.',
        approach: 'Dual-branch architecture: Text Branch (MiniLM-L6-H384 Transformer) + Image Branch (EfficientNet-B0 CNN). Both branches project to 256-D via linear layers, concatenated to 512-D, fused through a 3-layer MLP with BatchNorm + GELU + Dropout. Target: log1p(price) for distribution normalization. Differential learning rates (encoders: 1e-5, fusion head: 1e-3) + Cosine Annealing warm restarts for training stability.',
        executionSteps: [
            {
                title: 'Multimodal Fusion Architecture',
                description: 'Text (MiniLM) and image (EfficientNet-B0) branches produce 384-D and 1280-D embeddings respectively. Linear projections bring both to 256-D → concatenation yields a 512-D fused vector. Early feature fusion: no gates, no attention — just elegant simplicity.'
            },
            {
                title: 'Log-Price Target Engineering',
                description: 'Prices are log1p-transformed before training (e.g., $10→2.39, $1000→6.90, $10000→9.21). Smooth L1 loss is computed in log-space, making the model agnostic to whether it\'s predicting a $5 pen or a $20,000 server. Inverse: expm1(pred) recovers real price at inference.'
            },
            {
                title: 'Mixed Precision + Differential LRs',
                description: 'FP16 AutoCast halves GPU memory and roughly doubles training throughput. Pretrained encoders use lr=1e-5 (fine-tune gently — they already know stuff). Fusion MLP uses lr=1e-3 (train aggressively — it knows nothing yet). Classic transfer learning wisdom.'
            },
            {
                title: 'Dynamic Image Handling',
                description: 'Missing product images are downloaded and processed on-the-fly during dataset instantiation. The system never crashes on missing data — it adapts. Images are resized to 224×224 and normalized with ImageNet mean/std before entering EfficientNet-B0.'
            }
        ],
        challenges: 'Highly skewed price distributions (outlier dominance from luxury goods and industrial equipment), metric misalignment between training loss (Smooth L1) and evaluation metric (SMAPE), and efficiently handling missing product images at scale without data pipeline crashes.',
        solutions: 'log1p target transformation tamed the skew. Differential learning rates prevented fine-tuning from destroying pretrained representations. On-the-fly image downloading made the dataset self-healing. Cosine Annealing with Warm Restarts helped escape local minima for better generalization.',
        results: 'Validation SMAPE: 20.68%. Training SMAPE: 18.59%. Loss Function: Smooth L1 (Huber-style). The model successfully fuses semantic text signals with visual quality signals — correctly pricing a "Rolex Watch" listing higher when the image confirms luxury materials.',
        githubLink: 'https://github.com/lord230/Amazon-ML',
        demoLink: null
    },

    'tumor': {
        title: 'Tumor Grad-CAM Classification',
        shortDescription: 'An advanced Hybrid Neural Network combining CNNs and Transformers to classify brain MRI scans with explicit Grad-CAM mappings.',
        description: 'An advanced Hybrid Neural Network (HybridMemoryNet) designed for classifying brain MRI scans. By combining the spatial extraction reasoning inherent to Convolutional Neural Networks (EfficientNet-B0) with the global context logic of Transformers (Swin-Tiny), the model operates securely to output predictions confirmed via explicit Grad-CAM mappings. During inference, the frontend displays: Extracting local features, Computing global context, Fusing representations (SE-Gate), Calculating Prototype Cosine Similarities, and Generating Grad-CAM visualization.',
        techStack: ['PyTorch', 'EfficientNet-B0', 'Swin Transformer', 'Grad-CAM', 'Medical Imaging'],
        problemStatement: 'Testing the accuracy variables demands broad and precise initial definitions minimizing data pooling contamination across more than 10,000 distinct samples. Standard classifiers often fail to capture both fine-grained local anomalies (like tumor edges) and global brain structures simultaneously.',
        approach: 'HybridMemoryNet Architecture combines two branches: EfficientNet-B0 captures texture, tumor edges, and fine-grained patterns, while Swin-Tiny Transformer captures global tumor structure and long-range spatial relationships. These representations are fused via an SE-Gate, learning which branch to trust more. Finally, a Prototype Memory Module compares the unified feature vector against learned class prototypes via Cosine Similarity for classification.',
        executionSteps: [
            {
                title: 'Step 1: Image Upload & Preview',
                description: 'User uploads an MRI. The frontend stores the image and preview.'
            },
            {
                title: 'Step 2: Model Inference Pipeline',
                description: 'Image is sent to the Hugging Face backend along with a Grad-CAM alpha blending strength parameter (e.g. 0.5).'
            },
            {
                title: 'Step 3: Response Generation',
                description: 'Backend evaluates the input and returns confidence scores coupled with the generated Grad-CAM heatmap image.'
            },
            {
                title: 'Step 4: Probability Ranking',
                description: 'Frontend parses the confidence probabilities (e.g., Glioma 96.4%, Pituitary 2.1%, etc.) and ranks them for display.'
            },
            {
                title: 'Step 5: Explainability Overlay Display',
                description: 'The Grad-CAM overlay is rendered over the MRI to provide medical explainability by highlighting the regions responsible for the prediction.'
            }
        ],
        challenges: 'Limiting overfitting, effectively integrating CNN spatial features with Transformer global context, separating visually similar classes, and ensuring regulatory-friendly clinical trustworthiness.',
        solutions: 'Utilized an SE-Gated Fusion to intelligently weigh local vs. global features. Implemented a Prototype Memory approach to improve class separation with limited medical datasets. Integrated Grad-CAM for transparent, trust-building visualization.',
        results: 'The architecture strengths: EfficientNet provides lightweight, fast feature extraction; Swin offers better global understanding; Prototype Memory enhances interpretable separation; and Grad-CAM ensures doctor trust. Raw Accuracy Base: 99.03%, Precision (Macro): 98.84%, Recall: 98.95%, AUC: 0.9986.',
        githubLink: 'https://github.com/lord230/Tumor-GradCam',
        demoLink: 'https://huggingface.co/spaces/Lord230/td'
    },
    'sentiment': {
        title: 'Sentiment Fusion',
        shortDescription: 'A sarcasm-aware multi-task sentiment system that actually understands "Great! My laptop crashed again." — hint: it\'s not positive.',
        description: 'A multi-task sarcasm-aware sentiment architecture with retrieval-augmented emotion understanding. Built on XLM-RoBERTa, it runs a parallel sarcasm detection head whose output directly gates the CLS embedding via a learned gate projection — completely rewiring how the model interprets sentiment when sarcasm is detected. A 1540-D context vector (CLS + mean pool + sentiment probs + sarcasm score) is then used to query a partitioned FAISS vector database, returning fine-grained emotions like "Mild Joy", "Bitter Sarcasm", and "Moderate Anxiety" instead of just "Positive".',
        techStack: ['Python', 'PyTorch', 'XLM-RoBERTa', 'FAISS', 'Transformers', 'Multi-task Learning'],
        problemStatement: 'Standard sentiment models fail catastrophically on sarcasm — reading "I love waiting 3 hours for support" and confidently predicting Positive. Beyond that, Positive/Neutral/Negative is a poverty of emotional vocabulary. Real-world applications need nuance: Joy, Pride, Bitterness, Relief — with intensity scores.',
        approach: 'XLM-RoBERTa backbone (12 layers, 100 languages, better on noisy/social-media text than BERT). Parallel sarcasm detection head: Linear(768,1) + Sigmoid → p_sarcasm ∈ [0,1]. Gate Projection: [CLS || p_sarcasm] → Linear(769, 768) → residual add + LayerNorm → sarcasm-aware CLS. Sentiment classifier: Linear(768, 3). Context vector: 768 (CLS) + 768 (mean pool) + 3 (sentiment probs) + 1 (sarcasm score) = 1540-D → FAISS k-NN search across 3 polarity-partitioned indexes.',
        executionSteps: [
            {
                title: 'Sarcasm-Aware Gate Projection',
                description: 'p_sarcasm from the detection head is concatenated with the 768-D CLS embedding to form a 769-D vector. A gate projection layer (Linear 769→768) maps this back to 768-D. Residual addition + LayerNorm creates a sarcasm-aware CLS — semantically corrected by the sarcasm signal before sentiment classification even begins.'
            },
            {
                title: '1540-D Context Vector Construction',
                description: 'At inference: torch.cat([cls_768, mean_pool_768, sentiment_probs_3, sarcasm_prob_1]) = 1540-D. This vector encodes: semantic meaning, alternative token-level meaning, polarity confidence distribution, and sarcasm intensity. The complete emotional fingerprint of the input.'
            },
            {
                title: 'Partitioned FAISS Indexing',
                description: 'Three separate FAISS indexes: positive_index, negative_index, neutral_index. Predicted polarity routes the 1540-D query to the correct sub-index, dramatically improving retrieval precision. Each index stores emotional example vectors with associated fine-grained labels and intensity scores.'
            },
            {
                title: 'Nuanced Emotion Retrieval',
                description: 'k-NN search in 1540-D space returns similar emotional vectors. Associated labels resolve to emotions like "Mild Joy (0.82)", "Excited Pride (0.76)", "Quiet Dread (0.71)". Instead of "Positive", you get a full emotional profile. Night and day for real-world applications.'
            }
        ],
        challenges: 'Standard sentiment models read sarcasm as its literal polarity (love → Positive, hate → Negative). Coarse Pos/Neu/Neg labels are too blunt for real applications. Training two tasks simultaneously (sentiment + sarcasm) with different loss scales required careful balancing. FAISS index construction required curating high-quality emotional example vectors.',
        solutions: 'Dedicated sarcasm head with gate projection directly modifies the CLS embedding — sarcasm rewires the representation before sentiment classification. Multi-task training with separate loss weights per task. Polarity-partitioned FAISS indexes for precision retrieval. 1540-D context vector encodes richer signal than typical 768-D sentence embeddings.',
        results: 'Sentiment Accuracy ~94.40%. Sarcasm Accuracy ~75.95%. Validation Loss ~0.2284 (converged by Epoch 15). Overall Score ~0.8866. The sarcasm gate measurably improves performance on ironic/sarcastic inputs — where standard classifiers would fail entirely.',
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
