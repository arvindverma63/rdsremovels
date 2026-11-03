/**
 * RDS Removals & Storage - Template 2 Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tab Switching on Hero Quick Quote Engine
  const tabButtons = document.querySelectorAll('.quote-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const tabType = btn.getAttribute('data-tab');
      const serviceSelect = document.getElementById('engineMoveType');
      if (serviceSelect) {
        if (tabType === 'house') serviceSelect.value = 'House Removals';
        else if (tabType === 'office') serviceSelect.value = 'Office Relocation';
        else if (tabType === 'storage') serviceSelect.value = 'Secure Storage';
      }
    });
  });

  // 2. Quote Modal Trigger Handling
  const modal = document.getElementById('quoteModal');
  const openButtons = document.querySelectorAll('.open-quote-modal, .btn-cta-quote');
  const closeButton = document.querySelector('.modal-close-trigger');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-menu-trigger');
  const navLinks = document.querySelector('.navigation-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }
});
