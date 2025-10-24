document.addEventListener('DOMContentLoaded', function() {
  // Set header height CSS variable
  function setHeaderHeight() {
    const header = document.querySelector('.site-header');
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
          }
        }
      }
    });
  });

  // Back to top button visibility
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTop.classList.add('visible');
      } else {
        toTop.classList.remove('visible');
      }
    });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scrollspy for nav highlighting
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  const observerOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: [0, 0.1, 0.25, 0.5]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menuLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Clear active when at top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      menuLinks.forEach(link => link.classList.remove('active'));
    }
  });

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === ALBUM SLIDER ===
  const slider = document.querySelector('.slider-container');
  if (slider) {
    const slides = slider.querySelector('.slides');
    const prevBtn = slider.querySelector('.arrow.prev');
    const nextBtn = slider.querySelector('.arrow.next');
    const images = slides.querySelectorAll('img');
    
    if (slides && prevBtn && nextBtn && images.length > 0) {
      let currentIndex = 0;
      const totalImages = images.length;

      slides.style.width = `${totalImages * 100}%`;
      images.forEach(img => {
        img.style.width = `calc(100% / ${totalImages})`;
      });

      function goToSlide(index) {
        const offset = -index * (100 / totalImages);
        slides.style.transform = `translateX(${offset}%)`;
      }

      nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalImages) {
          currentIndex = 0;
        }
        goToSlide(currentIndex);
      });

      prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = totalImages - 1;
        }
        goToSlide(currentIndex);
      });
      
      goToSlide(0);
    }
  }

  // === PROGRESS BARS ANIMATION ===
  const progressBars = document.querySelectorAll('.progress');
  const skillsSection = document.querySelector('#skills');
  if (skillsSection && progressBars.length > 0) {
    let animated = false;
    
    const animateProgress = () => {
      const sectionTop = skillsSection.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      
      if (sectionTop < screenHeight - 100 && !animated) {
        animated = true;
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          }
        });
      }
    };
    
    window.addEventListener('scroll', animateProgress);
    animateProgress(); // Check on load
  }

  // === CONTACT FORM POPUP ===
  const form = document.querySelector('.contact-form');
  const popup = document.getElementById('thankYouPopup');
  const closeBtn = popup?.querySelector('.close-btn');

  if (form && popup) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert("❗ Vui lòng điền đầy đủ thông tin trước khi gửi.");
        return;
      }

      // Show popup
      popup.classList.add('active');

      // Reset form
      form.reset();

      // Auto hide after 2.5s
      setTimeout(() => {
        popup.classList.remove('active');
      }, 2500);
    });

    // Close popup on button click
    closeBtn?.addEventListener('click', () => {
      popup.classList.remove('active');
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });
  }
});
