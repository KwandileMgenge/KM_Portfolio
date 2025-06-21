// Mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile navigation
btnNavEl.addEventListener("click", function() {
  headerEl.classList.toggle("nav-open");
});

// Close mobile nav when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    if (headerEl.classList.contains("nav-open")) {
      headerEl.classList.remove("nav-open");
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener("click", function(e) {
  if (!e.target.closest(".nav") && headerEl.classList.contains("nav-open")) {
    headerEl.classList.remove("nav-open");
  }
});

btnNavEl.addEventListener("click", function() {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const target = document.querySelector(targetId);
    if (target) {
      // Close mobile navigation if open
      if (headerEl.classList.contains("nav-open")) {
        headerEl.classList.remove("nav-open");
      }
      
      // Smooth scroll to target
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function(entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px"
  }
);

if (sectionHeroEl) {
  obs.observe(sectionHeroEl);
}

// Skills tabs
const tabs = document.querySelectorAll(".skills-tab");
const tabContents = document.querySelectorAll(".skills-content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    
    // Add active class to clicked tab and corresponding content
    tab.classList.add("active");
    tabContents[index].classList.add("active");
  });
});

// Set current year in footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Form submission
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector("#name").value;
    const email = this.querySelector("#email").value;
    const message = this.querySelector("#message").value;
    
    // Here you would typically send the form data to a server
    console.log({ name, email, message });
    
    // Show success message
    alert("Thank you for your message! I'll get back to you soon.");
    
    // Reset form
    this.reset();
  });
}