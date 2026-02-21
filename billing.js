// =======================
// 📦 STORAGE HELPERS
// =======================
function getMedicines() {
  try {
    return JSON.parse(localStorage.getItem("medicines")) || [];
  } catch {
    return [];
  }
}

function saveMedicines(meds) {
  localStorage.setItem("medicines", JSON.stringify(meds));
}

// =======================
// 🔽 LOAD DROPDOWN
// =======================
function loadMedicineDropdown() {
  const select = document.getElementById("billMedicine");
  if (!select) return;

  const meds = getMedicines();

  if (!meds.length) {
    select.innerHTML = `<option>No medicines available</option>`;
    return;
  }

  select.innerHTML = meds
    .map((m, i) => `<option value="${i}">${m.name} (Stock: ${m.stock})</option>`)
    .join("");
}

// =======================
// 🧾 GENERATE BILL
// =======================
function generateBill() {
  const meds = getMedicines();
  const index = document.getElementById("billMedicine").value;
  const qty = Number(document.getElementById("billQty").value);
  const output = document.getElementById("billOutput");

  if (!meds.length) {
    alert("No medicines available");
    return;
  }

  const med = meds[index];

  if (!qty || qty <= 0) {
    alert("Enter valid quantity");
    return;
  }

  if (qty > med.stock) {
    alert("❌ Not enough stock");
    return;
  }

  // ✅ reduce stock
  med.stock -= qty;
  med.lastUpdated = Date.now();
  saveMedicines(meds);

  const total = qty * med.price;

  // ✅ bill UI
  output.innerHTML = `
    <h3>🧾 Bill Receipt</h3>
    <p><b>Medicine:</b> ${med.name}</p>
    <p><b>Quantity:</b> ${qty}</p>
    <p><b>Price:</b> ₹${med.price}</p>
    <p><b>Total:</b> ₹${total}</p>
    <p style="opacity:.7;font-size:12px;">
      ${new Date().toLocaleString()}
    </p>
  `;

  // 🚨 emergency alert
  if (med.stock <= med.threshold) {
    alert(`🚨 EMERGENCY: ${med.name} stock is low (${med.stock} left)`);
  }

  // 🔄 refresh dropdown
  loadMedicineDropdown();
}

// =======================
// ⚡ REAL-TIME SYNC
// =======================
window.addEventListener("storage", loadMedicineDropdown);

// =======================
// 🚀 INIT
// =======================
document.getElementById("billBtn")?.addEventListener("click", generateBill);
window.addEventListener("load", loadMedicineDropdown);