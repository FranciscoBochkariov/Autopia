document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    function toggleMobileMenu() {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        document.body.classList.toggle('no-scroll');
    }
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ========== Sticky Header with Scroll Effect ==========
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    let lastScroll = 0;
    
    function handleHeaderScroll() {
        const currentScroll = window.scrollY;
        
        // Header background effect
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            
            // Hide header on scroll down
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
    
    // ========== Smooth Scrolling ==========
    function smoothScrollTo(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });

    // ========== Scroll Reveal Animations ==========
    const revealElements = document.querySelectorAll('.reveal, [class*="animate-"]');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
                
                // Remove animation classes after they play to improve performance
                if (element.classList.contains('animate-fade-up') || 
                    element.classList.contains('animate-fade-right') || 
                    element.classList.contains('animate-fade-left') ||
                    element.classList.contains('animate-scale')) {
                    setTimeout(() => {
                        element.classList.remove(
                            'animate-fade-up', 
                            'animate-fade-right', 
                            'animate-fade-left',
                            'animate-scale'
                        );
                    }, 1000);
                }
            }
        });
    }

    // ========== Contact Form Handling ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual fetch)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showToast('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.', 'success');
                this.reset();
            } catch (error) {
                showToast('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });
    }

    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && emailInput.value.includes('@')) {
                showToast('Gracias por suscribirte a nuestro boletín.', 'success');
                emailInput.value = '';
            } else {
                showToast('Por favor ingresa un correo electrónico válido.', 'error');
                emailInput.focus();
            }
        });
    }

    // ========== Parallax Effects ==========
    function setupParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            });
        }
        
        // Add parallax to about image on larger screens
        if (window.innerWidth > 992) {
            const aboutImage = document.querySelector('.about-image');
            if (aboutImage) {
                window.addEventListener('scroll', function() {
                    const scrollPosition = window.scrollY;
                    aboutImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
                });
            }
        }
    }

    // ========== Current Year in Footer ==========
    function updateFooterYear() {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
        }
    }

    // ========== Initialize Everything ==========
    function init() {
        // Set initial header state
        handleHeaderScroll();
        
        // Set up event listeners
        window.addEventListener('scroll', () => {
            handleHeaderScroll();
            checkScroll();
        });
        
        // Initial scroll check for elements in viewport
        checkScroll();
        
        // Other initializations
        setupParallax();
        updateFooterYear();
        
        // Add animation delays dynamically
        document.querySelectorAll('[class*="animate-"]').forEach((el, index) => {
            el.style.animationDelay = `${(index % 4) * 0.2}s`;
        });
    }

    init();
});

// ========== Intersection Observer for more efficient animations ==========
// This can be used as an alternative to scroll event listeners
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal, [class*="animate-"]').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Intersection Observer when DOM is loaded
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', setupIntersectionObserver);
}