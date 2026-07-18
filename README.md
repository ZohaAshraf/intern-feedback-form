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
|<img width="1895" height="838" alt="image" src="https://github.com/user-attachments/assets/83a32c29-c28e-4bb3-a901-69174803350b" />|<img width="1884" height="835" alt="ChatGPT Image Jul 18, 2026, 12_11_46 AM" src="https://github.com/user-attachments/assets/4ff708e7-3766-4ec5-9cc1-20b9aa49ab68" />|
|<img width="1023" height="585" alt="image" src="https://github.com/user-attachments/assets/7ebd10f9-b28f-4109-9f4f-6cf3be4baf83" />|<img width="1024" height="599" alt="image" src="https://github.com/user-attachments/assets/9c893699-9c1c-45cc-a013-adfd6f542d10" />|
|<img width="1016" height="593" alt="image" src="https://github.com/user-attachments/assets/a8b2007d-16d1-41fc-9b19-b4422c5bb315" />|<img width="1012" height="596" alt="image" src="https://github.com/user-attachments/assets/de0b4c14-50e5-4ed3-800f-ea0c3d8730f8" />|
|<img width="1028" height="602" alt="image" src="https://github.com/user-attachments/assets/252f1380-486a-4426-bf21-7213cf965660" />|<img width="1029" height="589" alt="image" src="https://github.com/user-attachments/assets/17274351-32b2-48c3-b67a-35a2dee24249" />|
|<img width="1032" height="591" alt="image" src="https://github.com/user-attachments/assets/4528f562-9069-4351-8b22-0c6162040cfc" />|<img width="1006" height="587" alt="image" src="https://github.com/user-attachments/assets/c2529d48-5805-4aad-b97f-4a868cf69030" />|
|<img width="1026" height="636" alt="image" src="https://github.com/user-attachments/assets/59ff1b75-5ca0-4dc3-8f74-8f0db9ec9337" />| <img width="1018" height="647" alt="image" src="https://github.com/user-attachments/assets/8f0c88b0-0a5b-47e9-a051-1522a0906bd0" />|
|<img width="1022" height="640" alt="image" src="https://github.com/user-attachments/assets/0cfb7e22-c695-4acc-86d9-7b8aca09a080" />|<img width="1028" height="587" alt="image" src="https://github.com/user-attachments/assets/2a381153-0c18-4982-8243-a439c4a8265a" />|

<img width="1884" height="835" alt="ChatGPT Image Jul 18, 2026, 12_11_46 AM" src="https://github.com/user-attachments/assets/c61c3c3c-86b6-4327-b063-1910887dffdb" />
<img width="1884" height="835" alt="ChatGPT Image Jul 18, 2026, 12_11_46 AM" src="https://github.com/user-attachments/assets/059c6f9b-3652-4d3d-8c57-9d9b705993c9" />

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
