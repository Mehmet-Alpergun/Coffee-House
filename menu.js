const menubtn = document.getElementById("menubtn");
const menu = document.getElementById("menuismenulan");
const lan = document.getElementById("yeterlan");
const moneyismoneylan = document.getElementById("moneyismoneylan");

menubtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  lan.classList.toggle("active");
  menubtn.classList.toggle("active");
});

lan.addEventListener("click", () => {
  menu.classList.remove("active");
  lan.classList.remove("active");
  menubtn.classList.remove("active");
});

const productsContainer = document.querySelector(".menu-products");

function loadCategory(category) {
  fetch("./products.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(category);
      renderProducts(data, category);
    })
    .catch((err) => console.error("JSON yüklenemedi:", err));
}

function renderProducts(data, category) {
  console.log(data);
  productsContainer.innerHTML = "";
  const filtered = data.filter((item) => item.category === category);

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("preview");
    card.innerHTML = `
      <img src="${item.name}.svg" alt="${item.name}" class="previewimage" />
      <div class="description">
        <div class="titletogether">
          <span class="bigtitle">${item.name}</span>
          <span class="smalltitle">${item.description}</span>
        </div>
        <span class="titleprice">$${Number(item.price).toFixed(2)}</span>
      </div>
    `;
    productsContainer.appendChild(card);

    card.addEventListener("click", () => openModal(item));
  });
}

function changeToActive(category) {
  const categories = ["coffee", "tea", "dessert"];

  categories.forEach((cat) => {
    const cont = document.querySelector(`.${cat}-container`);
    const rnd = document.querySelector(`.${cat}-round`);
    const txt = document.querySelector(`.${cat}-text`);

    if (cont) cont.classList.remove("active");
    if (rnd) rnd.classList.remove("active");
    if (txt) txt.classList.remove("active");
  });
  const container = document.querySelector(`.${category}-container`);
  const round = document.querySelector(`.${category}-round`);
  const text = document.querySelector(`.${category}-text`);
  console.log(category);
  container.classList.toggle("active");
  console.log(container);

  round.classList.toggle("active");
  console.log(round);

  text.classList.toggle("active");
  console.log(text);
}

loadCategory("coffee");
changeToActive("coffee");

const coffeebtn = document.getElementById("coffeebtn");
const teabtn = document.getElementById("teabutton");
const dessertbtn = document.getElementById("dessertbtn");

coffeebtn.addEventListener("click", () => {
  loadCategory("coffee");
  changeToActive("coffee");
});
teabtn.addEventListener("click", () => {
  loadCategory("tea");
  changeToActive("tea");
});
dessertbtn.addEventListener("click", () => {
  loadCategory("dessert");
  changeToActive("dessert");
});

const modal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".titlelan-name");
const modalDesc = document.querySelector(".real-description");
const kucukisim = document.querySelector(".kucukisim");
const ortaisim = document.querySelector(".ortaisim");
const buyukisim = document.querySelector(".buyukisim");

const adkucuk = document.querySelector(".kucuk1-isim");
const adorta = document.querySelector(".orta1-isim");
const adbuyuk = document.querySelector(".buyuk1-isim");

const price = document.querySelector(".price");

const modalImg = document.querySelector(".modalinresmi");

let selectedSize = "s";
let selectedAdditives = [];
let basePrice = 0;

function calculateTotalPrice(item) {
  const sizeExtra = Number(item.sizes[selectedSize].addprice);
  const additivesTotal = selectedAdditives.reduce((sum, addIndex) => {
    const addPrice = Number(item.additives[addIndex].addprice);
    return sum + addPrice;
  }, 0);
  console.log(typeof additivesTotal);

  const total = Number(item.price) + sizeExtra + additivesTotal;
  price.textContent = `$${Number(total).toFixed(2)}`;
}

function openModal(item) {
  modal.classList.add("active");
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.description;
  modalImg.src = `./${item.name}.svg`;

  kucukisim.textContent = item.sizes.s.size;
  ortaisim.textContent = item.sizes.m.size;
  buyukisim.textContent = item.sizes.l.size;

  adkucuk.textContent = item.additives[0].name;
  adorta.textContent = item.additives[1].name;
  adbuyuk.textContent = item.additives[2].name;

  basePrice = item.price;
  selectedSize = "s";
  selectedAdditives = [];

  calculateTotalPrice(item);

  // --- boyut seçimi ---
  document.querySelectorAll(".kucuk, .orta, .buyuk").forEach((el) => {
    el.addEventListener("click", () => {
      document
        .querySelectorAll(
          ".kucuk, .kucuk-daire, .kucukisim, .orta, .orta-daire, .ortaisim, .buyuk, .buyuk-daire, .buyukisim"
        )
        .forEach((b) => b.classList.remove("active"));
      el.classList.add("active");
      el.querySelectorAll("div, span").forEach((child) =>
        child.classList.add("active")
      );
      if (el.classList.contains("kucuk")) selectedSize = "s";
      else if (el.classList.contains("orta")) selectedSize = "m";
      else selectedSize = "l";
      calculateTotalPrice(item);
    });
  });

  // --- additive seçimi ---
  document.querySelectorAll(".kucuk1, .orta1, .buyuk1").forEach((el, index) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
      el.querySelectorAll("div, span").forEach((child) =>
        child.classList.toggle("active")
      );
      if (el.classList.contains("active")) {
        selectedAdditives.push(index);
      } else {
        selectedAdditives = selectedAdditives.filter((i) => i !== index);
      }

      calculateTotalPrice(item);
    });
  });
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";

  // --- Boyut ve katkı seçimi reset ---
  selectedSize = "s";
  selectedAdditives = [];

  // Tüm active class’larını temizle
  document
    .querySelectorAll(
      ".kucuk, .kucuk-daire, .kucukisim, .orta, .orta-daire, .ortaisim, .buyuk, .buyuk-daire, .buyukisim, .kucuk1, .orta1, .buyuk1, .kucuk1-daire, .kucuk1-isim, .orta1-daire, .orta1-isim, .buyuk1-daire, .buyuk1-isim"
    )
    .forEach((el) => el.classList.remove("active"));

  // Varsayılan boyut (küçük) aktif hale getir
  document.querySelector(".kucuk").classList.add("active");
  document.querySelector(".kucuk-daire").classList.add("active");
  document.querySelector(".kucukisim").classList.add("active");

  // Varsayılan fiyatı geri döndür (modal kapanırken item objesi yok, bu yüzden sadece UI temizlenir)
  price.textContent = "";
  modalTitle.textContent = "";
  modalDesc.textContent = "";
  modalImg.src = "";
}

// Dışarıya tıklayınca kapansın
modal.addEventListener("click", (e) => {
  console.log(e.target.classList[0]);
  if (
    e.target.classList[0] === "modal-container" ||
    e.target.classList.contains("kapatmatusu")
  ) {
    closeModal();
  }
});
