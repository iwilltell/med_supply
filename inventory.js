// ===== STORAGE =====
function getMedicines() {
  return JSON.parse(localStorage.getItem("medicines")) || [];
}

function saveMedicines(meds) {
  localStorage.setItem("medicines", JSON.stringify(meds));
}

// ===== ADD MEDICINE =====
document.getElementById("addBtn").addEventListener("click", () => {
  const name = medName.value.trim();
  const price = Number(medPrice.value);
  const stock = Number(medStock.value);
  const threshold = Number(medThreshold.value);

  if (!name || price <= 0 || stock < 0) {
    alert("Please enter valid data");
    return;
  }

  const meds = getMedicines();

  meds.push({
    name,
    price,
    stock,
    threshold,
    lastUpdated: Date.now()
  });

  saveMedicines(meds);
  renderInventory();

  // clear fields
  medName.value = "";
  medPrice.value = "";
  medStock.value = "";
  medThreshold.value = "";
});

// ===== RENDER TABLE =====
function renderInventory() {
  const meds = getMedicines();
  const tbody = document.getElementById("inventoryBody");

  if (!tbody) return;

  tbody.innerHTML = meds.map(med => {
    let statusClass = "normal";
    let statusText = "Normal";

    if (med.stock <= med.threshold) {
      statusClass = "critical";
      statusText = "Critical";
    } else if (med.stock <= med.threshold * 2) {
      statusClass = "low";
      statusText = "Warning";
    }

    return `
      <tr>
        <td>${med.name}</td>
        <td>₹${med.price}</td>
        <td>${med.stock}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td>${new Date(med.lastUpdated).toLocaleTimeString()}</td>
      </tr>
    `;
  }).join("");
}

// ===== REAL-TIME SYNC =====
window.addEventListener("storage", renderInventory);

// ===== INIT =====
window.addEventListener("load", renderInventory);