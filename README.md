# Budget Planner (Vanilla JavaScript)

A lightweight, performance-focused personal finance tracker built entirely with Vanilla JavaScript. This application is engineered to provide users with a clean, zero-friction interface to log expenses, track income, and monitor their real-time financial runway without bloated client-side frameworks.

## 🚀 Project Overview

This project was built to master the fundamentals of DOM manipulation, predictable state management, and localized data persistence in native JavaScript. By avoiding external heavy frameworks, the application achieves instantaneous load times and a highly responsive user experience.

### Key Features
* **Dynamic Budget Tracking:** Real-time calculation and rendering of Total Income, Total Expenses, and the remaining net balance.
* **Transaction Ledger:** A structured, filterable history component that displays logged entries with clean categorical separation.
* **Local Data Persistence:** Integrates the browser's Native Web Storage API (`localStorage`) to ensure user financial data remains saved securely across sessions without requiring a database backend.
* **Component-Driven UI:** Built with an emphasis on modular CSS/Tailwind design principles, featuring a completely responsive layout tailored for both desktop and mobile screens.

## 🛠️ Tech Stack & Architecture

* **Core Logic:** Vanilla JavaScript (ES6+ Architecture, Event Delegation, DOM API)
* **Styling & Layout:** Modern CSS3 / Utility-first design (Responsive grid setups)
* **Data Layer:** Web Storage API (`localStorage`) for stateless client-side persistence

## 🎯 Engineering & Design Principles

The development process prioritized clean code architecture and structural efficiency:
1. **Predictable State Synchronization:** Implements a single source of truth for the application state. When an expense is added or deleted, the core data object updates first, automatically triggering an optimal re-render of the DOM sub-trees.
2. **Event Delegation:** Optimized performance by attaching minimal event listeners to parent containers rather than individual list items, reducing memory overhead.
3. **No-Dependency Footprint:** Kept the bundle size close to zero, proving that highly functional utility applications can be built fast, secure, and responsive using pure web standards.

## ⚙️ Local Development Setup

To run this project on your machine:

1. Clone the repository:
```bash
   git clone [https://github.com/chhatbarabhishek/budget-planner-js.git](https://github.com/chhatbarabhishek/budget-planner-js.git)
