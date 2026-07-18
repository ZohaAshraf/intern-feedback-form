# Intern Feedback Form

A responsive, multi-step feedback form built for the Web Dev Track Entry-Level Task (Week 2). Interns can share weekly feedback through a guided, one-question-at-a-time flow, with the data submitted to a live mock REST API.

**Live demo:** https://intern-feedback-form-ten.vercel.app/

---

## ✨ Features

- **Step-by-step wizard flow** — Name → Email → Category → Rating → Message, one question at a time, with Back/Next navigation and a progress indicator
- **Client-side validation** — inline error messages per field, no `alert()` popups
- **Live API integration** — submits via `POST` to JSONPlaceholder and fetches existing entries via `GET`
- **Full UX states** — loading (disabled button + spinner), success (shows the returned record ID), and error (friendly message, input preserved for retry)
- **Bonus features:**
  - Recent feedback feed (GET + render latest entries)
  - Live character counter with color states
  - Auto-save to `localStorage` so a refresh doesn't lose in-progress input
  - Toast notifications for errors
  - Fully responsive (375px – 1280px)

---

## 🛠 Tech Stack

Plain **HTML, CSS, and JavaScript** — no frameworks, no build step. Just open `index.html` in a browser.

## 🔌 API Used

**[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** — a free fake REST API.

I chose it because it needed zero setup or account creation, and it realistically simulates a real backend: it accepts a `POST` with a JSON body and always returns a `201` with a generated `id`, and it supports `GET` for fetching existing records. Since it's a placeholder API, it doesn't actually persist the categories/ratings I send — so the "Recent Feedback" section maps friendly sample names and messages onto the real fetched records, while the network requests and IDs themselves are genuine.

---

## 🚀 Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/ZohaAshraf/intern-feedback-form.git
   ```
2. Open `index.html` directly in your browser — no server or install required.

To test the error state: turn off your internet connection before submitting, or block `jsonplaceholder.typicode.com` in dev tools.

---

## 📸 Screenshots

| Validation errors | Success state |
|---|---|
| <img width="947" height="413" alt="ss1" src="https://github.com/user-attachments/assets/0e8a7275-da13-4323-af70-89668f94b7c6" />
 | <img width="522" height="296" alt="Screenshot 2026-07-17 234821" src="https://github.com/user-attachments/assets/b156a5f9-27b4-4dfe-a041-c38bed834809" />
| <img width="1899" height="825" alt="image" src="https://github.com/user-attachments/assets/2bb373dd-65e7-4a74-baac-91da9ebffc11" />



---

## 🧠 What I Learned / What Was Hard

_(Write this part yourself in 3–6 sentences once you've finished testing — it should reflect your actual experience. A few starting points if it helps: what surprised you about handling `fetch()` errors, whether the multi-step wizard state management was tricky, or what you'd do differently with more time.)_

---

## 📂 Project Structure

```
intern-feedback-form/
├── index.html
├── style.css
├── script.js
└── README.md
```
