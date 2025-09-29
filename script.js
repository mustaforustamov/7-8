const countriesEl = document.getElementById('countries');
const searchEl = document.getElementById('search');
const modeBtn = document.getElementById('modeBtn');

let countriesCache = [];

// 🔹 JSON fayldan ma'lumot olish
async function fetchCountries() {
  try {
    const res = await fetch("countries.json");
    countriesCache = await res.json();
    renderCountries(countriesCache);
  } catch (err) {
    countriesEl.innerHTML = `<p style="color:red">Xato: ${err.message}</p>`;
  }
}

// 🔹 Davlatlarni chiqarish
function renderCountries(list) {
  countriesEl.innerHTML = "";
  list.forEach(country => {
    const card = document.createElement("div");
    card.className = "country";
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="meta"><p>${country.name.common}</p></div>
    `;
    countriesEl.appendChild(card);
  });
}

// 🔹 Qidiruv ishlashi
searchEl.addEventListener("input", () => {
  const q = searchEl.value.toLowerCase();
  const filtered = countriesCache.filter(c =>
    c.name.common.toLowerCase().includes(q)
  );
  renderCountries(filtered);
});

// 🔹 Dark/Light mode
modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  modeBtn.textContent = document.body.classList.contains("light")
    ? "Dark Mode"
    : "Light Mode";
});

fetchCountries();
