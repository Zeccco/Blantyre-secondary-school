// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle('active');
        }
    });
});

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        if (this.slides.length) {
            this.init();
        }
    }
    
    init() {
        this.showSlide(this.currentSlide);
        this.startAutoPlay();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    resetAutoPlay() {
        clearInterval(this.slideInterval);
        this.startAutoPlay();
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Counter animation for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-box h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.innerText);
                let currentValue = 0;
                const duration = 2000;
                const increment = targetValue / (duration / 16);
                
                const updateCounter = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                        target.innerText = Math.floor(currentValue) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = targetValue + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Form validation for contact page
function validateForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ccc';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success';
                successMsg.textContent = 'Thank you for your message. We will get back to you soon.';
                successMsg.style.cssText = `
                    background: #4CAF50;
                    color: white;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    text-align: center;
                `;
                
                form.insertBefore(successMsg, form.firstChild);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
                
                form.reset();
            }
        });
    });
}

// Gallery lightbox
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery img');
    
    if (!galleryImages.length) return;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    validateForm();
    initGallery();
});

// Sticky header with scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = 'var(--shadow)';
    }
});