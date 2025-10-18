// ===================================
// NAVIGATION & MENU TOGGLE
// ===================================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .menu-item, .testimonial-card, .about-image-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// STAR RATING SYSTEM
// ===================================

const starRating = document.getElementById('starRating');
const ratingValue = document.getElementById('ratingValue');

if (starRating) {
    const stars = starRating.querySelectorAll('span');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingValue.value = rating;
            
            // Update star display
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.textContent = '★';
                    s.classList.add('active');
                } else {
                    s.textContent = '☆';
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = star.getAttribute('data-rating');
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        const currentRating = ratingValue.value;
        stars.forEach((s, i) => {
            if (i < currentRating) {
                s.textContent = '★';
            } else {
                s.textContent = '☆';
            }
        });
    });
}

// ===================================
// FORM VALIDATIONS & SUBMISSIONS
// ===================================

// Event Form
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(eventForm);
        const data = Object.fromEntries(formData);
        
        // Validate data
        if (!validateForm(data)) {
            return;
        }
        
        // Show success message
        showSuccessMessage('Reserva para o evento confirmada! Entraremos em contato em breve.');
        eventForm.reset();
    });
}

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData);
        
        // Validate rating
        if (!data.rating) {
            alert('Por favor, selecione uma avaliação com estrelas.');
            return;
        }
        
        // Validate other fields
        if (!validateForm(data)) {
            return;
        }
        
        // Show success message
        showSuccessMessage('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
        feedbackForm.reset();
        
        // Reset star rating
        const stars = document.querySelectorAll('#starRating span');
        stars.forEach(s => {
            s.textContent = '☆';
            s.classList.remove('active');
        });
        document.getElementById('ratingValue').value = '';
    });
}

// Reservation Form
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Validate date (must be future date)
        const selectedDate = new Date(data.data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Por favor, selecione uma data futura.');
            return;
        }
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show success message
        showSuccessMessage('Reserva confirmada! Enviaremos a confirmação para o seu e-mail.');
        reservationForm.reset();
    });
}

// ===================================
// HELPER FUNCTIONS
// ===================================

function validateForm(data) {
    // Check required fields
    for (let key in data) {
        if (data[key] === '' && key !== 'observacoes') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
    }
    
    // Validate email
    if (data.email && !validateEmail(data.email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }
    
    // Validate phone
    if (data.telefone && !validatePhone(data.telefone)) {
        alert('Por favor, insira um telefone válido.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
}

function showSuccessMessage(message) {
    // Create success modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 500px;
    `;
    
    modal.innerHTML = `
        <div style="font-size: 3rem; color: #4CAF50; margin-bottom: 1rem;">✓</div>
        <h3 style="font-family: 'Playfair Display', serif; color: #163449; margin-bottom: 1rem;">Sucesso!</h3>
        <p style="color: #555; margin-bottom: 2rem;">${message}</p>
        <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" 
                style="padding: 0.8rem 2rem; background: #476690; color: white; border: none; 
                       border-radius: 25px; cursor: pointer; font-weight: 600;">
            Fechar
        </button>
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
    `;
    
    overlay.addEventListener('click', () => {
        modal.remove();
        overlay.remove();
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
            overlay.remove();
        }
    }, 5000);
}

// ===================================
// IMAGE LAZY LOADING
// ===================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===================================
// PHONE NUMBER FORMATTING
// ===================================

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
        }
        
        e.target.value = value;
    });
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sabor Das Ondas - Website loaded successfully!');
    
    // Set minimum date for date inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Trap focus in mobile menu when open
const focusableElements = 'a[href], button, input, select, textarea';

menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        const firstFocusable = navMenu.querySelector(focusableElements);
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        menuToggle.focus();
    }
});

// ===================================
// CAROUSEL FOR HERO SECTION (OPTIONAL)
// ===================================

// If you want to add multiple hero images, uncomment and customize:
/*
const heroImages = ['exterior1.jpg', 'interior1.jpg', 'bar1.jpg'];
let currentImageIndex = 0;

function changeHeroImage() {
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = `linear-gradient(rgba(5, 11, 47, 0.5), rgba(22, 52, 73, 0.6)), url('${heroImages[currentImageIndex]}')`;
}

// Change image every 5 seconds
setInterval(changeHeroImage, 5000);
*/

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    // Remove loading class if you add a loading screen
    document.body.classList.add('loaded');
});

// ===================================
// FORM AUTOSAVE (Optional)
// ===================================

// Save form data to memory (not localStorage due to restrictions)
const formDataCache = {};

function saveFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const formData = new FormData(form);
    formDataCache[formId] = Object.fromEntries(formData);
}

function restoreFormData(formId) {
    const form = document.getElementById(formId);
    if (!form || !formDataCache[formId]) return;
    
    Object.entries(formDataCache[formId]).forEach(([key, value]) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = value;
        }
    });
}

// Auto-save form data every 30 seconds
const formsToSave = ['eventForm', 'feedbackForm', 'reservationForm'];

formsToSave.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('input', debounce(() => {
            saveFormData(formId);
        }, 1000));
        
        // Restore on page load
        restoreFormData(formId);
    }
});

console.log('✨ Sabor Das Ondas - Todas as funcionalidades carregadas com sucesso!');