document.addEventListener('DOMContentLoaded', function () {
  // ---- PHẦN KHÔNG THAY ĐỔI: Toggle menu, smooth scroll, etc. ----
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  const setHeaderHeight = () => {
    if (header) {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-h', h + 'px');
    }
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  
  btn && btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
           const headerOffset = header.offsetHeight + 20; // Thêm khoảng trống
           const elementPosition = targetElement.getBoundingClientRect().top;
           const offsetPosition = elementPosition + window.scrollY - headerOffset;

           window.scrollTo({
               top: offsetPosition,
               behavior: "smooth"
           });
        }
        nav.classList.remove('open');
      }
    });
  });

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTop.classList.add('visible'); 
    else toTop.classList.remove('visible');
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);

  // =============================================================
  // PHƯƠNG PHÁP SCROLLSPY MỚI - ĐÁNG TIN CẬY HƠN
  // =============================================================
  const sections = ['about','experience','skills','projects','album','certificates','blog','contact']  
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNavLink = () => {
    let currentSectionId = '';
    const headerHeight = header.offsetHeight;
    const triggerPoint = window.scrollY + headerHeight + 50; // Điểm kích hoạt nằm dưới header 50px

    // Tìm section cuối cùng có vị trí top nằm trên điểm kích hoạt
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= triggerPoint) {
        currentSectionId = section.id;
        break;
      }
    }

    // Đặc biệt xử lý khi cuộn đến cuối trang
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    if (isAtBottom) {
      currentSectionId = 'contact';
    }

    // Cập nhật class 'active' cho các link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  };

  // Gọi hàm khi tải trang và mỗi khi cuộn
  highlightNavLink();
  window.addEventListener('scroll', highlightNavLink, { passive: true });
});
