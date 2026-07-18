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
|<img width="1020" height="595" alt="image" src="https://github.com/user-attachments/assets/880e2e7d-2df5-4d08-b506-1858fe6fa5de" />|<img width="1033" height="602" alt="image" src="https://github.com/user-attachments/assets/1c8e096e-b127-461f-984a-531d9f5c74a4" />|

|<img width="1029" height="602" alt="image" src="https://github.com/user-attachments/assets/156f7065-76ef-4918-8d84-dd9c4f180220" />|<img width="1037" height="595" alt="image" src="https://github.com/user-attachments/assets/53c3651b-475e-4c13-b4dd-3ee536b01f1a" />|

|<img width="1033" height="602" alt="image" src="https://github.com/user-attachments/assets/27f02bfa-6b49-42c5-86c3-018006bd5816" />|<img width="1028" height="591" alt="image" src="https://github.com/user-attachments/assets/689cb4e5-40da-459a-9d33-37d52444d787" />|

|<img width="1035" height="564" alt="image" src="https://github.com/user-attachments/assets/0e1e2f6d-1ef1-4dcb-a578-dc2da608bc77" />  | <img width="1014" height="594" alt="image" src="https://github.com/user-attachments/assets/b3dc21ca-50b2-44a8-93a0-3094d8ea2d3b" /> |

|<img width="1040" height="654" alt="image" src="https://github.com/user-attachments/assets/36ad9f9d-07ca-4605-98e2-1b6e3d2943a4" />  | <img width="1013" height="588" alt="image" src="https://github.com/user-attachments/assets/d73a707b-fb90-43c4-bfb8-b040f7c67476" /> |

|<img width="1014" height="658" alt="image" src="https://github.com/user-attachments/assets/d5731063-6fc3-4f79-800c-d53271f5285c" />  | <img width="1032" height="587" alt="image" src="https://github.com/user-attachments/assets/a48a2fc7-9c1b-4fd1-9cf0-daecc8b7633e" /> |


---

## 🧠 What I Learned / What Was Hard

This was my first time actually connecting a form to a real API call instead of just logging data to the console, and it made a few things click that I only understood in theory before, like why response.ok needs to be checked manually since fetch() won't throw an error on its own for a 404 or 500. The trickiest part was managing the multi-step form, keeping track of which question the user is on, validating only the current field before letting them move to the next one, and making sure the Back button didn't accidentally wipe out answers they'd already filled in. I also didn't expect the loading state to be so easy to mess up — in my first attempt the button could get clicked twice while a request was still in progress, so I had to add the disabled state properly. If I had more time, I'd probably add proper form-wide keyboard navigation and maybe store submissions in a real database instead of a mock API so the "Recent Feedback" section could show actual live data.

---

## 📂 Project Structure

```
intern-feedback-form/
├── index.html
├── style.css
├── script.js
└── README.md
```
