/* CSS Variables for Theme Switching */
:root {
    --bg-primary: #000000;
    --bg-secondary: #0a0a0a;
    --bg-card: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --text-muted: #999999;
    --border-color: #333;
    --accent-color: #ffffff;
    --shadow-color: rgba(255, 255, 255, 0.1);
    --glow-color: #ffffff;
    --blur-bg: rgba(0, 0, 0, 0.95);
}

[data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --bg-card: #ffffff;
    --text-primary: #000000;
    --text-secondary: #333333;
    --text-muted: #666666;
    --border-color: #e0e0e0;
    --accent-color: #000000;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --glow-color: #000000;
    --blur-bg: rgba(255, 255, 255, 0.95);
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Orbitron', monospace;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
    word-wrap: break-word;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: var(--blur-bg);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

[data-theme="light"] .navbar {
    backdrop-filter: none;
}

/* Light mode text and heading blur removal */
[data-theme="light"] .hero-title,
[data-theme="light"] .hero-subtitle,
[data-theme="light"] .hero-description,
[data-theme="light"] .section-title,
[data-theme="light"] .project-title,
[data-theme="light"] .project-description,
[data-theme="light"] h1,
[data-theme="light"] h2,
[data-theme="light"] h3,
[data-theme="light"] h4,
[data-theme="light"] h5,
[data-theme="light"] h6,
[data-theme="light"] p,
[data-theme="light"] span,
[data-theme="light"] div {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo .logo-text {
    font-size: 2rem;
    font-weight: 900;
    color: var(--text-primary);
    animation: glow 2s ease-in-out infinite alternate;
}

.nav-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
}

.cgpa-info {
    font-size: 0.9rem;
    color: var(--text-primary);
    font-weight: 600;
    font-family: 'Rajdhani', sans-serif;
}

.grad-info {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-family: 'Exo 2', sans-serif;
}

.theme-toggle {
    background: none;
    border: 2px solid var(--text-primary);
    color: var(--text-primary);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.theme-toggle:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    transform: scale(1.1);
    box-shadow: 0 0 15px var(--glow-color);
}

.theme-toggle i {
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.theme-toggle .fa-sun {
    position: absolute;
    opacity: 0;
    transform: rotate(180deg);
}

[data-theme="light"] .theme-toggle .fa-moon {
    opacity: 0;
    transform: rotate(-180deg);
}

[data-theme="light"] .theme-toggle .fa-sun {
    opacity: 1;
    transform: rotate(0deg);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 400;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--text-primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background-color: var(--text-primary);
    margin: 3px 0;
    transition: 0.3s;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero-content {
    z-index: 2;
}

.hero-title {
    font-size: 4rem;
    font-weight: 900;
    font-family: 'Chakra Petch', sans-serif;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-weight: 400;
    font-family: 'Rajdhani', sans-serif;
}

.hero-description {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 3rem;
    line-height: 1.8;
    font-family: 'Exo 2', sans-serif;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 1rem 1rem;
    text-decoration: none;
    font-weight: 700;
    border: 2px solid var(--text-primary);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
}

.btn-primary {
    background-color: var(--text-primary);
    color: var(--bg-primary);
}

.btn-primary:hover {
    background-color: transparent;
    color: var(--text-primary);
    box-shadow: 0 0 20px var(--glow-color);
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-primary);
}

.btn-secondary:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    box-shadow: 0 0 20px var(--glow-color);
}

/* Floating Elements */
.hero-visual {
    position: relative;
    height: 400px;
}

.floating-elements {
    position: relative;
    width: 100%;
    height: 100%;
}

.floating-element {
    position: absolute;
    font-size: 2.5rem;
    animation: shooting-star-float 8s ease-in-out infinite;
    opacity: 0.9;
    color: var(--text-primary);
    text-shadow: 0 0 10px var(--glow-color);
}

.element-1 {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
    animation-duration: 6s;
}

.element-2 {
    top: 60%;
    left: 70%;
    animation-delay: 2s;
    animation-duration: 7s;
}

.element-3 {
    top: 80%;
    left: 30%;
    animation-delay: 4s;
    animation-duration: 8s;
}

.element-4 {
    top: 30%;
    left: 80%;
    animation-delay: 6s;
    animation-duration: 5s;
}

@keyframes shooting-star-float {
    0% {
        transform: translateX(-50px) translateY(0px) rotate(0deg);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translateX(50px) translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* Typing Animation */
.typing-text {
    border-right: 3px solid var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

.typing-text-delayed {
    opacity: 0;
    animation: fadeInUp 1s ease forwards 1s;
}

.typing-text-delayed-2 {
    opacity: 0;
    animation: fadeInUp 1s ease forwards 2s;
}

@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes blink-caret {
    from,
    to {
        border-color: transparent;
    }
    50% {
        border-color: var(--text-primary);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Section Styles */
section {
    padding: 5rem 0;
}

.section-title {
    font-size: 3rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: 3rem;
    background: transparent;
}

/* About Section */
.about {
    background-color: var(--bg-secondary);
    background: transparent;
}

.about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.about-bio {
    font-size: 1.3rem;
    line-height: 1.8;
    margin-bottom: 3rem;
    color: var(--text-secondary);
}

.personal-info {
    margin-bottom: 3rem;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.info-item i {
    font-size: 1.2rem;
    color: var(--text-primary);
    width: 20px;
}

.education {
    margin-bottom: 3rem;
    background: transparent;
}

.education h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
}

.education-item {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.education-item h4 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.institution {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.details {
    color: var(--text-muted);
    font-size: 1rem;
}

/* College Info Section */
.college-info {
    margin-bottom: 3rem;
}

.college-info h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
}

.college-item {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.college-item h4 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.location {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

/* Interests Section */
.interests {
    margin-bottom: 3rem;
}

.interests h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
    font-family: 'Rajdhani', sans-serif;
}

.interests-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 2rem;
}

.interest-category h4 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Rajdhani', sans-serif;
}

.interest-category p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.game-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.game-tag {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
}

.game-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.skills h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
    font-family: 'Rajdhani', sans-serif;
}

.skill-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.skill-category h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    text-align: center;
    font-family: 'Rajdhani', sans-serif;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.skill-tag {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 700;
    transition: all 0.3s ease;
    border: 2px solid var(--text-primary);
}

.skill-tag:hover {
    background-color: transparent;
    color: var(--text-primary);
    box-shadow: 0 0 15px var(--glow-color);
    transform: translateY(-2px);
}

/* Experience Section */
.experience {
    background-color: var(--bg-primary);
    background: transparent;
}

.experience-content {
    max-width: 800px;
    margin: 0 auto;
}

.experience-item {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
}

.experience-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px var(--shadow-color);
    border-color: var(--text-primary);
}

.experience-header {
    margin-bottom: 1.5rem;
}

.experience-header h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-family: 'Rajdhani', sans-serif;
}

.company {
    font-size: 1.2rem;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 0.5rem;
    font-family: 'Exo 2', sans-serif;
}

.duration {
    font-size: 1rem;
    color: var(--text-muted);
    display: block;
    font-family: 'Exo 2', sans-serif;
}

.experience-details {
    list-style: none;
    padding-left: 0;
}

.experience-details li {
    color: var(--text-secondary);
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
}

.experience-details li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--text-primary);
    font-weight: bold;
}

/* Research Section */
.research {
    background-color: var(--bg-secondary);
    background: transparent;
}

.research-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.research-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.research-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
}

.research-card:hover::before {
    left: 100%;
}

.research-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px var(--shadow-color);
    border-color: var(--text-primary);
}

.research-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    font-family: 'Rajdhani', sans-serif;
}

.research-date {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
    display: block;
}

.research-description {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Projects Section */
.projects {
    background-color: var(--bg-primary);
    background: transparent;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.project-card {
    background: linear-gradient(145deg, var(--bg-card), var(--bg-secondary));
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
}

.project-card:hover::before {
    left: 100%;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px var(--shadow-color);
    border-color: var(--text-primary);
}

.project-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
    font-family: 'Rajdhani', sans-serif;
}

.project-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.project-link {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    border: 1px solid var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 0.9rem;
}

.project-link:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    box-shadow: 0 0 15px var(--glow-color);
}

.streamlit-link {
    background: linear-gradient(45deg, #ff4b4b, #ff6b6b);
    border-color: #ff4b4b;
    color: white;
}

.streamlit-link:hover {
    background: linear-gradient(45deg, #ff6b6b, #ff4b4b);
    color: white;
    box-shadow: 0 0 15px rgba(255, 75, 75, 0.5);
}

.project-info-btn {
    background: var(--text-primary);
    color: var(--bg-primary);
    border: 1px solid var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.project-info-btn:hover {
    background: transparent;
    color: var(--text-primary);
    box-shadow: 0 0 15px var(--glow-color);
}

/* Contact Section */
.contact {
    background-color: var(--bg-secondary);
    background: transparent;
}

.contact-content {
    max-width: 800px;
    margin: 0 auto;
    background: transparent;
    text-align: center;
}

.contact-info {
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.contact-item i {
    font-size: 1.5rem;
    color: var(--text-primary);
}

.contact-item a {
    color: var(--text-primary);
    text-decoration: none;
    transition: all 0.3s ease;
}

.contact-item a:hover {
    color: var(--text-primary);
    text-shadow: 0 0 10px var(--glow-color);
}

.contact-message {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
}

/* Footer */
.footer {
    background-color: var(--bg-primary);
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
}

.footer p {
    color: var(--text-muted);
}

/* Hide CGPA info in hero by default, show in media queries */
.hero-cgpa-info {
    display: none;
}

/* Scroll Animations */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Modal Styles - Google Images Style */
.modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background-color: var(--bg-card);
    margin: 2% auto;
    padding: 0;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    width: 95%;
    max-width: 1200px;
    position: relative;
    animation: slideIn 0.3s ease;
    max-height: 96vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.modal-left {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}

.modal-right {
    width: 400px;
    background: var(--bg-secondary);
    padding: 2rem;
    border-left: 1px solid var(--border-color);
    overflow-y: auto;
}

.modal-title {
    color: var(--text-primary);
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    font-family: 'Audiowide', cursive;
}

.modal-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
}

.modal-section {
    margin-bottom: 2rem;
}

.modal-section h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    font-family: 'Rajdhani', sans-serif;
}

.modal-section ul {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.modal-section li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.modal-section .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.modal-section .tech-tag {
    background: var(--text-primary);
    color: var(--bg-primary);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.close {
    color: var(--text-muted);
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    background: none;
    border: none;
    padding: 0;
}

.close:hover,
.close:focus {
    color: var(--text-primary);
    text-shadow: 0 0 10px var(--glow-color);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* About Me Section */
.about-me {
    background-color: var(--bg-primary);
    background: transparent;
}

.about-me-content {
    max-width: 800px;
    margin: 0 auto;
}

.about-me-text p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    text-align: justify;
    font-family: 'Exo 2', sans-serif;
}

/* Shooting Stars Animation */
.shooting-stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
}

.star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: shooting-star 3s linear infinite;
}

.star:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
    animation-duration: 4s;
}

.star:nth-child(2) {
    top: 20%;
    left: 80%;
    animation-delay: 1s;
    animation-duration: 3.5s;
}

.star:nth-child(3) {
    top: 30%;
    left: 40%;
    animation-delay: 2s;
    animation-duration: 5s;
}

.star:nth-child(4) {
    top: 50%;
    left: 10%;
    animation-delay: 3s;
    animation-duration: 4.5s;
}

.star:nth-child(5) {
    top: 60%;
    left: 70%;
    animation-delay: 4s;
    animation-duration: 3s;
}

.star:nth-child(6) {
    top: 70%;
    left: 30%;
    animation-delay: 5s;
    animation-duration: 4s;
}

.star:nth-child(7) {
    top: 80%;
    left: 60%;
    animation-delay: 6s;
    animation-duration: 3.5s;
}

.star:nth-child(8) {
    top: 90%;
    left: 20%;
    animation-delay: 7s;
    animation-duration: 4.5s;
}

.star:nth-child(9) {
    top: 15%;
    left: 90%;
    animation-delay: 8s;
    animation-duration: 3s;
}

.star:nth-child(10) {
    top: 85%;
    left: 50%;
    animation-delay: 9s;
    animation-duration: 4s;
}

@keyframes shooting-star {
    0% {
        transform: translateX(0) translateY(0) rotate(0deg);
        opacity: 1;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(200px) translateY(200px) rotate(360deg);
        opacity: 0;
    }
}

/* Light mode shooting stars */
[data-theme="light"] .star {
    background: #333;
    box-shadow: 0 0 4px #333;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
    background: var(--text-primary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

/* --- Responsive Design --- */

/* Desktop Landscape (Short Height) */
@media (min-width: 926px) and (max-height: 600px) {
    .hero {
        min-height: 100vh;
        padding-top: 80px;
        background: transparent;
    }
    .hero-container {
        align-items: flex-start;
        padding-top: 2rem;
        background: transparent;
    }
    .hero-content {
        margin-top: 2rem;
        background: transparent;
    }
    .hero-title {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
    }
    .hero-subtitle {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
    }
    .hero-description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    .hero-cgpa-info {
        display: block;
        margin-top: 1rem;
        font-size: 1rem;
        color: var(--text-secondary);
        font-family: 'Exo 2', sans-serif;
    }
    .hero-cgpa-info .cgpa {
        font-weight: 600;
        color: var(--text-primary);
    }
    .hero-cgpa-info .graduation {
        margin-left: 1rem;
    }
}

/* Tablet & Mobile */
@media (max-width: 926px) {
    .hamburger {
        display: flex;
    }

    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: var(--blur-bg);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    /* Hide navbar info and show it in the hero section instead */
    .nav-info {
        display: none;
    }

    .hero-cgpa-info {
        display: block;
        margin-top: 2rem;
        font-size: 1rem;
        color: var(--text-secondary);
        font-family: 'Exo 2', sans-serif;
    }
    .hero-cgpa-info .cgpa {
        font-weight: 600;
        color: var(--text-primary);
    }
    .hero-cgpa-info .graduation {
        margin-left: 1rem;
    }

    .hero {
        padding-top: 100px;
        min-height: auto;
        padding-bottom: 4rem;
    }

    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    /* Hide the floating icons on mobile to save space and reduce distraction */
    .hero-visual {
        display: none;
    }

    .hero-title {
        font-size: 3rem;
    }

    .hero-subtitle {
        font-size: 1.3rem;
    }
    
    .hero-description {
        font-size: 1.1rem;
    }

    .hero-buttons {
        justify-content: center;
        flex-wrap: wrap;
    }

    section {
        padding: 4rem 20px;
    }

    .section-title {
        font-size: 2.5rem;
    }

    /* Ensure grids become single column */
    .projects-grid,
    .research-grid,
    .skill-categories {
        grid-template-columns: 1fr;
    }

    .skill-tags {
        justify-content: center;
    }

    /* Modal responsive design */
    .modal-content {
        width: 95%;
        margin: 2.5% auto;
        max-height: 95vh;
    }

    .modal-body {
        flex-direction: column;
        max-height: 75vh;
        overflow-y: auto;
    }

    .modal-right {
        width: 100%;
        border-left: none;
        border-top: 1px solid var(--border-color);
    }

    .modal-left,
    .modal-right {
        overflow-y: visible;
    }

    .modal-header {
        padding: 1rem 1.5rem;
    }

    .modal-left,
    .modal-right {
        padding: 1.5rem;
    }
}

/* Small Mobile */
@media (max-width: 480px) {
    body {
        font-size: 15px;
    }

    .nav-container {
        padding: 0 15px;
    }
    
    .nav-logo .logo-text {
        font-size: 1.8rem;
    }

    .hero {
        padding-top: 80px;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .hero-description {
        font-size: 1rem;
    }

    .btn {
        padding: 0.8rem 1.2rem;
        font-size: 0.9rem;
        width: 100%;
    }

    .hero-buttons a:last-of-type {
        margin-bottom: 0;
    }

    section {
        padding: 3rem 15px;
    }

    .section-title {
        font-size: 2rem;
    }

    .about-bio,
    .about-me-text p {
        font-size: 1.1rem;
    }

    .experience-item,
    .research-card,
    .project-card {
        padding: 1.5rem;
    }

    .project-title {
        font-size: 1.3rem;
    }

    .project-links {
        flex-direction: column;
        align-items: stretch;
    }

    .project-link,
    .project-info-btn {
        text-align: center;
        justify-content: center;
    }

    .modal-title {
        font-size: 1.5rem;
    }

    .modal-header,
    .modal-left,
    .modal-right {
        padding: 1rem;
    }
}

/* Landscape Mode for smaller devices */
@media (max-height: 450px) and (orientation: landscape) {
    .hero {
        padding-top: 80px;
        padding-bottom: 3rem;
        min-height: 100vh;
    }

    .nav-menu {
        top: 60px;
        max-height: calc(100vh - 60px);
        overflow-y: auto;
    }

    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }
}
