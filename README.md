
# Expense Tracker (PWA, Vite + React 18 + Tailwind CSS)

A modern, offline-first personal-expense tracker that runs directly in the browser, saves data to **IndexedDB**, and lets you **analyse, filter, and export** your spending in CSV **and** JSON formats.  

Built with **Vite + React 18**, uses **Tailwind CSS** for styling, **Dexie** for storage, **Recharts** for charts, **react-icons** for UI polish, and ships as a full **Progressive Web App** (installable on desktop & mobile).

<div align="center">
  <img src="docs/demo-light.png" alt="light theme screenshot" width="700"/>
  <img src="docs/demo-dark.png" alt="dark theme screenshot" width="700"/>
</div>

---

## ✨ Features

| Category | Details |
|----------|---------|
| **UX** | Responsive layout (mobile → desktop), dark / light theme toggle (remembers preference), accessible focus rings & ARIA labels |
| **Data** | IndexedDB persistence via Dexie; CRUD operations, real-time list updates |
| **Filters** | Category, text search, min/max amount, date range |
| **Analytics** | Summary card, per-category **pie chart**, daily spend **line chart** (Recharts, auto-resizing) |
| **Export** | One-click **CSV** and **JSON** download (FileSaver) |
| **PWA** | Service-worker caching, offline fallback, install prompt; auto-update via `vite-plugin-pwa` |
| **Tooling** | Hot-reload dev server (Vite), fast production build, ESLint-ready (if you add a config) |

---

## 🛠 Tech Stack

* **Vite 4** + **React 18** (JSX, Fast Refresh)
* **Tailwind CSS 3** (`darkMode: 'class'`)
* **Dexie 4** (IndexedDB wrapper)
* **Recharts 2** (D3-based charts)
* **react-icons** (Feather icon set)
* **FileSaver 2** (client-side downloads)
* **vite-plugin-pwa** (service-worker + manifest)

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | ≥ 16 (18 recommended) |
| **npm**     | ≥ 9   `npm --version` |

### Installation

```bash
# 1 — clone
git clone https://github.com/your-org/expense-tracker-vite.git
cd expense-tracker-vite

# 2 — install deps
npm install
```

### Development server

```bash
npm run dev
# ➜ http://localhost:5173
```

Vite reloads instantly on file changes.

### Production build

```bash
npm run build          # output to dist/
npm run preview        # serve the build locally
```

> The PWA service-worker is only registered in **production** (preview mode or a real host).

---

## 📂 Project Structure

```
├─ public/                  # static assets (optional icons, favicons)
├─ index.html               # Vite entry
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ src/
│  ├─ main.jsx              # app boot / SW register
│  ├─ index.css             # Tailwind + custom vars
│  ├─ db/                   # Dexie schema
│  │   └─ index.js
│  ├─ context/
│  │   ├─ ExpenseContext.jsx
│  │   └─ ThemeContext.jsx
│  ├─ utils/
│  │   ├─ constants.js      # category list
│  │   └─ export.js         # CSV & JSON helpers
│  ├─ components/           # UI pieces
│  │   ├─ Header.jsx
│  │   ├─ ExpenseForm.jsx
│  │   ├─ FilterBar.jsx
│  │   ├─ Summary.jsx
│  │   ├─ ExpenseList.jsx
│  │   └─ ExpenseItem.jsx
│  └─ App.jsx
└─ package.json
```

---

## 🎨 Theming

* Theme state lives in `ThemeContext`.  
* `<html>` receives the `dark` class, activating Tailwind `dark:` variants.  
* Accent colour is a CSS variable `--accent` (orange in light mode, lighter orange in dark).  
  Change it in `src/index.css` to reskin the entire UI.

---

## 📈 Charts

* **Pie** = spend per category  
* **Line** = total spend per day  
* Auto-resize via `<ResponsiveContainer>`; colours are defined in `Summary.jsx`.

---

## 📤 Data Export

| Format | How |
|--------|-----|
| **CSV**  | Button in filter bar → `exportCSV()` |
| **JSON** | Button in filter bar → `exportJSON()` |

Both helpers live in `src/utils/export.js` and rely on **FileSaver** to create downloads client-side.

---

## 📱 PWA

```bash
# after build
npm run preview
# open devtools > Application > "Install"
```

* Manifest icons live in `public/` – replace `pwa-*.png` with your own.  
* `vite-plugin-pwa` is configured for **auto-update**; when you deploy a new build, clients silently fetch the latest assets and activate on the next visit.

---

## 📝 Roadmap / Ideas

* Budget targets & monthly roll-over  
* Multi-currency with live FX rates  
* User auth + cloud sync (Supabase?)  
* Unit tests (Vitest / React Testing Library)  
* CI/CD (GitHub Actions)  

Contributions welcome!

---

## 📜 License

MIT © 2025 Tejaswini Karri & contributors"# Expense-Tracker" 
