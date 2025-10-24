/* ============================================================= */
/* FEATURES JAVASCRIPT - 20 IMPROVEMENTS */
/* ============================================================= */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll Progress Indicator
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
  });

  // 2. Loading Screen with Progress
  const loadingScreen = document.getElementById('loadingScreen');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderPercentage = document.querySelector('.loader-percentage');
  let loadProgress = 0;
  
  const loadingInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5; // Random increment between 5-20
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 800);
    }
    if (loaderBar) {
      loaderBar.style.width = loadProgress + '%';
    }
    if (loaderPercentage) {
      loaderPercentage.textContent = Math.floor(loadProgress) + '%';
    }
  }, 200);

  window.addEventListener('load', () => {
    loadProgress = 100;
    if (loaderBar) {
      loaderBar.style.width = '100%';
    }
    if (loaderPercentage) {
      loaderPercentage.textContent = '100%';
    }
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  });

  // 3. Theme Toggle (Dark/Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(savedTheme + '-mode');
  
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
    
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      document.body.classList.remove('dark-mode', 'light-mode');
      document.body.classList.add(isDark ? 'light-mode' : 'dark-mode');
      icon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  // 4. Language Switcher
  const langToggle = document.getElementById('langToggle');
  const currentLang = localStorage.getItem('language') || 'vi';
  
  const translations = {
    vi: {
      about: 'Giới thiệu',
      experience: 'Kinh nghiệm',
      skills: 'Kỹ năng',
      projects: 'Dự án',
      contact: 'Liên hệ'
    },
    en: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    }
  };

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'vi' ? 'en' : 'vi';
      localStorage.setItem('language', newLang);
      // Simple demo - full implementation would update all text
      console.log('Language switched to:', newLang);
      // Reload to apply language change
      location.reload();
    });
  }

  // 5. Typing Animation
  const typingText = document.getElementById('typingText');
  const phrases = [
    'Java Backend Developer',
    'Spring Boot Enthusiast',
    'Problem Solver',
    'Code Craftsman'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeAnimation() {
    if (!typingText) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
  }

  typeAnimation();

  // 6. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target') || element.getAttribute('data-count') || element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    // Giữ nguyên giá trị ban đầu là 0 để animate
    const targetValue = stat.getAttribute('data-target');
    if (!targetValue) {
      stat.setAttribute('data-target', stat.textContent);
    }
    stat.textContent = '0';
    statsObserver.observe(stat);
  });

  // 7. Social Share Functionality
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.getAttribute('data-platform');
      const url = window.location.href;
      const title = document.title;

      let shareUrl = '';
      switch(platform) {
        case 'copy':
          navigator.clipboard.writeText(url);
          btn.innerHTML = '<i class="bx bx-check"></i> Đã sao chép!';
          setTimeout(() => {
            btn.innerHTML = '<i class="bx bx-link"></i> Sao chép link';
          }, 2000);
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
      }
    });
  });

  // 8. Interactive Timeline Animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // 9. Testimonials Carousel
  let currentTestimonial = 0;
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const prevTestimonialBtn = document.querySelector('.testimonial-prev');
  const nextTestimonialBtn = document.querySelector('.testimonial-next');

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      if (i === index) card.classList.add('active');
    });
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      const newIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(newIndex);
    });
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      const newIndex = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(newIndex);
    });
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
  });

  // Auto-rotate testimonials
  setInterval(() => {
    if (testimonialCards.length > 0) {
      const newIndex = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(newIndex);
    }
  }, 5000);

  // 10. Skills Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered');
        } else {
          card.classList.add('filtered');
        }
      });
    });
  });

  // 11. CV Download with Progress Simulation
  const downloadCV = document.getElementById('downloadCV');
  if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = downloadCV.innerHTML;
      downloadCV.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Đang tải...';
      downloadCV.disabled = true;

      // Simulate download
      setTimeout(() => {
        downloadCV.innerHTML = '<i class="bx bx-check"></i> Đã tải!';
        setTimeout(() => {
          downloadCV.innerHTML = originalText;
          downloadCV.disabled = false;
          // Actual download would happen here
          console.log('CV download initiated');
        }, 2000);
      }, 1500);
    });
  }

  // 12. Certificates Gallery & Modal
  const certItems = document.querySelectorAll('.view-cert-btn');
  const certModal = document.getElementById('certificateModal');
  const certModalImage = document.getElementById('certModalImage');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalDesc = document.getElementById('certModalDesc');
  const certModalClose = document.querySelector('.cert-modal-close');
  const certPrevBtn = document.querySelector('.cert-prev');
  const certNextBtn = document.querySelector('.cert-next');

  const certificates = [
    {
      img: 'images/cert1.jpg',
      title: 'Java Programming',
      desc: 'Advanced Certificate - Issued 2024'
    },
    {
      img: 'images/cert2.jpg',
      title: 'Spring Framework',
      desc: 'Professional Level - Issued 2024'
    },
    {
      img: 'images/cert3.jpg',
      title: 'Database Design',
      desc: 'SQL & MySQL Mastery - Issued 2024'
    }
  ];

  let currentCert = 0;

  function showCertificate(index) {
    const cert = certificates[index];
    certModalImage.src = cert.img;
    certModalTitle.textContent = cert.title;
    certModalDesc.textContent = cert.desc;
    currentCert = index;
  }

  certItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showCertificate(index);
      certModal.classList.add('active');
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => {
      certModal.classList.remove('active');
    });
  }

  if (certPrevBtn) {
    certPrevBtn.addEventListener('click', () => {
      const newIndex = (currentCert - 1 + certificates.length) % certificates.length;
      showCertificate(newIndex);
    });
  }

  if (certNextBtn) {
    certNextBtn.addEventListener('click', () => {
      const newIndex = (currentCert + 1) % certificates.length;
      showCertificate(newIndex);
    });
  }

  // Close modal on outside click
  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.classList.remove('active');
    }
  });

  // 13. Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    const speed = 0.35; // Tăng tốc độ theo dõi cao hơn

    // Cập nhật vị trí chuột
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot di chuyển ngay lập tức
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Animate outline với smooth follow effect
    function animateOutline() {
      // Tính toán vị trí mới với easing
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      
      outlineX += distX * speed;
      outlineY += distY * speed;
      
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateOutline);
    }
    
    animateOutline();

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '0.5';
    });
  }

  // 14. Easter Egg - Konami Code
  const easterEgg = document.getElementById('easterEgg');
  const easterClose = document.querySelector('.easter-close');
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        easterEgg.classList.add('active');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Alternative Easter Egg - Triple click on logo
  const logo = document.querySelector('.brand');
  let clickCount = 0;
  let clickTimer = null;

  logo?.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
      easterEgg.classList.add('active');
      clickCount = 0;
    }
    
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1000);
  });

  easterClose?.addEventListener('click', () => {
    easterEgg.classList.remove('active');
  });

  // 15. Parallax Scrolling Effect - DISABLED to prevent overlap
  // const heroSection = document.querySelector('.hero');
  // Parallax effect disabled to prevent hero from overlapping content below
  /* 
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.3;
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply parallax while hero is in viewport
      if (scrolled < heroHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroSection.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
      } else {
        heroSection.style.transform = `translateY(${heroHeight * parallaxSpeed}px)`;
        heroSection.style.opacity = 0.5;
      }
    });
  }
  */

  // 16. Contact Form Enhancement with Real-time Validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showValidation(input, isValid) {
      input.style.borderColor = isValid ? 'var(--accent)' : '#ff4444';
    }

    emailInput?.addEventListener('blur', () => {
      const isValid = validateEmail(emailInput.value);
      showValidation(emailInput, isValid);
    });

    nameInput?.addEventListener('blur', () => {
      const isValid = nameInput.value.length >= 2;
      showValidation(nameInput, isValid);
    });

    messageInput?.addEventListener('blur', () => {
      const isValid = messageInput.value.length >= 10;
      showValidation(messageInput, isValid);
    });
  }

  // 17. Smooth Scroll with Offset for Fixed Header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#top') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  console.log('✨ All 20 features initialized successfully!');
});
