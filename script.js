// Memastikan semua fungsi interaktif ada di global scope agar bisa dipanggil dari HTML
window.scrollToWork = function(event) {
    event.preventDefault();
    createRipple(event);
    setTimeout(() => {
        alert('🚀 Navigating to portfolio section...');
    }, 300);
};

window.scrollToContact = function(event) {
    event.preventDefault();
    createRipple(event);
    setTimeout(() => {
        alert('📧 Opening contact form...');
    }, 300);
};

window.downloadCV = function(event) {
    event.preventDefault();
    createRipple(event);
    setTimeout(() => {
        alert('📄 CV download will be available soon!');
    }, 300);
};

window.viewProject = function(projectName) {
    alert(`🔍 Viewing project: ${projectName}\n\nThis would open the project details or live demo.`);
};

window.viewCode = function(projectName) {
    alert(`💻 Viewing code for: ${projectName}\n\nThis would open the GitHub repository.`);
};

window.viewDesign = function(projectName) {
    alert(`🎨 Viewing design for: ${projectName}\n\nThis would open the design files or prototype.`);
};

window.loadMoreProjects = function() {
    alert('📂 Loading more projects...\n\nThis would load additional portfolio items.');
};

window.subscribeNewsletter = function() {
    const email = document.getElementById('newsletterEmail').value;
    if (email && email.includes('@')) {
        alert(`✅ Thank you for subscribing!\n\nWe'll send updates to: ${email}`);
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('⚠️ Please enter a valid email address.');
    }
};

// Fungsi utilitas yang tidak perlu diakses dari HTML
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Fungsi-fungsi yang harus dijalankan setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const texts = [
        "a web developer and designer",
        "a creative problem solver",
        "Economics Student",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    
    function typeText() {
        if (!typingElement) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    setTimeout(typeText, 2000);

    // Mouse Follower
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFollower() {
        if (cursorFollower) {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Parallax Effect for Particles
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 50;
            const yPos = (y - 0.5) * speed * 50;
            particle.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });

    // Back to Top Functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Social Link Interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('data-platform');
            alert(`🔗 Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile...\n\nThis would redirect to the actual social media profile.`);
        });
    });

    // Smooth Scrolling for Navbar and Footer Links
    document.querySelectorAll('.nav-link[href^="#"], .footer-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Skills Animation on scroll
    const animateSkillsOnScroll = () => {
        const skillItems = document.querySelectorAll('.tech-showcase-item');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(item);
        });
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalCount = parseInt(target.getAttribute('data-count'));
                    animateCounter(target, finalCount);
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(stat => statsObserver.observe(stat));
    };

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 40);
    }
    
    animateSkillsOnScroll();

    // Portfolio Filter Functionality
    const initPortfolioFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hidden');
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 100);
                    } else {
                        setTimeout(() => {
                            item.classList.add('hidden');
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 400);
                        }, index * 50);
                    }
                });
            });
        });
    };
    initPortfolioFilters();

    // Initialize all functions when DOM is loaded
    updateCurrentYear();
});

// Update Current Year
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}