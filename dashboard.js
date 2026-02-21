// ======================================================
// 🚀 MEDSUPPLY DASHBOARD ENGINE — FINAL PRO VERSION
// ======================================================

// =======================
// 📦 STORAGE HELPERS
// =======================
function getMedicinesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("medicines")) || [];
  } catch {
    return [];
  }
}

function saveMedicinesToStorage(data) {
  localStorage.setItem("medicines", JSON.stringify(data));
}

// =======================
// 📊 MOCK BASE DATA (your existing style preserved)
// =======================
let medicinesData = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    location: "City Hospital",
    stock: 1200,
    status: "Normal",
    lastUpdated: "2 min ago"
  },
  {
    id: "MED-002",
    name: "Insulin Injection",
    location: "Metro Pharmacy",
    stock: 45,
    status: "Low",
    lastUpdated: "5 min ago"
  },
  {
    id: "MED-003",
    name: "Amoxicillin 250mg",
    location: "County Hospital",
    stock: 12,
    status: "Critical",
    lastUpdated: "Just now"
  }
];

// =======================
// 🔍 SEARCH + SORT STATE
// =======================
let currentSort = { key: null, asc: true };
let currentPage = 1;
const rowsPerPage = 6;

// =======================
// 🎨 STATUS CLASS
// =======================
function getStatusClass(status) {
  switch (status) {
    case "Normal": return "normal";
    case "Low": return "low";
    case "Critical": return "critical";
    default: return "normal";
  }
}

// =======================
// 📋 TABLE RENDER
// =======================
function updateTable() {
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) return;

  let filtered = [...medicinesData];

  // search filter
  const searchInput = document.getElementById("tableSearch");
  if (searchInput && searchInput.value.trim()) {
    const term = searchInput.value.toLowerCase();
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(term)
    );
  }

  // sorting
  if (currentSort.key) {
    filtered.sort((a, b) => {
      const A = a[currentSort.key];
      const B = b[currentSort.key];

      if (typeof A === "number") {
        return currentSort.asc ? A - B : B - A;
      }
      return currentSort.asc
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });
  }

  // pagination
  const start = (currentPage - 1) * rowsPerPage;
  const pageData = filtered.slice(start, start + rowsPerPage);

  tbody.innerHTML = pageData.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.location}</td>
      <td>${m.stock}</td>
      <td><span class="badge ${getStatusClass(m.status)}">${m.status}</span></td>
      <td>${m.lastUpdated}</td>
    </tr>
  `).join("");
}

// =======================
// 📈 KPI LIVE UPDATE
// =======================
function updateDashboardStats() {
  const meds = getMedicinesFromStorage();
  if (!meds.length) return;

  const totalStock = meds.reduce((s, m) => s + (m.stock || 0), 0);
  const lowStockCount = meds.filter(m => m.stock <= m.threshold).length;

  const totalEl = document.getElementById("totalStockCount");
  const lowEl = document.getElementById("lowStockCount");

  if (totalEl) totalEl.textContent = totalStock.toLocaleString();
  if (lowEl) lowEl.textContent = lowStockCount.toLocaleString();
}

// =======================
// 🔗 MERGE REAL INVENTORY (FIXED — NO DUPLICATES)
// =======================
function mergeRealInventoryIntoTable() {
  const meds = getMedicinesFromStorage();
  if (!meds.length) return;

  const converted = meds.map((m, idx) => ({
    id: `USR-${idx}`,
    name: m.name,
    location: "User Inventory",
    stock: m.stock,
    status:
      m.stock <= m.threshold
        ? "Critical"
        : m.stock <= m.threshold * 2
        ? "Low"
        : "Normal",
    lastUpdated: "Just now"
  }));

  // ✅ remove previous user rows (critical fix)
  const baseOnly = medicinesData.filter(m => !String(m.id).startsWith("USR-"));

  medicinesData.length = 0;
  medicinesData.push(...baseOnly, ...converted);

  updateTable();
}

// =======================
// 🔔 TOAST SYSTEM (safe)
// =======================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), 4000);
}

// =======================
// 📊 CHART INIT (safe)
// =======================
function initChart() {
  const canvas = document.getElementById("demandChart");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Demand",
        data: [120,190,300,250,220,310,280],
        borderColor: "#22c1c3",
        backgroundColor: "rgba(34,193,195,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#94a3b8" } },
        y: { ticks: { color: "#94a3b8" } }
      }
    }
  });
}

// =======================
// 🍔 MOBILE NAV (safe)
// =======================
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

// =======================
// ⚡ REAL-TIME CROSS-TAB SYNC
// =======================
window.addEventListener("storage", () => {
  mergeRealInventoryIntoTable();
  updateDashboardStats();
});

// =======================
// 🚀 INIT
// =======================
window.addEventListener("load", () => {
  initMobileNav();
  initChart();
  mergeRealInventoryIntoTable();
  updateDashboardStats();
  updateTable();
});
// ======================================================
// 🚨 REAL-TIME SMART ALERT ENGINE
// ======================================================

function generateSmartAlerts() {
  const container = document.getElementById("alertsContainer");
  if (!container) return;

  const meds = getMedicinesFromStorage();
  if (!meds.length) {
    container.innerHTML =
      '<div class="alert-empty">No active alerts</div>';
    return;
  }

  const alerts = meds
    .filter(m => m.stock <= m.threshold * 2)
    .sort((a, b) => a.stock - b.stock);

  if (!alerts.length) {
    container.innerHTML =
      '<div class="alert-empty">No active alerts</div>';
    return;
  }

  container.innerHTML = alerts.map(med => {
    const isCritical = med.stock <= med.threshold;

    return `
      <div class="alert-item ${isCritical ? "critical" : "warning"}">
        <div class="alert-title">
          ${med.name}
          <span class="alert-badge">
            ${isCritical ? "CRITICAL" : "LOW"}
          </span>
        </div>
        <div class="alert-sub">
          Stock left: ${med.stock}
        </div>
      </div>
    `;
  }).join("");
}

// ======================================================
// 🔴 AUTO-RUN ALERTS
// ======================================================

// run on load
window.addEventListener("load", generateSmartAlerts);

// run on cross-tab updates
window.addEventListener("storage", generateSmartAlerts);

// run whenever dashboard stats update
const originalUpdateStats = updateDashboardStats;
updateDashboardStats = function () {
  originalUpdateStats();
  generateSmartAlerts();
};
// ===== REMOVE LOADING PLACEHOLDERS =====
window.addEventListener("load", () => {
  document.querySelectorAll(".skeleton, .loading-card, .shimmer")
    .forEach(el => el.style.display = "none");
});