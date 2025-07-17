
# Personal Expense Tracker (Vite + React 18 + Tailwind CSS)

A modern, offline‑first expense tracker that runs entirely in the browser, stores data in **IndexedDB**, and lets you **filter, analyse, and export** your transactions.

![screenshot](docs/demo-light.png)

---

## ✨ Key Features

| Category | Details |
|----------|---------|
| **UX** | Responsive grid layout, dark / light theme toggle, keyboard shortcuts (`/` search, **Enter** save, **Esc** cancel), toasts for success & errors, undo‑delete |
| **Filtering** | Multi‑select category dropdown, live text search, min / max amount, from / to date, dedicated **Apply** button |
| **Analytics** | Pie chart by category, daily line chart, monthly trend line chart, click‑slice filtering |
| **Export** | **CSV**, **JSON**, and PDF (data + charts only) |
| **Data** | Persistent via Dexie 4 (IndexedDB), full CRUD |
| **PWA** | Installable, offline cache, auto‑update via `vite-plugin-pwa` |

---

## 🏗 Tech Stack

* Vite 4 + React 18
* Tailwind CSS 3 (`darkMode: 'class'`)
* Dexie 4
* Recharts 2
* react-icons, React‑Toastify
* jsPDF + html2canvas (PDF export)

---

## 🚀 Getting Started

```bash
git clone <repo-url>
cd expense-tracker
npm install
npm run dev              # http://localhost:5173
```

### Build & preview

```bash
npm run build
npm run preview
```

---

## 🖥️ Project Structure

```
src/
 ├─ components/     # UI pieces
 ├─ context/        # Theme & Expense providers
 ├─ utils/          # export helpers, constants, pdf.js
 ├─ db/             # Dexie schema
 ├─ index.css       # Tailwind + custom utilities
 └─ App.jsx
```

---

## 🎨 Theming

* Theme state lives in `ThemeContext`.
* CSS variable `--accent` controls the orange highlight (light & dark values).

---

## ⌨ Keyboard Shortcuts

* `/` focus on search
* **Enter** quick‑save (forms & edit row)
* **Esc** close pop‑overs / cancel edit

---

## 📤 Exports

| Button | Output |
|--------|--------|
| **CSV**  | `expenses.csv` |
| **JSON** | `expenses.json` |
| **PDF**  | Screenshot of Summary + ExpenseList, paginated A4 |

---

## 📜 License

MIT © 2025 Tejaswini Karri & contributors
