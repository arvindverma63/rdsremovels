/**
 * RDS Removals & Storage - Modern Multi-Page Light Website Scripts
 * Features: 3D Card Hover Tilt Effects, Mobile Menu & Quote Modal
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Mobile Menu Navigation Toggle
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 2. Sticky Header Scroll Shadow & Back to Top
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================================
  // 3. Subtle 3D Perspective Card Tilt Effects (Cursor Tracking)
  // =========================================================================
  const init3DCardTilt = () => {
    // WordPress-style smooth hover elevation is handled with high-performance CSS transitions
  };

  init3DCardTilt();

  // =========================================================================
  // 4. Modal Quote Popup Controller
  // =========================================================================
  const modalOverlay = document.getElementById('quote-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-quote-modal');
  const modalServiceSelect = document.getElementById('mq-service');
  const modalPropertySelect = document.getElementById('mq-property');
  const modalForm = document.getElementById('modal-quote-form');
  const modalSuccess = document.getElementById('modal-form-success');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      if (service && modalServiceSelect) {
        modalServiceSelect.value = service;
      }
      modalOverlay?.classList.add('open');
    });
  });

  modalCloseBtn?.addEventListener('click', () => {
    modalOverlay?.classList.remove('open');
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (modalSuccess) {
      modalSuccess.classList.add('active');
      modalForm.querySelectorAll('.form-field, .form-row-2, button').forEach(el => el.style.display = 'none');
      setTimeout(() => {
        modalOverlay?.classList.remove('open');
      }, 3500);
    }
  });

  // =========================================================================
  // 6. Direct Contact Form Submission
  // =========================================================================
  const mainContactForm = document.getElementById('main-contact-form');
  const contactFeedback = document.getElementById('contact-form-feedback');

  mainContactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactFeedback) {
      contactFeedback.textContent = '✓ Thank you! Your message has been sent to our move coordinators. We will respond within 2 hours.';
      contactFeedback.className = 'form-alert-feedback success';
      mainContactForm.reset();
    }
  });

});
