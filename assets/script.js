// Existing code for theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// JavaScript to toggle the mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuButton = document.getElementById('close-menu-button');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// Navigation dots functionality
function initNavigationDots() {
    const sectionNav = document.getElementById('section-nav');
    const navDots = sectionNav.querySelectorAll('.nav-dot');
    const navIndicator = document.querySelector('.nav-indicator');

    function updateActiveDot() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.gradient-bg');

        if (scrollPosition < heroSection.offsetHeight - 100) {
            setActiveDot('hero');
            return;
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveDot(section.id);
            }
        });
    }

    function setActiveDot(sectionId) {
        navDots.forEach(dot => {
            const dotSection = dot.getAttribute('data-section');
            if (dotSection === sectionId) {
                dot.classList.add('active');
                const dotPosition = dot.offsetTop + dot.offsetHeight / 2;
                navIndicator.style.height = `${dotPosition}px`;
            } else {
                dot.classList.remove('active');
            }
        });
    }

    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('data-section');
            let targetElement;

            if (targetId === 'hero') {
                targetElement = document.querySelector('.gradient-bg');
            } else {
                targetElement = document.getElementById(targetId);
            }

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveDot();
                scrollTimeout = null;
            }, 10);
        }
    });

    updateActiveDot();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    const textChangeElement = document.getElementById('dynamic-text');
    const textOptions = ['Frontend Developer', 'Designer', 'Creator'];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = textOptions[textIndex];
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            if (charIndex > 0) {
                charIndex--;
                textChangeElement.innerHTML = currentText.substring(0, charIndex) + '<span class="letter-change">|</span>';
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % textOptions.length;
                currentText = textOptions[textIndex];
            }
        } else {
            if (charIndex < currentText.length) {
                charIndex++;
                textChangeElement.innerHTML = currentText.substring(0, charIndex) + '<span class="letter-change">|</span>';
            } else {
                isDeleting = true;
            }
        }
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }

    typeEffect();

    // Initialize navigation dots
    initNavigationDots();

    // Initialize projects
    createProjectCards();

    // Initialize timeline
    const journey = new JourneyTimeline();
    journey.renderTimeline();
});

// Project data array
const projects = [{
    title: "Hotel Management System",
    description: "A full-featured hotel management system with real-time inventory management and secure payment processing.",
    image: "https://storage.googleapis.com/a1aa/image/YxYhD6aiuUtTs0hw2u8DfVAluYc_LSc3rQ-4eufigR8.jpg",
    tags: ["HTML", "CSS", "JAVASCRIPT", "JAVA", "MYSQL"],
    demoLink: "#",
    sourceLink: "#"
}, {
    title: "My Portfolio",
    description: "A portfolio is a collection of work samples, projects, or documents that showcase an individual's skills, experiences, and accomplishments in a particular field.",
    image: "https://storage.googleapis.com/a1aa/image/LKteYyc8LsyOV26KI7I47TaR7lU_2ffhwZKvsHcVdhE.jpg",
    tags: ["Javascript", "HTML", "Tailwind CSS"],
    demoLink: "#",
    sourceLink: "#"
}, {
    title: "AI-Powered Blog Platform",
    description: "A modern blogging platform with AI-powered content suggestions and SEO optimization.",
    image: "https://storage.googleapis.com/a1aa/image/j3rPUKvcevHpHKhcDhmt4rpTPlY6DDHFvQkc1yqkukE.jpg",
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
    demoLink: "#",
    sourceLink: "#"
}, {
    title: "Task Management Dashboard",
    description: "A responsive task management system with drag-and-drop functionality and real-time updates.",
    image: "https://storage.googleapis.com/a1aa/image/LKteYyc8LsyOV26KI7I47TaR7lU_2ffhwZKvsHcVdhE.jpg",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    demoLink: "#",
    sourceLink: "#"
}, {
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management and secure payment processing.",
    image: "https://storage.googleapis.com/a1aa/image/YxYhD6aiuUtTs0hw2u8DfVAluYc_LSc3rQ-4eufigR8.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    sourceLink: "#"
}, {
    title: "AI-Powered Blog Platform",
    description: "A modern blogging platform with AI-powered content suggestions and SEO optimization.",
    image: "https://storage.googleapis.com/a1aa/image/j3rPUKvcevHpHKhcDhmt4rpTPlY6DDHFvQkc1yqkukE.jpg",
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
    demoLink: "#",
    sourceLink: "#"
}];

// Function to create project cards
function createProjectCards() {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay"></div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="${project.sourceLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                        Source Code
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Initialize project navigation
    initProjectNavigation();
}

// Function to handle project navigation
function initProjectNavigation() {
    const scrollContainer = document.querySelector('.overflow-x-auto');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    // Calculate scroll amount based on card width
    const calculateScrollAmount = () => {
        const card = document.querySelector('.project-card');
        if (!card) return 400;
        return card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
    };
    
    // Update button states
    const updateButtonStates = () => {
        const isAtStart = scrollContainer.scrollLeft <= 0;
        const isAtEnd = scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth);
        
        scrollLeftBtn.disabled = isAtStart;
        scrollRightBtn.disabled = isAtEnd;
        
        scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
        scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
    };
    
    // Scroll handlers
    let isScrolling = false;
    
    scrollLeftBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        scrollContainer.scrollBy({
            left: -calculateScrollAmount(),
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
            updateButtonStates();
        }, 500);
    });
    
    scrollRightBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        scrollContainer.scrollBy({
            left: calculateScrollAmount(),
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
            updateButtonStates();
        }, 500);
    });
    
    // Listen for scroll events
    scrollContainer.addEventListener('scroll', () => {
        updateButtonStates();
    });
    
    // Listen for window resize
    window.addEventListener('resize', updateButtonStates);
    
    // Initial button state
    updateButtonStates();
}

// Journey Timeline Class
class JourneyTimeline {
    constructor() {
        this.entries = document.querySelectorAll('.timeline-entry');
        this.observer = null;
        this.codeContent = document.querySelector('.code-animation');
        this.currentTextIndex = 0;
        this.isTyping = false;
        this.setupObserver();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    this.animateTimeline(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        this.entries.forEach(entry => {
            this.observer.observe(entry);
        });
    }

    async animateTimeline(entry) {
        const type = entry.getAttribute('data-type');
        const content = entry.querySelector('.timeline-content');
        
        if (!content || this.isTyping) return;
        
        this.isTyping = true;
        
        const codeSnippets = {
            education: `// Education Journey
class Education {
constructor() {
this.degree = "Bachelor's in Computer Science";
this.university = "Tech University";
this.focus = "Web Development & UI/UX";
this.year = "2020 - Present";
}

showcase() {
return {
    skills: ["Frontend", "Backend", "UI/UX"],
    projects: 15,
    achievements: ["Dean's List", "Research Paper"]
};
}
}`,
            experience: `// Professional Experience
class Developer {
constructor() {
this.role = "Senior Frontend Developer";
this.company = "Tech Innovators";
this.years = "2022 - Present";
}

achievements() {
return [
    "Led team of 5 developers",
    "Improved site performance by 40%",
    "Implemented modern CI/CD pipeline"
];
}
}`,
            skills: `// Technical Skills
const skills = {
frontend: ["React", "Vue.js", "Angular", "TypeScript"],
backend: ["Node.js", "Express", "MongoDB"],
tools: ["Git", "Docker", "AWS", "Figma"],

showcase() {
return this.frontend
    .concat(this.backend)
    .concat(this.tools);
}
};`
        };

        const code = codeSnippets[type] || '';
        await this.typeCode(code);
        this.isTyping = false;
    }

    async typeCode(code) {
        if (!this.codeContent) return;
        
        this.codeContent.innerHTML = '';
        const lines = code.split('\n');
        
        for (let line of lines) {
            const formattedLine = this.formatCodeLine(line);
            await this.typeLine(formattedLine);
            this.codeContent.innerHTML += '\n';
            await this.sleep(100); // Increased delay between lines
        }
    }

    formatCodeLine(line) {
        // Add syntax highlighting
        return line
            .replace(/(\/\/.+)$/g, '<span class="code-comment">$1</span>')
            .replace(/\b(class|constructor|return|const|let|var|function|async|await)\b/g, '<span class="code-keyword">$1</span>')
            .replace(/(['"])(.*?)\1/g, '<span class="code-string">$1$2$1</span>')
            .replace(/\b([A-Za-z]+)(?=\()/g, '<span class="code-function">$1</span>')
            .replace(/\b([A-Za-z]+)(?=:)/g, '<span class="code-property">$1</span>');
    }

    async typeLine(line) {
        const tempDiv = document.createElement('div');
        tempDiv.className = 'code-line';
        tempDiv.innerHTML = line;
        this.codeContent.appendChild(tempDiv);
        await this.sleep(30); // Increased delay for each character
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderTimeline() {
        this.entries.forEach(entry => {
            entry.classList.remove('show');
            this.observer.observe(entry);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...

    // Initialize timeline with animation
    const timeline = new JourneyTimeline();
    timeline.renderTimeline();
});
