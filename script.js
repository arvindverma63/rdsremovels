/**
 * RDS Removals & Storage - Interactive Mockup Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close mobile nav when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 2. Sticky Header & Back to Top
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2.5 Hero Interactive Carousel Controller
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroContents = document.querySelectorAll('.hero-slide-content');
  const heroIndicators = document.querySelectorAll('.carousel-indicators .indicator');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const heroSection = document.getElementById('home');

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = heroSlides.length;
    let slideInterval = null;
    const slideDuration = 5500;
    let isPaused = false;

    const showSlide = (index) => {
      currentSlide = (index + totalSlides) % totalSlides;

      // Sync background image slides
      heroSlides.forEach((slide) => {
        const slideIdx = parseInt(slide.getAttribute('data-slide'), 10);
        if (slideIdx === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Sync text contents
      heroContents.forEach((content) => {
        const contentIdx = parseInt(content.getAttribute('data-content'), 10);
        if (contentIdx === currentSlide) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });

      // Sync indicators and animate progress bar
      heroIndicators.forEach((ind) => {
        const indIdx = parseInt(ind.getAttribute('data-index'), 10);
        ind.classList.remove('active', 'animating');
        if (indIdx === currentSlide) {
          ind.classList.add('active');
          // Restart CSS animation
          void ind.offsetWidth;
          if (!isPaused) {
            ind.classList.add('animating');
          }
        }
      });
    };

    const startAutoSlide = () => {
      clearInterval(slideInterval);
      const activeInd = document.querySelector('.carousel-indicators .indicator.active');
      if (activeInd && !isPaused) {
        activeInd.classList.add('animating');
      }
      slideInterval = setInterval(() => {
        if (!isPaused) {
          showSlide(currentSlide + 1);
        }
      }, slideDuration);
    };

    const resetAutoSlide = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    // Indicators click
    heroIndicators.forEach((ind) => {
      ind.addEventListener('click', () => {
        const targetIndex = parseInt(ind.getAttribute('data-index'), 10);
        showSlide(targetIndex);
        resetAutoSlide();
      });
    });

    // Arrow navigation
    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetAutoSlide();
      });
    }

    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetAutoSlide();
      });
    }

    // Pause on hover
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        isPaused = true;
        const activeInd = document.querySelector('.carousel-indicators .indicator.active');
        if (activeInd) {
          activeInd.classList.remove('animating');
        }
      });

      heroSection.addEventListener('mouseleave', () => {
        isPaused = false;
        resetAutoSlide();
      });

      // Touch / swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        if (Math.abs(diffX) > 50) {
          if (diffX < 0) {
            showSlide(currentSlide + 1);
          } else {
            showSlide(currentSlide - 1);
          }
          resetAutoSlide();
        }
      }, { passive: true });
    }

    // Initialize
    showSlide(0);
    startAutoSlide();
  }

  // 3. Animated Statistics Counter
  const statsSection = document.querySelector('.stats-banner');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(num => countUp(num));
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    statNumbers.forEach(num => {
      num.textContent = num.getAttribute('data-target');
    });
  }

  // 4. Interactive Cost & Volume Estimator
  const bedSlider = document.getElementById('calc-bedrooms');
  const bedValDisplay = document.getElementById('calc-bedrooms-val');
  const distSlider = document.getElementById('calc-distance');
  const distValDisplay = document.getElementById('calc-distance-val');
  const packCheckbox = document.getElementById('calc-packing-opt');
  const storageCheckbox = document.getElementById('calc-storage-opt');

  const priceDisplay = document.getElementById('calc-price-estimate');
  const volDisplay = document.getElementById('calc-vol-estimate');
  const fleetDisplay = document.getElementById('calc-fleet-estimate');
  const timeDisplay = document.getElementById('calc-time-estimate');

  const updateCalculator = () => {
    if (!bedSlider || !distSlider) return;

    const beds = parseInt(bedSlider.value, 10);
    const distance = parseInt(distSlider.value, 10);
    const hasPacking = packCheckbox ? packCheckbox.checked : false;
    const hasStorage = storageCheckbox ? storageCheckbox.checked : false;

    // Bed labels
    bedValDisplay.textContent = beds === 5 ? '5+ Bedrooms' : `${beds} Bedroom${beds > 1 ? 's' : ''}`;
    distValDisplay.textContent = `${distance} Miles`;

    // Calculation formulas
    // Average volume per bedroom (cu ft)
    const baseVolume = [0, 350, 600, 850, 1200, 1600][beds];
    volDisplay.textContent = `~${baseVolume} cu ft`;

    // Fleet configuration
    if (beds === 1) {
      fleetDisplay.textContent = 'Long Wheelbase Van + 2 Movers';
      timeDisplay.textContent = '3 - 5 Hours';
    } else if (beds === 2) {
      fleetDisplay.textContent = 'Luton Van + 2 Movers';
      timeDisplay.textContent = '4 - 6 Hours';
    } else if (beds === 3) {
      fleetDisplay.textContent = 'Luton Van + 2 Movers';
      timeDisplay.textContent = '5 - 7 Hours';
    } else if (beds === 4) {
      fleetDisplay.textContent = '2x Luton Vans + 3 Movers';
      timeDisplay.textContent = 'Full Day Move';
    } else {
      fleetDisplay.textContent = '18-Tonne Pantechnicon + 4 Movers';
      timeDisplay.textContent = '1 - 2 Days Dedicated Move';
    }

    // Pricing base
    const bedRates = [0, 320, 480, 680, 950, 1350];
    let minPrice = bedRates[beds];
    let maxPrice = Math.round(minPrice * 1.3);

    // Distance surcharge (?1.60/mile beyond 15 miles)
    if (distance > 15) {
      const distSurcharge = Math.round((distance - 15) * 1.65);
      minPrice += distSurcharge;
      maxPrice += Math.round(distSurcharge * 1.25);
    }

    // Packing service option
    if (hasPacking) {
      const packFee = [0, 120, 180, 240, 320, 420][beds];
      minPrice += packFee;
      maxPrice += packFee + 40;
    }

    // Storage 1-month option
    if (hasStorage) {
      const storageFee = [0, 95, 135, 175, 220, 290][beds];
      minPrice += storageFee;
      maxPrice += storageFee;
    }

    // Output formatted price
    priceDisplay.innerHTML = `${minPrice} - &pound;${maxPrice}`;
  };

  if (bedSlider && distSlider) {
    bedSlider.addEventListener('input', updateCalculator);
    distSlider.addEventListener('input', updateCalculator);
    if (packCheckbox) packCheckbox.addEventListener('change', updateCalculator);
    if (storageCheckbox) storageCheckbox.addEventListener('change', updateCalculator);
    updateCalculator(); // initialize
  }

  // 5. Locations Interactive Filter Chips
  const locationData = {
    shaftesbury: {
      title: "Shaftesbury Removals & Storage (SP7)",
      desc: "As our primary headquarters and local depot, we offer immediate priority availability for house removals, student moves, business relocations, and secure storage in Shaftesbury and surrounding villages.",
      features: ["✓ Same-day survey availability", "✓ Competitive local rates", "✓ Free box delivery for local moves"]
    },
    gillingham: {
      title: "Gillingham Dorset Removals (SP8)",
      desc: "Daily removal services operating throughout Gillingham, Peacemarsh, Wyke, and Milton-on-Stour. Dedicated moving vans for full houses or single item transfers.",
      features: ["✓ Daily vans in Gillingham", "✓ Flexible booking dates", "✓ Key-wait protection included"]
    },
    warminster: {
      title: "Warminster & Wiltshire Removals (BA12)",
      desc: "Extensive moving solutions for domestic properties and military relocation moves in Warminster, Westbury, and surrounding Wiltshire villages.",
      features: ["✓ Military & civilian moves", "✓ Heavy furniture specialists", "✓ Fragile china packing"]
    },
    westbury: {
      title: "Westbury & White Horse Removals (BA13)",
      desc: "Professional moving crew operating regular runs across Westbury, Dilton Marsh, and Bratton. Fully insured transport directly to your new destination.",
      features: ["✓ Modern air-ride vehicles", "✓ Uniformed polite staff", "✓ Clean storage holding available"]
    },
    frome: {
      title: "Frome Removals & Relocations (BA11)",
      desc: "Reliable moving services throughout Frome and Somerset. Handling period cottages, steep access lanes, townhouses and creative studio spaces with utmost expertise.",
      features: ["✓ Tight-access vehicle options", "✓ Antique & art protection", "✓ Eco-friendly packing materials"]
    },
    wincanton: {
      title: "Wincanton Removals & Storage (BA9)",
      desc: "Conveniently situated along the A303 corridor, RDS provides smooth residential and commercial relocations in Wincanton, Templecombe and Henstridge.",
      features: ["✓ Direct A303 logistics route", "✓ Modern storage facility", "✓ Transparent fixed prices"]
    },
    yeovil: {
      title: "Yeovil Removals & Logistics (BA20/BA21)",
      desc: "Comprehensive home removals, apartment relocations and commercial moves throughout Yeovil and South Somerset. Dependable team, always on time.",
      features: ["✓ Commercial & home moves", "✓ Full dismantle and reassemble", "✓ Free in-home video survey"]
    },
    salisbury: {
      title: "Salisbury Removals & Storage (SP1/SP2)",
      desc: "Regular residential moves and office relocations connecting Salisbury with Dorset, Wiltshire, London and nationwide destinations.",
      features: ["✓ Cathedral city access experts", "✓ Full insurance coverage", "✓ Short & long term storage"]
    },
    bath: {
      title: "Bath & Bristol Relocations (BA1/BA2)",
      desc: "Specialists in moving clients into and out of Bath and Bristol. Experienced in managing parking suspensions, Georgian staircases, and historic property access.",
      features: ["✓ Grade-listed property specialists", "✓ Piano & delicate item movers", "✓ Dedicated removal coordinators"]
    },
    nationwide: {
      title: "Nationwide Removals — Anywhere in Great Britain",
      desc: "Relocating from Dorset, Wiltshire, Somerset or anywhere in the South West to London, Manchester, Scotland, Wales or the Coast? Our direct dedicated fleet guarantees safe delivery.",
      features: ["✓ Direct GPS-tracked vehicles", "✓ Return-load discounted options", "✓ Overnight and scheduled delivery"]
    }
  };

  const locationChips = document.querySelectorAll('.location-chip');
  const locTitle = document.getElementById('loc-banner-title');
  const locDesc = document.getElementById('loc-banner-desc');
  const locQuoteBtn = document.getElementById('loc-quote-btn');

  locationChips.forEach(chip => {
    chip.addEventListener('click', () => {
      locationChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const town = chip.getAttribute('data-town');
      const data = locationData[town];

      if (data && locTitle && locDesc) {
        locTitle.textContent = data.title;
        locDesc.textContent = data.desc;
        const featuresContainer = document.querySelector('.loc-banner-features');
        if (featuresContainer && data.features) {
          featuresContainer.innerHTML = data.features.map(f => `<span>${f}</span>`).join('');
        }
        if (locQuoteBtn) {
          locQuoteBtn.textContent = `Quote for ${chip.querySelector('strong').textContent} Move`;
        }
      }
    });
  });

  // 6. Testimonials Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');
  let currentSlide = 0;
  let slideInterval = null;

  if (slides.length > 0 && dotsContainer) {
    // Generate dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    };

    const showSlide = (n) => {
      slides.forEach(slide => slide.classList.remove('active'));
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      updateDots();
    };

    const goToSlide = (n) => {
      showSlide(n);
      resetAutoPlay();
    };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    const startAutoPlay = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoPlay = () => {
      clearInterval(slideInterval);
      startAutoPlay();
    };

    startAutoPlay();
  }

  // 7. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 8. Quote Modal System
  const modalOverlay = document.getElementById('quote-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-quote-modal');
  const modalServiceSelect = document.getElementById('mq-service');
  const modalForm = document.getElementById('modal-quote-form');
  const modalSuccess = document.getElementById('modal-form-success');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceParam = btn.getAttribute('data-service');
      if (serviceParam && modalServiceSelect) {
        modalServiceSelect.value = serviceParam;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submission handler for modal
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Processing Request...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (modalSuccess) {
          modalForm.style.display = 'none';
          modalSuccess.classList.add('show');
        }
      }, 700);
    });
  }

  // 9. Quick Hero Quote Form Handler
  const quickHeroForm = document.getElementById('hero-quick-quote-form');
  if (quickHeroForm) {
    quickHeroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quickHeroForm.querySelector('button[type="submit"]');
      const from = document.getElementById('hq-from').value;
      const to = document.getElementById('hq-to').value;
      const phone = document.getElementById('hq-phone').value;

      submitBtn.innerHTML = '<span>✓ Request Received!</span>';
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        alert(`Thank you! Moving inquiry from ${from} to ${to} received. Our coordinator will contact ${phone} shortly.`);
        quickHeroForm.reset();
        submitBtn.innerHTML = '<span>Calculate &amp; Request Callback</span>';
        submitBtn.style.background = '';
      }, 500);
    });
  }

  // 10. Contact Section Form Handler
  const contactForm = document.getElementById('contact-form');
  const formStatusAlert = document.getElementById('form-status-alert');

  if (contactForm && formStatusAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Sending Message...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatusAlert.className = 'form-status-alert success';
        formStatusAlert.innerHTML = '<strong>✓ Message Received!</strong> Thank you for contacting RDS Removals. We will respond within 2 working hours.';
        contactForm.reset();
        submitBtn.innerHTML = '<span>Submit Message</span>';
        submitBtn.disabled = false;
      }, 600);
    });
  }

});
