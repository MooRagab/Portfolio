/* ==========================================
   Custom Cursor Logic
   ========================================== */
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Update mouse coordinates
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows cursor exactly
    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

// Render loop for smooth outline trailing
function drawCursor() {
    // Easing formula
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    if (cursorOutline) {
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
    }
    
    requestAnimationFrame(drawCursor);
}
drawCursor();

// Increase cursor outline on hover over interactive elements
const interactives = document.querySelectorAll('a, button, .mobile-toggle, input, textarea');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline && cursorDot) {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.borderColor = 'var(--secondary)';
            cursorOutline.style.boxShadow = '0 0 25px rgba(255, 0, 60, 0.6) inset, 0 0 25px rgba(255, 0, 60, 0.6)';
            
            cursorDot.style.backgroundColor = 'var(--secondary)';
            cursorDot.style.boxShadow = '0 0 10px var(--secondary), 0 0 20px var(--secondary)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorOutline && cursorDot) {
            cursorOutline.style.width = '35px';
            cursorOutline.style.height = '35px';
            cursorOutline.style.borderColor = 'var(--accent)';
            cursorOutline.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.4) inset, 0 0 15px rgba(0, 240, 255, 0.4)';
            
            cursorDot.style.backgroundColor = 'var(--primary)';
            cursorDot.style.boxShadow = '0 0 10px var(--primary), 0 0 20px var(--primary)';
        }
    });
});

/* ==========================================
   Navbar Scroll Effect
   ========================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==========================================
   Mobile Menu Toggle
   ========================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Toggle icon (bars to times)
        const icon = mobileToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

/* ==========================================
   Scroll Reveal Animations
   ========================================== */
const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // pixels before element appears
    
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
    
    // Active Navigation highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load to show elements immediately in view
setTimeout(revealOnScroll, 100);
