/**
 * Mama Tunde's Bakery - Main JavaScript
 * Handles navigation, real-time opening hours, Telegram message generation,
 * menu filtering, and custom order builder.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initOpeningHours();
  initMenuFilters();
  initOrderBuilder();
  initFaqAccordion();
  initScrollHeader();
});

/* ==========================================================================
   Header Scroll State
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   Mobile Nav Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   Opening Hours & Live Status Indicator (Sunday Closed)
   ========================================================================== */
const BAKERY_HOURS = {
  // 0 = Sunday (CLOSED), 1 = Monday, ..., 6 = Saturday
  0: { dayName: 'Sunday', closed: true, display: 'Closed' },
  1: { dayName: 'Monday', open: 7 * 60 + 30, close: 19 * 60, display: '7:30 AM – 7:00 PM' },
  2: { dayName: 'Tuesday', open: 7 * 60 + 30, close: 19 * 60, display: '7:30 AM – 7:00 PM' },
  3: { dayName: 'Wednesday', open: 7 * 60 + 30, close: 19 * 60, display: '7:30 AM – 7:00 PM' },
  4: { dayName: 'Thursday', open: 7 * 60 + 30, close: 19 * 60, display: '7:30 AM – 7:00 PM' },
  5: { dayName: 'Friday', open: 7 * 60 + 30, close: 19 * 60, display: '7:30 AM – 7:00 PM' },
  6: { dayName: 'Saturday', open: 8 * 60, close: 19 * 60, display: '8:00 AM – 7:00 PM' }
};

function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m < 10 ? `0${m}` : m;
  return `${displayH}:${displayM} ${ampm}`;
}

function initOpeningHours() {
  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const schedule = BAKERY_HOURS[currentDay];
  const isOpen = !schedule.closed && currentMinutes >= schedule.open && currentMinutes < schedule.close;

  // Update all status badges
  const badges = document.querySelectorAll('.live-status-badge');
  badges.forEach((badge) => {
    badge.innerHTML = '';
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    badge.appendChild(dot);

    const textSpan = document.createElement('span');
    if (isOpen) {
      badge.classList.remove('closed');
      badge.classList.add('open');
      textSpan.textContent = `Open Now • Closes at ${formatMinutes(schedule.close)}`;
    } else {
      badge.classList.remove('open');
      badge.classList.add('closed');
      if (schedule.closed) {
        textSpan.textContent = 'Closed Today (Sunday) • Opens Mon 7:30 AM';
      } else if (currentMinutes < schedule.open) {
        textSpan.textContent = `Closed Now • Opens at ${formatMinutes(schedule.open)}`;
      } else {
        const tomorrow = (currentDay + 1) % 7;
        const tomorrowSchedule = BAKERY_HOURS[tomorrow];
        const nextTime = tomorrowSchedule.closed ? 'Mon 7:30 AM' : `tomorrow ${formatMinutes(tomorrowSchedule.open)}`;
        textSpan.textContent = `Closed Now • Opens ${nextTime}`;
      }
    }
    badge.appendChild(textSpan);
  });

  // Highlight today's row in hours table if present
  const hoursList = document.querySelector('.hours-list');
  if (hoursList) {
    const items = hoursList.querySelectorAll('.hours-item');
    items.forEach((item) => {
      const dayIndex = parseInt(item.getAttribute('data-day'), 10);
      if (dayIndex === currentDay) {
        item.classList.add('today');
      }
    });
  }
}

/* ==========================================================================
   Cake Menu Filtering (cakes.html)
   ========================================================================== */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cakeCards = document.querySelectorAll('.cake-card[data-category]');

  if (!filterBtns.length || !cakeCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cakeCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Order Builder & Custom Telegram Message (order.html)
   ========================================================================== */
function initOrderBuilder() {
  const cakeSelect = document.getElementById('orderCake');
  const sizeSelect = document.getElementById('orderSize');
  const dateInput = document.getElementById('orderDate');
  const notesInput = document.getElementById('orderNotes');
  const nameInput = document.getElementById('orderName');
  const previewBox = document.getElementById('orderPreview');
  const telegramSendBtn = document.getElementById('btnSendTelegram');

  if (!cakeSelect || !previewBox || !telegramSendBtn) return;

  // Set default minimum date to today
  if (dateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.min = todayStr;
    if (!dateInput.value) dateInput.value = todayStr;
  }

  function updateOrderMessage() {
    const cakeName = cakeSelect.value || 'Custom Cake Request';
    const size = sizeSelect ? sizeSelect.value : 'Standard';
    const date = dateInput && dateInput.value ? dateInput.value : 'Earliest Available';
    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Customer';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None';

    const message = 
`Hello Mama Tunde! 🍰 I'd like to place an order:

• Item: ${cakeName}
• Size / Servings: ${size}
• Preferred Date: ${date}
• Contact Name: ${name}
• Inscription / Notes: ${notes}

Please confirm availability and total cost. Thank you!`;

    previewBox.textContent = message;

    const telegramUsername = 'MamaTundesBakery';
    const encoded = encodeURIComponent(message);
    telegramSendBtn.href = `https://t.me/${telegramUsername}?text=${encoded}`;
  }

  // Listen for changes
  [cakeSelect, sizeSelect, dateInput, notesInput, nameInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateOrderMessage);
      elem.addEventListener('change', updateOrderMessage);
    }
  });

  // Check URL query parameters to pre-select cake if navigated from cakes page
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedCake = urlParams.get('cake');
  if (preselectedCake && cakeSelect) {
    for (let option of cakeSelect.options) {
      if (option.value.toLowerCase().includes(preselectedCake.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }

  updateOrderMessage();
}

/* ==========================================================================
   FAQ Accordion (order.html)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
