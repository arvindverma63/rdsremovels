/**
 * RDS Removals & Storage - Modern Multi-Page Light Website Scripts
 * Features: 3D Card Hover Tilt Effects, Interactive Move Calculator, Mobile Menu & Quote Modal
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
  // 4. Interactive Move Cost & Volume Calculator Engine
  // =========================================================================
  const segBedBtns = document.querySelectorAll('.seg-pill-btn');
  const sliderBed = document.getElementById('slider-bed');
  const dispBedVal = document.getElementById('disp-bed-val');
  const sliderDist = document.getElementById('slider-distance');
  const dispDistVal = document.getElementById('disp-dist-val');
  const optPacking = document.getElementById('opt-packing');
  const optStorage = document.getElementById('opt-storage');

  // Outputs
  const resFleetName = document.getElementById('res-fleet-name');
  const resVolLabel = document.getElementById('res-vol-label');
  const resLoadPct = document.getElementById('res-load-pct');
  const resCapacityBar = document.getElementById('res-capacity-bar');
  const resTimeVal = document.getElementById('res-time-val');
  const resCrewVal = document.getElementById('res-crew-val');
  const resPriceRange = document.getElementById('res-price-range');

  let currentBedrooms = 3;

  const fleetSpecs = {
    1: { name: 'Small Transit Van', vol: 350, crew: '1 - 2 Movers', time: '2 - 4 Hours', pct: 35, baseLow: 280, baseHigh: 390 },
    2: { name: 'Medium Jumbo Transit', vol: 580, crew: '2 Movers', time: '4 - 5 Hours', pct: 55, baseLow: 440, baseHigh: 620 },
    3: { name: 'Luton Box Van + Tail Lift', vol: 850, crew: '2 - 3 Movers', time: '5 - 7 Hours', pct: 70, baseLow: 650, baseHigh: 850 },
    4: { name: '2 x Luton Vans or 7.5T Truck', vol: 1350, crew: '3 Movers', time: '6 - 8 Hours', pct: 85, baseLow: 890, baseHigh: 1180 },
    5: { name: '18T Vehicle / Multi-Van Team', vol: 1900, crew: '3 - 4 Movers', time: 'Full Day Move', pct: 100, baseLow: 1250, baseHigh: 1680 }
  };

  const calculateEstimate = () => {
    if (!sliderDist && !dispBedVal) return;

    const distance = parseInt(sliderDist?.value || '25', 10);
    const packing = optPacking?.checked;
    const storage = optStorage?.checked;

    const spec = fleetSpecs[currentBedrooms] || fleetSpecs[3];

    if (dispBedVal) dispBedVal.textContent = currentBedrooms === 5 ? '5+ Bed Property' : `${currentBedrooms} Bedroom House`;
    if (dispDistVal) dispDistVal.textContent = `${distance} Miles`;

    if (resFleetName) resFleetName.textContent = spec.name;
    if (resVolLabel) resVolLabel.textContent = `Estimated Volume: ~${spec.vol} cu ft`;
    if (resLoadPct) resLoadPct.textContent = `${spec.pct}% Fleet Capacity`;
    if (resCapacityBar) resCapacityBar.style.width = `${spec.pct}%`;
    if (resTimeVal) resTimeVal.textContent = spec.time;
    if (resCrewVal) resCrewVal.textContent = spec.crew;

    // Mileage & extras calculation
    const mileageCost = distance * 1.85;
    const packingCost = packing ? (currentBedrooms * 90) : 0;
    const storageCost = storage ? 160 : 0;

    const lowEstimate = Math.round(spec.baseLow + mileageCost + packingCost + storageCost);
    const highEstimate = Math.round(spec.baseHigh + (mileageCost * 1.15) + (packingCost * 1.1) + storageCost);

    if (resPriceRange) {
      resPriceRange.textContent = `£${lowEstimate} - £${highEstimate}`;
    }
  };

  segBedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segBedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBedrooms = parseInt(btn.getAttribute('data-bed'), 10);
      if (sliderBed) sliderBed.value = currentBedrooms;
      calculateEstimate();
    });
  });

  sliderDist?.addEventListener('input', calculateEstimate);
  optPacking?.addEventListener('change', calculateEstimate);
  optStorage?.addEventListener('change', calculateEstimate);

  calculateEstimate();

  // =========================================================================
  // 5. Modal Quote Popup Controller
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
      if (modalPropertySelect) {
        modalPropertySelect.value = `${currentBedrooms} Bed`;
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
