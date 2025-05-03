// =============== DOM Elements =============== 
const navbar = document.getElementById('navbar');
const customCursor = document.getElementById('custom-cursor');
const mobileMenuToggle = document.querySelector('.mobile-toggle button');
const mobileMenu = document.querySelector('.mobile-menu');
const contactForm = document.getElementById('contact-form');
const currentYearElement = document.getElementById('current-year');
const particlesCanvas = document.getElementById('particles-bg');

// =============== Initialization ===============
document.addEventListener('DOMContentLoaded', () => {
  // Initialize current year in footer
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize particles background
  if (particlesCanvas) {
    initParticlesBackground();
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize glitch effect on title
  initGlitchEffect();
  
  // Contact form initialization
  if (contactForm) {
    initContactForm();
  }
});

// =============== Navigation Functions ===============
// Smooth scrolling for navigation links
document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = button.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      // Scroll to section
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============== Custom Cursor ===============
// Only enable custom cursor for non-touch devices
if (!('ontouchstart' in window) && customCursor) {
  customCursor.classList.remove('hidden');
  
  // Smooth cursor movement
  let cursorPosition = { x: 0, y: 0 };
  let cursorTarget = { x: 0, y: 0 };
  
  document.addEventListener('mousemove', (e) => {
    cursorTarget.x = e.clientX;
    cursorTarget.y = e.clientY;
  });
  
  document.addEventListener('mouseleave', () => {
    customCursor.classList.add('hidden');
  });
  
  document.addEventListener('mouseenter', () => {
    customCursor.classList.remove('hidden');
  });
  
  function updateCursor() {
    // Smooth interpolation
    cursorPosition.x += (cursorTarget.x - cursorPosition.x) * 0.1;
    cursorPosition.y += (cursorTarget.y - cursorPosition.y) * 0.1;
    
    customCursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%)`;
    
    requestAnimationFrame(updateCursor);
  }
  
  requestAnimationFrame(updateCursor);
}

// =============== Particles Background ===============
function initParticlesBackground() {
  const ctx = particlesCanvas.getContext('2d');
  const particles = [];
  const colors = ['#00FFFF', '#9D00FF', '#FF00F5'];
  const particleCount = 40; // Reduced count for better performance
  
  // Set canvas dimensions
  function setCanvasDimensions() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 2 + 1;
    
    const particle = {
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      size,
      speedX: (Math.random() - 0.5) * 0.7, // Reduced speed
      speedY: (Math.random() - 0.5) * 0.7, // Reduced speed
      color: colors[Math.floor(Math.random() * colors.length)],
      connections: []
    };
    
    particles.push(particle);
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > particlesCanvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > particlesCanvas.height) {
        particle.speedY *= -1;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    
    // Calculate connections between particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.connections = [];
      
      for (let j = i + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const opacity = 1 - distance / 120;
          
          // Draw connection
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = '#00FFFF';
          ctx.globalAlpha = opacity * 0.15; // Reduced opacity
          ctx.lineWidth = 0.8; // Thinner lines
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// =============== Glitch Effect ===============
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch-part1, .glitch-part2');
  
  glitchElements.forEach(element => {
    // Set data-text attribute for pseudo-elements
    const text = element.textContent;
    element.setAttribute('data-text', text);
  });
  
  // Screen glitch effect
  const glitchContainer = document.querySelector('.glitch-container');
  if (glitchContainer) {
    setInterval(() => {
      // Random chance to apply glitch
      if (Math.random() > 0.95) {
        glitchContainer.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 5}px)`;
        
        setTimeout(() => {
          glitchContainer.style.transform = 'translate(0, 0)';
        }, 100);
      }
    }, 2000);
  }
}

// =============== Contact Form ===============
function initContactForm() {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const subject = contactForm.querySelector('#subject').value;
    const message = contactForm.querySelector('#message').value;
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // In a real implementation, you would send the form data to a server here
    // For now, we'll just show a success message
    alert('Message sent successfully! (Demo functionality)');
    contactForm.reset();
  });
}

// =============== Scroll Animations ===============
function initScrollAnimations() {
  const animateOnScroll = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  };
  
  const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });
  
  // Observe elements with animation class
  document.querySelectorAll('.section-title, .service-card, .about-content > div, .project-card').forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .scroll-animate {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .scroll-animate.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}