document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  // const btnNav = document.querySelector('.btn-mobile-nav');
  // const nav = document.querySelector('.nav');

  // btnNav.addEventListener('click', function() {
  //   navLinks.classList.toggle('nav-open');
  // });

  // 

  const header = document.querySelector(".header");
  const btnNav = document.querySelector(".btn-mobile-nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  if (header && btnNav) {
    btnNav.addEventListener("click", () => {
      header.classList.toggle("nav-open");
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      header.classList.remove('nav-open');
    });
  });
  
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Sticky Navigation
  const sectionHero = document.querySelector('.section-hero');
  const observer = new IntersectionObserver(
    function(entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '-80px'
    }
  );
  
  if (sectionHero) {
    observer.observe(sectionHero);
  }
  
  // Skills Tabs
  const tabs = document.querySelectorAll('.skills-tab');
  const contents = document.querySelectorAll('.skills-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].style.display = 'block';
    dots[index].classList.add('active');
    currentTestimonial = index;
  }
  
  if (testimonials.length > 0) {
    showTestimonial(0);
    
    nextBtn.addEventListener('click', function() {
      let nextIndex = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
      let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(prevIndex);
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showTestimonial(index);
      });
    });
  }
  
  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  // Theme Toggle
  const themeSwitch = document.getElementById('theme-switch');
  
  // Check for saved user preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      formStatus.textContent = 'Message sent successfully!';
      formStatus.classList.add('success');
      formStatus.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Hide status after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.classList.remove('success');
      }, 5000);
    });
  }
  
  // Current Year in Footer
  const yearElement = document.querySelector('.year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    });
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursorFollower.style.width = '20px';
        cursorFollower.style.height = '20px';
        cursorFollower.style.backgroundColor = 'rgba(212, 175, 55, 0.5)';
      });
      
      element.addEventListener('mouseleave', function() {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
  }
  
  // Animation on Scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.project-card, .stat-box, .skill-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.project-card, .stat-box, .skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});