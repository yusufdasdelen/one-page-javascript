// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
    if (!menuOpen) {
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        menuOpen = true;
    } else {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOpen = false;
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOpen = false;
    });
});

// Navbar background on scroll
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.portfolio-item');
    
    parallaxElements.forEach(el => {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// Portfolio item hover effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        portfolioItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.5';
                otherItem.style.transform = 'scale(0.95)';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        portfolioItems.forEach(otherItem => {
            otherItem.style.opacity = '1';
            otherItem.style.transform = 'scale(1)';
        });
    });
});

// Form handling
const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    button.style.background = '#10B981';
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item, .about-content, .contact-container').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Video background handling
const video = document.querySelector('.video-background video');

// Play video when it's ready
video.addEventListener('canplay', () => {
    video.play();
});

// Handle video loading errors
video.addEventListener('error', () => {
    console.error('Error loading video');
    video.style.display = 'none';
});

// Lazy loading images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
    imageObserver.observe(img);
}); 