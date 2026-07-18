// ============================================
// Element references
// ============================================
const homeView = document.getElementById('home-view');
const startBtn = document.getElementById('start-btn');
const wizardView = document.getElementById('wizard-view');

const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const categoryInput = document.getElementById('category');
const messageInput = document.getElementById('message');
const ratingInput = document.getElementById('rating');

const pillOptions = document.querySelectorAll('.pill-option');
const emojiButtons = document.querySelectorAll('.emoji-btn');
const ratingCaption = document.getElementById('rating-caption');
const charCounter = document.getElementById('char-counter');

const steps = Array.from(document.querySelectorAll('.step'));
const stepOrder = ['name', 'email', 'category', 'rating', 'message'];
const dots = document.querySelectorAll('.dot');

const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const spinner = document.getElementById('spinner');
const btnLabel = submitBtn.querySelector('.btn-label');

const successPanel = document.getElementById('success-panel');
const successHeading = document.getElementById('success-heading');
const successSub = document.getElementById('success-sub');
const resetBtn = document.getElementById('reset-btn');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const toastClose = document.getElementById('toast-close');

const recentList = document.getElementById('recent-list');
const recentCount = document.getElementById('recent-count');

const RATING_CAPTIONS = { 1: 'Rough week', 2: 'Could be better', 3: 'Decent week', 4: 'Great week!', 5: 'Excellent week!' };
const AUTOSAVE_KEY = 'feedback-form-draft';

let currentStep = 0;

// ============================================
// Validation rules
// ============================================
function validateName() {
  const val = nameInput.value.trim();
  if (!val) return 'Full name is required.';
  if (val.length < 3 || val.length > 50) return 'Name must be 3–50 characters.';
  return '';
}
function validateEmail() {
  const val = emailInput.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) return 'Email is required.';
  if (!re.test(val)) return 'Please enter a valid email address.';
  return '';
}
function validateCategory() {
  return categoryInput.value ? '' : 'Please select a category.';
}
function validateRating() {
  return ratingInput.value ? '' : 'Please rate your week.';
}
function validateMessage() {
  const val = messageInput.value.trim();
  if (!val) return 'Message is required.';
  if (val.length < 10) return 'Message must be at least 10 characters.';
  if (val.length > 500) return 'Message cannot exceed 500 characters.';
  return '';
}

const VALIDATORS = {
  name: validateName,
  email: validateEmail,
  category: validateCategory,
  rating: validateRating,
  message: validateMessage
};

function showError(fieldName, message) {
  const errorEl = document.getElementById(`error-${fieldName}`);
  errorEl.textContent = message;
}

function runValidator(fieldName) {
  const message = VALIDATORS[fieldName]();
  showError(fieldName, message);
  return message === '';
}

// ============================================
// Wizard navigation
// ============================================
function showStep(index) {
  steps.forEach(stepEl => {
    stepEl.hidden = stepEl.dataset.stepName !== stepOrder[index];
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('current', i === index);
    dot.classList.toggle('completed', i < index);
  });

  backBtn.hidden = index === 0;
  const isLastStep = index === stepOrder.length - 1;
  nextBtn.hidden = isLastStep;
  submitBtn.hidden = !isLastStep;
}

nextBtn.addEventListener('click', () => {
  const fieldName = stepOrder[currentStep];
  if (!runValidator(fieldName)) return;
  currentStep++;
  showStep(currentStep);
  saveDraft();
});

backBtn.addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
});

startBtn.addEventListener('click', () => {
  homeView.hidden = true;
  wizardView.hidden = false;
  currentStep = 0;
  showStep(0);
});

// Real-time inline validation while typing/blurring current field
nameInput.addEventListener('blur', () => runValidator('name'));
emailInput.addEventListener('blur', () => runValidator('email'));
messageInput.addEventListener('blur', () => runValidator('message'));

// ============================================
// Character counter
// ============================================
messageInput.addEventListener('input', () => {
  const len = messageInput.value.length;
  charCounter.textContent = `${len} / 500`;
  charCounter.classList.remove('warn', 'over');
  if (len > 500) charCounter.classList.add('over');
  else if (len >= 400) charCounter.classList.add('warn');
  saveDraft();
});

// ============================================
// Category pills
// ============================================
pillOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    pillOptions.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    categoryInput.value = btn.dataset.value;
    showError('category', '');
    saveDraft();
  });
});

// ============================================
// Emoji rating
// ============================================
emojiButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    emojiButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    ratingInput.value = btn.dataset.value;
    ratingCaption.textContent = RATING_CAPTIONS[btn.dataset.value];
    showError('rating', '');
    saveDraft();
  });
});

[nameInput, emailInput].forEach(el => el.addEventListener('input', saveDraft));

// ============================================
// Autosave to localStorage
// ============================================
function saveDraft() {
  const draft = {
    name: nameInput.value,
    email: emailInput.value,
    category: categoryInput.value,
    rating: ratingInput.value,
    message: messageInput.value,
    step: currentStep
  };
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(draft));
  } catch (e) {
    // localStorage unavailable (e.g. private browsing) — fail silently
  }
}

function restoreDraft() {
  let draft;
  try {
    draft = JSON.parse(localStorage.getItem(AUTOSAVE_KEY));
  } catch (e) {
    return;
  }
  if (!draft) return;

  nameInput.value = draft.name || '';
  emailInput.value = draft.email || '';
  messageInput.value = draft.message || '';
  charCounter.textContent = `${messageInput.value.length} / 500`;

  if (draft.category) {
    categoryInput.value = draft.category;
    const match = document.querySelector(`.pill-option[data-value="${draft.category}"]`);
    if (match) { match.classList.add('active'); match.setAttribute('aria-checked', 'true'); }
  }
  if (draft.rating) {
    ratingInput.value = draft.rating;
    const match = document.querySelector(`.emoji-btn[data-value="${draft.rating}"]`);
    if (match) {
      match.classList.add('active');
      match.setAttribute('aria-checked', 'true');
      ratingCaption.textContent = RATING_CAPTIONS[draft.rating];
    }
  }
}

function clearDraft() {
  try { localStorage.removeItem(AUTOSAVE_KEY); } catch (e) { /* noop */ }
}

// ============================================
// Toast
// ============================================
let toastTimer = null;
function showToast(message) {
  toastMessage.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
}
toastClose.addEventListener('click', () => { toast.hidden = true; clearTimeout(toastTimer); });

// ============================================
// Form submit
// ============================================
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const results = Object.keys(VALIDATORS).map(runValidator);
  if (!results.every(Boolean)) return;

  setLoading(true);

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    category: categoryInput.value,
    rating: ratingInput.value,
    message: messageInput.value.trim()
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    handleSuccess(payload.name, payload.category, payload.message, data.id);
  } catch (err) {
    showToast('Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  spinner.hidden = !isLoading;
  btnLabel.textContent = isLoading ? 'Sending...' : 'Submit Feedback';
}

function handleSuccess(name, category, message, id) {
  form.hidden = true;
  document.getElementById('progress-dots').hidden = true;
  successHeading.textContent = `Thanks, ${name.split(' ')[0]}!`;
  successSub.textContent = `Your feedback was saved successfully — Reference ID #${id}.`;
  successPanel.hidden = false;
  clearDraft();
  prependRecentEntry(name, category, message);
}

resetBtn.addEventListener('click', () => {
  form.reset();
  pillOptions.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
  emojiButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
  categoryInput.value = '';
  ratingInput.value = '';
  ratingCaption.textContent = '';
  charCounter.textContent = '0 / 500';
  document.querySelectorAll('.error-text').forEach(e => e.textContent = '');

  form.hidden = false;
  document.getElementById('progress-dots').hidden = false;
  successPanel.hidden = true;

  wizardView.hidden = true;
  homeView.hidden = false;
});

// ============================================
// Recent feedback (GET latest 5 — bonus feature)
// A real GET request is made to the mock API for the required IDs,
// but since JSONPlaceholder only returns placeholder Latin text,
// realistic English names/messages are mapped onto each real record
// so the feed reads naturally.
// ============================================
const SAMPLE_NAMES = ['Ayesha Raza', 'Hamza Tariq', 'Meher Fatima', 'Bilal Rauf', 'Fatima Noor', 'Usman Ali'];
const SAMPLE_ENTRIES = [
  { category: 'General', preview: 'The new task board made it a lot easier to track my progress this week.' },
  { category: 'Bug report', preview: 'The upload button froze when I tried attaching a screenshot over 5MB.' },
  { category: 'Suggestion', preview: "It'd help to get access to session recordings earlier in the day." },
  { category: 'General', preview: 'Really enjoyed the mentorship session — learned a lot about component design.' },
  { category: 'Bug report', preview: "The submit button doesn't show a loading state on slower connections." },
  { category: 'Suggestion', preview: 'Could we get a dedicated channel for sharing UI inspiration?' }
];
const TIME_LABELS = ['2 hours ago', '5 hours ago', 'Yesterday', 'Yesterday', '2 days ago', '3 days ago'];

function pillClass(category) {
  return category.replace(' ', '-');
}

function renderRecentCard({ name, category, preview, time }) {
  const card = document.createElement('div');
  card.className = 'recent-card';
  card.innerHTML = `
    <div class="recent-card-top">
      <span class="recent-name-row">${name} <span class="pill ${pillClass(category)}">${category}</span></span>
      <span class="recent-time">${time}</span>
    </div>
    <p class="recent-preview">${preview}</p>
  `;
  return card;
}

function prependRecentEntry(name, category, message) {
  const card = renderRecentCard({ name, category, preview: message, time: 'Just now' });
  recentList.prepend(card);
  const count = recentList.querySelectorAll('.recent-card').length;
  recentCount.textContent = `${count} total`;
}

async function loadRecentFeedback() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    if (!response.ok) throw new Error('Failed to load recent feedback');
    const posts = await response.json();

    recentList.innerHTML = '';
    posts.forEach((post, i) => {
      const sample = SAMPLE_ENTRIES[i % SAMPLE_ENTRIES.length];
      const card = renderRecentCard({
        name: SAMPLE_NAMES[i % SAMPLE_NAMES.length],
        category: sample.category,
        preview: sample.preview,
        time: TIME_LABELS[i] || 'Earlier'
      });
      recentList.appendChild(card);
    });
    recentCount.textContent = `${posts.length} total`;
  } catch (err) {
    recentList.innerHTML = '<p class="recent-loading">Couldn\'t load recent feedback right now.</p>';
  }
}

// ============================================
// Init
// ============================================
restoreDraft();
loadRecentFeedback();
