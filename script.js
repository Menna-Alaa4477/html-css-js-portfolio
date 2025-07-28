// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Smooth Scrolling and Active Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add click event listeners to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Smooth scroll to section
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close hamburger menu if open
        const hamburgerMenu = document.querySelector('.menu-links');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        
        if (hamburgerMenu.classList.contains('open')) {
          hamburgerMenu.classList.remove('open');
          hamburgerIcon.classList.remove('open');
        }
      }
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Close hamburger menu when clicking outside
  document.addEventListener('click', function(e) {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (!hamburgerMenu.contains(e.target) && menuLinks.classList.contains('open')) {
      menuLinks.classList.remove('open');
      hamburgerIcon.classList.remove('open');
    }
  });
});

// Email functionality
function openEmail() {
  // Try to open email client
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.click();
  }
  
  // Show notification
  showNotification('Opening email client...');
}

function copyEmail() {
  const emailText = document.getElementById('email-text');
  const email = emailText.textContent;
  
  // Copy to clipboard
  navigator.clipboard.writeText(email).then(function() {
    showNotification('Email copied to clipboard!');
    
    // Change button text temporarily
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = '#6a82fb';
    }, 2000);
  }).catch(function(err) {
    console.error('Could not copy email: ', err);
    showNotification('Failed to copy email');
  });
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #6a82fb;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
  