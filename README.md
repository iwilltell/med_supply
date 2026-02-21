# MedSupply

AI-powered smart drug supply chain dashboard that provides real-time inventory visibility, intelligent shortage alerts, and automated billing with live stock updates.

---

## 🚀 Overview

MedSupply is a HealthTech prototype designed to prevent medicine stockouts by combining live inventory tracking, smart alerts, and demand insights into a single modern dashboard.

The platform helps hospitals, pharmacies, and administrators monitor medicine availability, detect low stock early, and maintain accurate inventory through automated billing deductions.

---

## ✨ Key Features

* 📦 **Live Inventory Management** — Add and track medicines in real time
* 🧾 **Smart Billing System** — Auto-deduct stock when a sale is made
* 🚨 **Real-Time Alerts** — Low and critical stock detection
* 📊 **AI Demand Visualization** — Weekly demand trend chart
* 🔄 **Auto-Sync Across Pages** — Shared data using localStorage
* 🎨 **Modern Glass UI** — Clean, responsive dashboard

---

## 🧠 How It Works

1. Medicines are added from the **Inventory Portal**
2. Data is stored in **localStorage**
3. The **Billing Page** reduces stock after each sale
4. The **Dashboard** reads live data and updates automatically
5. The **Alerts Engine** flags low or critical stock

This creates a near real-time smart supply monitoring system.

---

## 🏗️ Project Structure

```
Vortex/
│
├── login.html
├── dashboard.html
├── inventory.html
├── billing.html
│
├── login.css
├── dashboard.css
├── inventory.css
├── billing.css
│
├── dashboard.js
├── inventory.js
├── billing.js
│
└── README.md
```

---

## 🛠️ Tech Stack

* HTML5
* CSS3 (Glassmorphism UI)
* Vanilla JavaScript
* Chart.js
* localStorage (prototype database)

---

## 📊 Alert Logic

Stock levels are monitored continuously:

* 🟢 **Normal** — Stock > 50
* 🟡 **Low** — Stock ≤ 50
* 🔴 **Critical** — Stock ≤ 10

Alerts update automatically on the dashboard.

---

## 🔮 Future Scope

* 🔗 Cloud database integration
* 🤖 AI demand forecasting (ML models)
* 📡 IoT pharmacy integration
* 🏥 Multi-hospital network sync
* 📱 Mobile companion app
* 🔐 Role-based authentication

---

## 🧪 How to Run Locally

1. Download or clone the repository
2. Open the project folder
3. Run using Live Server or any local server
4. Start from `login.html`

---

## 👨‍💻 Author

Built as a HealthTech innovation prototype to demonstrate predictive drug supply chain intelligence.

---

## 🏁 One-Line Pitch

**MedSupply transforms drug supply chains from reactive to predictive using real-time inventory intelligence.**
